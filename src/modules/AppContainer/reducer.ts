import {
  CALCULATE_TIME_TAKEN,
  INITIALISE,
  INIT_DATA,
  SELECT_PLANET,
  SELECT_VEHICLE
} from "./constants";
import { cloneDeep } from "lodash-es";
import ApplicationState from "../Classes/ApplicationState";

function initReducer(args: any) {
  const { allowedAttempts } = args || {};
  return new ApplicationState({ allowedAttempts });
}

function reducer(state: ApplicationState, action: any) {
  console.log(action);
  switch (action.type) {
    case INITIALISE: {
      const { payload } = action || {};
      const { token, planets, vehicles } = payload || {};
      return cloneDeep(state.initData(token, planets, vehicles));
    }
    case SELECT_PLANET: {
      const { payload } = action || {};
      const { planet, attemptId } = payload || {};
      return cloneDeep(state.onSelectPlanet(attemptId, planet));
    }
    case SELECT_VEHICLE: {
      const { payload } = action || {};
      const { vehicle, attemptId } = payload || {};
      return cloneDeep(state.onSelectVehicle(attemptId, vehicle));
    }
    case CALCULATE_TIME_TAKEN: {
      return cloneDeep(state.onCalculateTimeTaken());
    }
    case INIT_DATA: {
      const { payload } = action;
      return cloneDeep(state.initApplicationState(payload));
    }
    default:
      return state;
  }
}

reducer.initReducer = initReducer;

export default reducer;
