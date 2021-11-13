import React from "react";
import { useNavigate } from "react-router-dom";
import FindFalconService from "../../services";
import Action from "../AppContainer/actions";
import AppContext from "../AppContainer/AppContext";
import { ALLOWED_ATTEMPTS } from "../AppContainer/constants";
import reducer from "../AppContainer/reducer";

function InitialiseGame() {
  const navigate = useNavigate();
  const { dispatch } = React.useContext(AppContext);

  const getToken = React.useCallback(() => {
    return FindFalconService.getToken().then(
      (res) => res.data && res.data.token
    );
  }, []);

  const getPlanets = React.useCallback(() => {
    return FindFalconService.getPlanets()
      .then((res) => res.data || [])
      .then((res) =>
        res.map((each) => ({
          label: each.name,
          value: each.name,
          subLabel: `Distance: ${each.distance}`,
          distance: each.distance,
          selected: false
        }))
      );
  }, []);

  const getVehicles = React.useCallback(() => {
    return FindFalconService.getVehicles()
      .then((res) => res.data || [])
      .then((res) =>
        res.map((each) => ({
          ...each,
          label: each.name,
          value: each.name,
          availableCount: each.total_no,
          subLabel: `Count: ${each.total_no}, Speed: ${each.speed}, Dist: ${each.max_distance}`
        }))
      );
  }, []);

  const getInitData = React.useCallback(() => {
    return Promise.all([getToken(), getPlanets(), getVehicles()]).then(
      ([token, planets, vehicles]) => {
        dispatch(Action.initialise({ token, planets, vehicles }));
      }
    );
  }, [getToken, getVehicles, getPlanets, dispatch]);

  React.useEffect(() => {
    dispatch(
      Action.initData(
        reducer.initReducer({ allowedAttempts: ALLOWED_ATTEMPTS })
      )
    );
    getInitData().then((res) => {
      navigate("/home");
    });
  }, [navigate, getInitData, dispatch]);

  return <div>Initialising elements for you...</div>;
}

export default InitialiseGame;
