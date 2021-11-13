import {
  INITIALISE,
  INIT_DATA,
  SELECT_PLANET,
  SELECT_VEHICLE,
  SET_TIME_TAKEN
} from "./constants";
import { cloneDeep } from "lodash-es";

const AttempConfig = {
  planet: "",
  vehicle: "",
  distance: 0,
  speed: 0,
  time: 0
};

function initReducer(args) {
  const { allowedAttempts } = args || {};
  const attempts = new Array(allowedAttempts).fill().map((each, index) => ({
    ...AttempConfig,
    id: index
  }));
  return {
    allowedAttempts,
    attempts,
    token: null,
    planets: [],
    vehicles: []
  };
}

function getUpdatedAttemptConfigOnSelectPlanet(attemptConfig, planet) {
  if (!planet) return attemptConfig;
  const { label, distance } = planet || {};
  return {
    ...attemptConfig,
    planet: label,
    distance,
    vehicle: "",
    speed: 0,
    time: 0
  };
}

function getUpdatedAttemptConfigOnSelectVehicle(attemptConfig, vehicle) {
  if (!vehicle) return attemptConfig;
  const { planet, distance } = attemptConfig || {};
  const { label, speed } = vehicle || {};
  const time = distance / speed;
  return {
    ...attemptConfig,
    planet,
    distance,
    vehicle: label,
    speed,
    time
  };
}

function getUpdatedPlanets(state) {
  const { attempts, planets } = state || {};
  const selectedPlanets = attempts
    .map((each) => each.planet)
    .filter((each) => !!each);
  return planets.map((each) => ({
    ...each,
    selected: selectedPlanets.includes(each.label)
  }));
}

function getUpdatedVehicles(state) {
  const { attempts, vehicles } = state || {};
  const vehicleCounts = attempts
    .map((each) => each.vehicle)
    .filter((each) => !!each)
    .reduce((acc, curr) => {
      if (acc[curr]) acc[curr] = acc[curr] + 1;
      else acc[curr] = 1;
      return acc;
    }, {});
  return vehicles.map((each) => {
    const selectedCount = vehicleCounts[each.label] || 0;
    const availableCount = each.total_no - selectedCount;
    return {
      ...each,
      availableCount,
      subLabel: `Count: ${availableCount}, Speed: ${each.speed}, Dist: ${each.max_distance}`
    };
  });
}

function reducer(state, action) {
  console.log(action);
  switch (action.type) {
    case INITIALISE: {
      const { payload } = action || {};
      const { token, planets, vehicles } = payload || {};
      return { ...state, token, planets, vehicles, initialised: true };
    }
    case SELECT_PLANET: {
      const { attempts } = state || {};
      const { payload } = action || {};
      const { planet, attemptId } = payload || {};
      state.attempts[attemptId] = getUpdatedAttemptConfigOnSelectPlanet(
        attempts[attemptId],
        planet
      );
      state.planets = getUpdatedPlanets(state);
      state.vehicles = getUpdatedVehicles(state);
      return cloneDeep(state);
    }
    case SELECT_VEHICLE: {
      const { attempts } = state || {};
      const { payload } = action || {};
      const { vehicle, attemptId } = payload || {};
      state.attempts[attemptId] = getUpdatedAttemptConfigOnSelectVehicle(
        attempts[attemptId],
        vehicle
      );
      state.planets = getUpdatedPlanets(state);
      state.vehicles = getUpdatedVehicles(state);
      return cloneDeep(state);
    }
    case SET_TIME_TAKEN: {
      const { payload } = action;
      return { ...state, timeTaken: payload };
    }
    case INIT_DATA: {
      const { payload } = action;
      return { ...payload };
    }
    default:
      return state;
  }
}

reducer.initReducer = initReducer;

export default reducer;
