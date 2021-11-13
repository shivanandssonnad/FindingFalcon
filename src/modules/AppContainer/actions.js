import {
  CALCULATE_TIME_TAKEN,
  INITIALISE,
  INIT_DATA,
  SELECT_PLANET,
  SELECT_VEHICLE
} from "./constants";

function initialise(payload) {
  return {
    type: INITIALISE,
    payload
  };
}

function selectPlanet(payload) {
  return {
    type: SELECT_PLANET,
    payload
  };
}

function selectVehicle(payload) {
  return {
    type: SELECT_VEHICLE,
    payload
  };
}

function calculateTimeTaken() {
  return {
    type: CALCULATE_TIME_TAKEN
  };
}

function initData(payload) {
  return {
    type: INIT_DATA,
    payload
  };
}

const Action = {
  initialise,
  selectPlanet,
  selectVehicle,
  calculateTimeTaken,
  initData
};

export default Action;
