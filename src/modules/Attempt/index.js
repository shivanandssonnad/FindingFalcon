import React from "react";
import Select from "../../components/Select";
import Text from "../../components/Text";
import Action from "../AppContainer/actions";

function Attempt(props) {
  const { dispatch, planets, vehicles, attemptConfig } = props;
  const { planet, vehicle, id: index, distance, time } = attemptConfig || {};

  function isPlanetDisabled(option) {
    const { selected, value } = option;
    if (selected && planet !== value) {
      return {
        disabled: true,
        disabledMessage: "Already selected in one of the attempts."
      };
    }
    return { disabled: false };
  }

  function isVehicleDisabled(option) {
    const { availableCount, value, max_distance: maxDistance } = option;
    if (distance > maxDistance) {
      return {
        disabled: true,
        disabledMessage:
          "Max distance allowed for this vehicle is less than selected planet distance."
      };
    }

    if (!availableCount && vehicle !== value) {
      return {
        disabled: true,
        disabledMessage:
          "Max allowed count for this vehicle is already used in previous attempts."
      };
    }
    return { disabled: false };
  }

  function renderSelectPlanet() {
    return (
      <div className="margin-bottom-10">
        <Text className="margin-bottom-10 inline-block" type={Text.TYPE.LABEL}>
          Select Planet
        </Text>
        <Select
          value={planet}
          options={planets.map((each) => ({
            ...each,
            ...isPlanetDisabled(each)
          }))}
          onChange={(newPlanet) =>
            dispatch(
              Action.selectPlanet({ planet: newPlanet, attemptId: index })
            )
          }
        />
      </div>
    );
  }

  function renderSelectVehicle() {
    if (!planet) return null;
    return (
      <div className="margin-bottom-10">
        <Text className="margin-bottom-10 inline-block" type={Text.TYPE.LABEL}>
          Select Vehicle
        </Text>
        <Select
          value={vehicle}
          options={vehicles.map((each) => ({
            ...each,
            ...isVehicleDisabled(each)
          }))}
          onChange={(newVehicle) =>
            dispatch(
              Action.selectVehicle({ vehicle: newVehicle, attemptId: index })
            )
          }
        />
      </div>
    );
  }

  function renderTimeTaken() {
    return <Text type={Text.TYPE.LABEL}>Time Taken: {time}</Text>;
  }

  return (
    <div>
      <Text
        className="display-row-center margin-bottom-15"
        type={Text.TYPE.LABEL}
      >
        Attempt {index + 1}
      </Text>
      {renderSelectPlanet()}
      {renderSelectVehicle()}
      {renderTimeTaken()}
    </div>
  );
}

export default Attempt;
