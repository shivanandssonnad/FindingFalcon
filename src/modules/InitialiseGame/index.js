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
    return FindFalconService.getPlanets().then((res) => res.data || []);
  }, []);

  const getVehicles = React.useCallback(() => {
    return FindFalconService.getVehicles().then((res) => res.data || []);
  }, []);

  const getInitData = React.useCallback(() => {
    return Promise.all([getToken(), getPlanets(), getVehicles()]);
  }, [getToken, getPlanets, getVehicles]);

  React.useEffect(() => {
    dispatch(Action.initData(ALLOWED_ATTEMPTS));
    getInitData()
      .then(([token, planets, vehicles]) => {
        dispatch(Action.initialise({ token, planets, vehicles }));
      })
      .then((res) => {
        navigate("/home");
      });
  }, [navigate, getInitData, dispatch]);

  return <div>Initialising elements for you...</div>;
}

export default InitialiseGame;
