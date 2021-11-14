import ApplicationState from "./ApplicationState";
import {
  DUMMY_PLANETS,
  DUMMY_PLANET_OBJ,
  DUMMY_TOKEN,
  DUMMY_VEHICLES,
  DUMMY_VEHICLE_OBJ
} from "./constants";
import Planet from "./Planet";
import Vehicle from "./Vehicle";

describe("Test suite for Application State", () => {
  it("should init application state correctly", () => {
    const applicationStateObj = new ApplicationState({ allowedAttempts: 4 });
    expect(applicationStateObj.attempts.length).toBe(4);
    expect(applicationStateObj.token).toBe(null);
    expect(applicationStateObj.planets.length).toBe(0);
    expect(applicationStateObj.vehicles.length).toBe(0);
    expect(applicationStateObj.timeTaken).toBe(0);
  });

  it("should init data correctly", () => {
    const applicationStateObj = new ApplicationState({ allowedAttempts: 4 });
    applicationStateObj.initData(DUMMY_TOKEN, DUMMY_PLANETS, DUMMY_VEHICLES);
    expect(applicationStateObj.attempts.length).toBe(4);
    expect(applicationStateObj.token).toBe(DUMMY_TOKEN);
    expect(applicationStateObj.planets.length).toBe(DUMMY_PLANETS.length);
    expect(applicationStateObj.vehicles.length).toBe(DUMMY_VEHICLES.length);
    expect(applicationStateObj.timeTaken).toBe(0);
  });

  it("should set attempt data correctly onSelectPlanet", () => {
    const attemptId = 0;
    const planetObj = new Planet(DUMMY_PLANET_OBJ);
    const applicationStateObj = new ApplicationState({ allowedAttempts: 4 });
    applicationStateObj.initData(DUMMY_TOKEN, DUMMY_PLANETS, DUMMY_VEHICLES);
    applicationStateObj.onSelectPlanet(attemptId, planetObj);
    const attempt = applicationStateObj.attempts[attemptId];
    expect(attempt.planet).toBe(planetObj.value);
    expect(attempt.distance).toBe(planetObj.distance);
    expect(attempt.vehicle).toBe("");
    expect(attempt.speed).toBe(0);
    expect(attempt.time).toBe(0);
  });

  it("should set attempt data correctly onSelectVehicle", () => {
    const attemptId = 0;
    const planetObj = new Planet(DUMMY_PLANET_OBJ);
    const vehicleObj = new Vehicle(DUMMY_VEHICLE_OBJ);
    const applicationStateObj = new ApplicationState({ allowedAttempts: 4 });
    applicationStateObj.initData(DUMMY_TOKEN, DUMMY_PLANETS, DUMMY_VEHICLES);
    applicationStateObj.onSelectPlanet(attemptId, planetObj);
    applicationStateObj.onSelectVehicle(attemptId, vehicleObj);
    const attempt = applicationStateObj.attempts[attemptId];
    expect(attempt.planet).toBe(planetObj.value);
    expect(attempt.distance).toBe(planetObj.distance);
    expect(attempt.vehicle).toBe(vehicleObj.value);
    expect(attempt.speed).toBe(vehicleObj.speed);
    const time = planetObj.distance / vehicleObj.speed;
    expect(attempt.time).toBe(time);
  });

  it("should update planet state correctly onSelectPlanet", () => {
    const attemptId = 0;
    const planetObj = new Planet(DUMMY_PLANET_OBJ);
    const applicationStateObj = new ApplicationState({ allowedAttempts: 4 });
    applicationStateObj.initData(DUMMY_TOKEN, DUMMY_PLANETS, DUMMY_VEHICLES);
    applicationStateObj.onSelectPlanet(attemptId, planetObj);
    const selectPlanetState = applicationStateObj.planets.find(
      (each) => each.value === planetObj.value
    );
    expect(selectPlanetState.value).toBe(planetObj.value);
    expect(selectPlanetState.selected).toBe(true);
  });

  it("should update vehicle state correctly onSelectVehicle", () => {
    const attemptId = 0;
    const planetObj = new Planet(DUMMY_PLANET_OBJ);
    const vehicleObj = new Vehicle(DUMMY_VEHICLE_OBJ);
    const applicationStateObj = new ApplicationState({ allowedAttempts: 4 });
    applicationStateObj.initData(DUMMY_TOKEN, DUMMY_PLANETS, DUMMY_VEHICLES);
    applicationStateObj.onSelectPlanet(attemptId, planetObj);
    applicationStateObj.onSelectVehicle(attemptId, vehicleObj);
    const selectedVehicle = applicationStateObj.vehicles.find(
      (each) => each.value === vehicleObj.value
    );
    expect(selectedVehicle.value).toBe(vehicleObj.value);
    expect(selectedVehicle.availableCount).toBe(vehicleObj.availableCount - 1);
  });

  it("should calculate total time spent correctly", () => {
    const applicationStateObj = new ApplicationState({ allowedAttempts: 2 });

    // update attempt 1
    applicationStateObj.initData(DUMMY_TOKEN, DUMMY_PLANETS, DUMMY_VEHICLES);
    applicationStateObj.onSelectPlanet(0, new Planet(DUMMY_PLANETS[0]));
    applicationStateObj.onSelectVehicle(0, new Vehicle(DUMMY_VEHICLES[0]));
    const attempt1 = applicationStateObj.attempts[0];
    expect(attempt1.time).toBe(50);

    // update attempt 2
    applicationStateObj.onSelectPlanet(1, new Planet(DUMMY_PLANETS[1]));
    applicationStateObj.onSelectVehicle(1, new Vehicle(DUMMY_VEHICLES[1]));
    const attempt2 = applicationStateObj.attempts[1];
    expect(attempt2.time).toBe(50);

    applicationStateObj.onCalculateTimeTaken();
    expect(applicationStateObj.timeTaken).toBe(50 + 50);
  });
});
