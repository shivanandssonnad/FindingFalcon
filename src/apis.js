const host = "https://findfalcone.herokuapp.com";

const API = {
  host,
  getToken: `${host}/token`,
  getPlanets: `${host}/planets`,
  getVehicles: `${host}/vehicles`,
  findFalcone: `${host}/find`
};

export default API;
