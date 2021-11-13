import React, { useEffect } from "react";
import FindFalconService from "../../services";
import AppContext from "../AppContainer/AppContext";
import FoundView from "./FoundView";
import LoadingView from "./LoadingView";
import NotFoundView from "./NotFoundView";
import TokenExpiredView from "./TokenExpiredView";

const VIEW = {
  LOADING: "loading",
  FOUND: "found",
  NOT_FOUND: "not_found",
  TOKEN_EXPIRED: "token_expired",
  FAILED: "failed"
};

function Result(props) {
  const { state } = React.useContext(AppContext);
  const [result, setResult] = React.useState(false);
  const [view, setView] = React.useState(VIEW.LOADING);

  const findResult = React.useCallback(() => {
    const { timeTaken, token, attempts } = state;
    const planets = attempts.map((each) => each.planet);
    const vehicles = attempts.map((each) => each.vehicle);
    FindFalconService.findFalcone({
      token,
      planet_names: planets,
      vehicle_names: vehicles
    })
      .then((res) => {
        if (res.data) return res.data;
        return {};
      })
      .then((res) => {
        switch (res.status) {
          case "success": {
            setResult({
              success: true,
              planet: res.planet_name,
              timeTaken
            });
            setView(VIEW.FOUND);
            return res;
          }
          case "false": {
            setView(VIEW.NOT_FOUND);
            return res;
          }
          default: {
            setView(VIEW.TOKEN_EXPIRED);
            return res;
          }
        }
      });
  }, [state]);

  useEffect(() => {
    findResult();
  }, [findResult]);

  function renderView() {
    switch (view) {
      case VIEW.LOADING:
        return <LoadingView />;
      case VIEW.FOUND:
        return (
          <FoundView planet={result.planet} timeTaken={result.timeTaken} />
        );
      case VIEW.NOT_FOUND:
        return <NotFoundView />;
      case VIEW.TOKEN_EXPIRED:
        return <TokenExpiredView />;
      default:
        return <div>Unknown error!</div>;
    }
  }

  return <div>{renderView()}</div>;
}

export default Result;
