class Attempt {
  constructor(config) {
    this.planet = config.planet || "";
    this.oldPlanet = "";
    this.distance = config.distance || 0;
    this.vehicle = config.vehicle || "";
    this.oldVehicle = "";
    this.speed = config.speed || 0;
    this.time = config.time || 0;
    this.id = config.id;
    this.updated = false;
  }

  onSelectPlanet = (planet) => {
    if (!planet) return this;
    const { value, distance } = planet || {};
    if (value === this.planet) return this;
    this.oldPlanet = this.planet;
    this.oldVehicle = this.vehicle;
    this.planet = value;
    this.distance = distance;
    this.vehicle = "";
    this.speed = 0;
    this.time = 0;
    this.updated = true;
    return this;
  };

  onSelectVehicle = (vehicle) => {
    if (!vehicle) return this;
    const { value, speed } = vehicle || {};
    if (value === this.vehicle) return this;
    this.vehicle = value;
    this.speed = speed;
    this.time = this.distance / speed;
    this.updated = true;
    return this;
  };
}

export default Attempt;
