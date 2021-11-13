class Vehicle {
  constructor(config) {
    this.label = config.name;
    this.value = config.name;
    this.totalCount = config.total_no;
    this.availableCount = config.total_no;
    this.maxDistance = config.max_distance;
    this.speed = config.speed;
    this.setSubLable();
  }

  setSubLable = () => {
    this.subLabel = `Count: ${this.availableCount}, Speed: ${this.speed}, Dist: ${this.maxDistance}`;
  };

  onSelect = () => {
    this.availableCount = this.availableCount - 1;
    this.setSubLable();
    return this;
  };

  onDeselect = () => {
    this.availableCount = this.availableCount + 1;
    this.setSubLable();
    return this;
  };
}

export default Vehicle;
