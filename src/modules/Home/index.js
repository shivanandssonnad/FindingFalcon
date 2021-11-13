import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Button from "../../components/Button";
import Text from "../../components/Text";
import Action from "../AppContainer/actions";
import AppContext from "../AppContainer/AppContext";
import Attempt from "../Attempt";

import styles from "./styles.module.scss";

function Home() {
  const { state, dispatch } = React.useContext(AppContext);
  const navigate = useNavigate();
  const { planets = [], vehicles = [], attempts } = state || {};

  useEffect(() => {
    if (!state.initialised) navigate("/");
  }, [navigate, state]);

  function findIsValidForSubmission() {
    return attempts.every((each) => each.time > 0);
  }

  function findFalcone() {
    const timeTaken = attempts
      .map((each) => each.time)
      .reduce((acc, curr) => (curr ? acc + curr : acc), 0);
    dispatch(Action.setTimeTaken(timeTaken));
    navigate("/find_falcone");
  }

  function renderTitle() {
    return (
      <Text className="display-row-center" type={Text.TYPE.TITLE}>
        Finding Falcon!
      </Text>
    );
  }

  function renderSubTitle() {
    return (
      <Text className="display-row-center" type={Text.TYPE.SUB_TITLE}>
        Select planets you want to search in:
      </Text>
    );
  }

  function renderAttempt(attempt) {
    return (
      <Attempt
        dispatch={dispatch}
        planets={planets}
        vehicles={vehicles}
        attemptConfig={attempt}
        key={attempt.id}
      />
    );
  }

  function renderAttempts() {
    if (!Array.isArray(attempts)) return null;
    return (
      <div className={styles["attempts-container"]}>
        {attempts.map(renderAttempt)}
      </div>
    );
  }

  function renderButton() {
    const isValidForSubmission = findIsValidForSubmission();
    return (
      <div className="display-row-center margin-top-10">
        <Button disabled={!isValidForSubmission} onClick={findFalcone}>
          Find Falcone!
        </Button>
      </div>
    );
  }

  return (
    <div className="margin-top-5">
      {renderTitle()}
      {renderSubTitle()}
      {renderAttempts()}
      {renderButton()}
    </div>
  );
}

export default Home;
