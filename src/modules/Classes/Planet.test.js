import { DUMMY_PLANET_OBJ } from "./constants";
import Planet from "./Planet";

describe("Test suite for Planet Entity", () => {
  beforeEach(() => {});

  it("should initialise Planet entity correctly", () => {
    const planetObj = new Planet(DUMMY_PLANET_OBJ);
    expect(planetObj.value).toBe(DUMMY_PLANET_OBJ.name);
    expect(planetObj.label).toBe(DUMMY_PLANET_OBJ.name);
    expect(planetObj.distance).toBe(DUMMY_PLANET_OBJ.distance);
    expect(planetObj.selected).toBe(false);
    const subLabel = `Distance: ${DUMMY_PLANET_OBJ.distance}`;
    expect(planetObj.subLabel).toBe(subLabel);
  });

  it("should set selected true if planet onSelect", () => {
    const planetObj = new Planet(DUMMY_PLANET_OBJ);
    expect(planetObj.selected).toBe(false);
    planetObj.onSelect();
    expect(planetObj.selected).toBe(true);
  });

  it("should set selected false if planet onSelect", () => {
    const planetObj = new Planet(DUMMY_PLANET_OBJ);
    expect(planetObj.selected).toBe(false);
    planetObj.onSelect();
    expect(planetObj.selected).toBe(true);
    planetObj.onDeselect();
    expect(planetObj.selected).toBe(false);
  });
});
