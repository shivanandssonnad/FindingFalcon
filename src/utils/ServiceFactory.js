// https://geektrust.s3-ap-southeast-1.amazonaws.com/adminui-problem/members.json

import axios from "axios";

class ServiceFactory {
  constructor(props) {
    const { method, url, queryParams, dataParams, headers } = props || {};
    this.method = method;
    this.url = url;
    this.queryParams = queryParams;
    this.dataParams = dataParams;
    this.headers = headers;
  }

  getUrlWithParams = () => {
    return this.url;
  };

  execute = () => {
    return axios({
      url: this.getUrlWithParams(),
      method: this.method,
      params: this.params,
      data: this.dataParams,
      headers: this.headers
    }).catch((response) => ({ error: response.data }));
  };
}

export default ServiceFactory;
