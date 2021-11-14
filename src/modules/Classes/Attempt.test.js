import Attempt from "./Attempt";
import {
  DUMMY_PLANET_OBJ,
  DUMMY_PLANET_OBJ_2,
  DUMMY_VEHICLE_OBJ,
  DUMMY_VEHICLE_OBJ_2
} from "./constants";
import Planet from "./Planet";

describe("Test suite for Attempt Entity", () => {
  beforeEach(() => {});

  it("should initialise Attempt entity correct", () => {
    const attemptObj = new Attempt({ id: 1 });
    expect(attemptObj.vehicle).toBe("");
    expect(attemptObj.oldVehicle).toBe("");
    expect(attemptObj.planet).toBe("");
    expect(attemptObj.oldPlanet).toBe("");
    expect(attemptObj.distance).toBe(0);
    expect(attemptObj.speed).toBe(0);
    expect(attemptObj.time).toBe(0);
    expect(attemptObj.id).toBe(1);
    expect(attemptObj.updated).toBe(false);
  });

  it("should set planet info correctly onSelectPlanet - fist select scenario", () => {
    const attemptObj = new Attempt({ id: 1 });
    const planetObj = new Planet(DUMMY_PLANET_OBJ);

    //select planet
    attemptObj.onSelectPlanet(planetObj);
    expect(attemptObj.planet).toBe(planetObj.value);
    expect(attemptObj.distance).toBe(planetObj.distance);
    expect(attemptObj.oldPlanet).toBe("");
    expect(attemptObj.updated).toBe(true);
    expect(attemptObj.vehicle).toBe("");
    expect(attemptObj.speed).toBe(0);
    expect(attemptObj.time).toBe(0);
    attemptObj.updated = false;
  });

  it("should set planet info correctly onSelectPlanet - Update selected scenario", () => {
    const attemptObj = new Attempt({ id: 1 });
    const planetObj = new Planet(DUMMY_PLANET_OBJ);
    const planetObj2 = new Planet(DUMMY_PLANET_OBJ_2);

    //select planet
    attemptObj.onSelectPlanet(planetObj);
    expect(attemptObj.planet).toBe(planetObj.value);
    expect(attemptObj.oldPlanet).toBe("");
    expect(attemptObj.updated).toBe(true);
    attemptObj.updated = false;

    //select planet
    attemptObj.onSelectPlanet(planetObj2);
    expect(attemptObj.planet).toBe(planetObj2.value);
    expect(attemptObj.oldPlanet).toBe(planetObj.value);
    expect(attemptObj.updated).toBe(true);
    expect(attemptObj.vehicle).toBe("");
    expect(attemptObj.speed).toBe(0);
    expect(attemptObj.time).toBe(0);
  });

  it("should not update planet info if same planet selected again", () => {
    const attemptObj = new Attempt({ id: 1 });
    const planetObj = new Planet(DUMMY_PLANET_OBJ);
    const planetObj2 = new Planet(DUMMY_PLANET_OBJ);

    // select planet
    attemptObj.onSelectPlanet(planetObj);
    expect(attemptObj.planet).toBe(planetObj.value);
    expect(attemptObj.oldPlanet).toBe("");
    expect(attemptObj.updated).toBe(true);
    attemptObj.updated = false;

    // select planet
    attemptObj.onSelectPlanet(planetObj2);
    expect(attemptObj.planet).toBe(planetObj2.value);
    expect(attemptObj.oldPlanet).toBe("");
    expect(attemptObj.updated).toBe(false);
  });

  it("should set vehicle info correctly onSelectVehicle - fist select scenario", () => {
    const attemptObj = new Attempt({ id: 1 });
    const planetObj = new Planet(DUMMY_PLANET_OBJ);
    const vehicleObj = new Planet(DUMMY_VEHICLE_OBJ);

    // select planet
    attemptObj.onSelectPlanet(planetObj);
    attemptObj.updated = false;

    // select vehicle
    attemptObj.onSelectVehicle(vehicleObj);
    expect(attemptObj.planet).toBe(planetObj.value);
    expect(attemptObj.vehicle).toBe(vehicleObj.value);
    expect(attemptObj.oldVehicle).toBe("");
    expect(attemptObj.speed).toBe(vehicleObj.speed);
    expect(attemptObj.updated).toBe(true);
    const time = attemptObj.distance / vehicleObj.speed;
    expect(attemptObj.time).toBe(time);
    attemptObj.updated = false;
  });

  it("should set planet info correctly onSelectPlanet - Update selected scenario", () => {
    const attemptObj = new Attempt({ id: 1 });
    const planetObj = new Planet(DUMMY_PLANET_OBJ);
    const vehicleObj = new Planet(DUMMY_VEHICLE_OBJ);
    const vehicleObj2 = new Planet(DUMMY_VEHICLE_OBJ_2);

    //select planet
    attemptObj.onSelectPlanet(planetObj);
    attemptObj.updated = false;

    //select vehicle 1
    attemptObj.onSelectVehicle(vehicleObj);
    expect(attemptObj.planet).toBe(planetObj.value);
    expect(attemptObj.vehicle).toBe(vehicleObj.value);
    expect(attemptObj.oldVehicle).toBe("");
    expect(attemptObj.speed).toBe(vehicleObj.speed);
    const time1 = attemptObj.distance / vehicleObj.speed;
    expect(attemptObj.time).toBe(time1);
    expect(attemptObj.updated).toBe(true);
    attemptObj.updated = false;

    //select vehicle 2
    attemptObj.onSelectVehicle(vehicleObj2);
    expect(attemptObj.vehicle).toBe(vehicleObj2.value);
    expect(attemptObj.oldVehicle).toBe(vehicleObj.value);
    expect(attemptObj.speed).toBe(vehicleObj2.speed);
    const time2 = attemptObj.distance / vehicleObj2.speed;
    expect(attemptObj.time).toBe(time2);
    expect(attemptObj.updated).toBe(true);
  });

  it("should not update vehicle info if same vehicle selected again", () => {
    const attemptObj = new Attempt({ id: 1 });
    const planetObj = new Planet(DUMMY_PLANET_OBJ);
    const vehicleObj = new Planet(DUMMY_VEHICLE_OBJ);
    const vehicleObj2 = new Planet(DUMMY_VEHICLE_OBJ);

    //select planet
    attemptObj.onSelectPlanet(planetObj);
    attemptObj.updated = false;

    //select vehicle 1
    attemptObj.onSelectVehicle(vehicleObj);
    expect(attemptObj.planet).toBe(planetObj.value);
    expect(attemptObj.vehicle).toBe(vehicleObj.value);
    expect(attemptObj.oldVehicle).toBe("");
    expect(attemptObj.speed).toBe(vehicleObj.speed);
    const time1 = attemptObj.distance / vehicleObj.speed;
    expect(attemptObj.time).toBe(time1);
    expect(attemptObj.updated).toBe(true);
    attemptObj.updated = false;

    //select vehicle 2
    attemptObj.onSelectVehicle(vehicleObj2);
    expect(attemptObj.vehicle).toBe(vehicleObj2.value);
    expect(attemptObj.oldVehicle).toBe("");
    expect(attemptObj.speed).toBe(vehicleObj2.speed);
    const time2 = attemptObj.distance / vehicleObj2.speed;
    expect(attemptObj.time).toBe(time2);
    expect(attemptObj.updated).toBe(false);
  });
});
