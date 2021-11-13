import API from "./apis";
import ServiceFactory from "./utils/ServiceFactory";

function getToken() {
  const service = new ServiceFactory({
    method: "POST",
    url: API.getToken,
    headers: {
      Accept: "application/json"
    }
  });
  return service.execute();
}

function getPlanets() {
  const service = new ServiceFactory({
    method: "GET",
    url: API.getPlanets
  });
  return service.execute();
}

function getVehicles() {
  const service = new ServiceFactory({
    method: "GET",
    url: API.getVehicles
  });
  return service.execute();
}

function findFalcone(request) {
  const service = new ServiceFactory({
    method: "POST",
    url: API.findFalcone,
    dataParams: request,
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json"
    }
  });
  return service.execute();
}

const FindFalconService = {
  getToken,
  getPlanets,
  getVehicles,
  findFalcone
};

export default FindFalconService;
