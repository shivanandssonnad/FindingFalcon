class Planet {
  constructor(config) {
    this.label = config.name;
    this.value = config.name;
    this.subLabel = `Distance: ${config.distance}`;
    this.distance = config.distance;
    this.selected = false;
  }

  onSelect = () => {
    this.selected = true;
    return this;
  };

  onDeselect = () => {
    this.selected = false;
    return this;
  };
}

export default Planet;
