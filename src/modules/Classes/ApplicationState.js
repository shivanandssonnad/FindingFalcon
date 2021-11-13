import Attempt from "./Attempt";
import Planet from "./Planet";
import Vehicle from "./Vehicle";

class ApplicationState {
  constructor(config) {
    const { allowedAttempts } = config;
    this.initApplicationState(allowedAttempts);
  }

  initApplicationState = (allowedAttempts) => {
    this.allowedAttempts = allowedAttempts;
    this.token = null;
    this.planets = [];
    this.vehicles = [];
    this.timeTaken = 0;
    this.attempts = new Array(allowedAttempts)
      .fill()
      .map((each, index) => new Attempt({ id: index }));
    return this;
  };

  initData = (token, planets, vehicles) => {
    this.token = token;
    this.planets = planets.map((each) => new Planet(each));
    this.vehicles = vehicles.map((each) => new Vehicle(each));
    this.initialised = true;
    this.timeTaken = 0;
    return this;
  };

  handleRefreshPlanetList = (attempt) => {
    const { oldPlanet, planet } = attempt;
    this.planets = this.planets.map((each) => {
      if (oldPlanet === each.value) {
        each.onDeselect();
      }
      if (planet === each.value) {
        each.onSelect();
      }
      return each;
    });
  };

  handleRefreshVehicleList = (attempt) => {
    const { oldVehicle, vehicle } = attempt;
    this.vehicles = this.vehicles.map((each) => {
      if (oldVehicle === each.value) {
        each.onDeselect();
      }
      if (vehicle === each.value) {
        each.onSelect();
      }
      return each;
    });
  };

  onSelectPlanet = (attemptId, planet) => {
    const updatedAttempt = this.attempts[attemptId].onSelectPlanet(planet);
    if (updatedAttempt.updated) {
      this.handleRefreshPlanetList(updatedAttempt);
      this.handleRefreshVehicleList(updatedAttempt);
      updatedAttempt.updated = false;
    }
    this.attempts[attemptId] = updatedAttempt;
    return this;
  };

  onSelectVehicle = (attemptId, vehicle) => {
    const updatedAttempt = this.attempts[attemptId].onSelectVehicle(vehicle);
    if (updatedAttempt.updated) {
      this.handleRefreshPlanetList(updatedAttempt);
      this.handleRefreshVehicleList(updatedAttempt);
      updatedAttempt.updated = false;
    }
    this.attempts[attemptId] = updatedAttempt;
    return this;
  };

  onCalculateTimeTaken = () => {
    this.timeTaken = this.attempts
      .map((each) => each.time)
      .reduce((acc, curr) => (curr ? acc + curr : acc), 0);
    return this;
  };
}

export default ApplicationState;
