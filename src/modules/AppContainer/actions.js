import {
  INITIALISE,
  INIT_DATA,
  SELECT_PLANET,
  SELECT_VEHICLE,
  SET_TIME_TAKEN
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

function setTimeTaken(payload) {
  return {
    type: SET_TIME_TAKEN,
    payload
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
  setTimeTaken,
  initData
};

export default Action;
