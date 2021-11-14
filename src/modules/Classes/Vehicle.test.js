import { DUMMY_VEHICLE_OBJ } from "./constants";
import Vehicle from "./Vehicle";

describe("Test suite for Vehicle Entity", () => {
  beforeEach(() => {});

  it("should initialise vehicle correctly.", () => {
    const vehicleObj = new Vehicle(DUMMY_VEHICLE_OBJ);
    expect(vehicleObj.label).toBe(DUMMY_VEHICLE_OBJ.name);
    expect(vehicleObj.value).toBe(DUMMY_VEHICLE_OBJ.name);
    expect(vehicleObj.totalCount).toBe(DUMMY_VEHICLE_OBJ.total_no);
    expect(vehicleObj.availableCount).toBe(DUMMY_VEHICLE_OBJ.total_no);
    expect(vehicleObj.maxDistance).toBe(DUMMY_VEHICLE_OBJ.max_distance);
    expect(vehicleObj.speed).toBe(DUMMY_VEHICLE_OBJ.speed);
    const subLabel = `Count: ${DUMMY_VEHICLE_OBJ.total_no}, Speed: ${DUMMY_VEHICLE_OBJ.speed}, Dist: ${DUMMY_VEHICLE_OBJ.max_distance}`;
    expect(vehicleObj.subLabel).toBe(subLabel);
  });

  it("should decrease available count if vehicle onSelect.", () => {
    const vehicleObj = new Vehicle(DUMMY_VEHICLE_OBJ);
    expect(vehicleObj.totalCount).toBe(DUMMY_VEHICLE_OBJ.total_no);
    expect(vehicleObj.availableCount).toBe(DUMMY_VEHICLE_OBJ.total_no);
    vehicleObj.onSelect();
    expect(vehicleObj.totalCount).toBe(DUMMY_VEHICLE_OBJ.total_no);
    expect(vehicleObj.availableCount).toBe(DUMMY_VEHICLE_OBJ.total_no - 1);
    const subLabel = `Count: ${DUMMY_VEHICLE_OBJ.total_no - 1}, Speed: ${
      DUMMY_VEHICLE_OBJ.speed
    }, Dist: ${DUMMY_VEHICLE_OBJ.max_distance}`;
    expect(vehicleObj.subLabel).toBe(subLabel);
  });

  it("should increase available count if vehicle onDeselect.", () => {
    const vehicleObj = new Vehicle(DUMMY_VEHICLE_OBJ);
    expect(vehicleObj.totalCount).toBe(DUMMY_VEHICLE_OBJ.total_no);
    expect(vehicleObj.availableCount).toBe(DUMMY_VEHICLE_OBJ.total_no);
    vehicleObj.onDeselect();
    expect(vehicleObj.totalCount).toBe(DUMMY_VEHICLE_OBJ.total_no);
    expect(vehicleObj.availableCount).toBe(DUMMY_VEHICLE_OBJ.total_no + 1);
    const subLabel = `Count: ${DUMMY_VEHICLE_OBJ.total_no + 1}, Speed: ${
      DUMMY_VEHICLE_OBJ.speed
    }, Dist: ${DUMMY_VEHICLE_OBJ.max_distance}`;
    expect(vehicleObj.subLabel).toBe(subLabel);
  });
});
