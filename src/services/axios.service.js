import Axios from "axios";
import environment from "../environments/environment";
import { set_request_spinner_ended, set_request_spinner_started } from "../redux/reducer/spinnerReducer";
import store from "../redux/store";

class AxiosService {
  axios;
  axiosConfig;
  authService;
  constructor(params) {
    this.axios = Axios.create({
      baseURL: this.getBaseUrl(),
    });
    this.getAxiosConfig();
  }

  getBaseUrl() {
    return environment.baseUrl + "/api";
  }

  getAxiosConfig = (_token) => {
    // const token = _token ? _token : localStorageServ.accessToken.get();
    this.axiosConfig = {
      headers: {
        apiKey: "UPD124yRTWF124QJFweUaCYSECETBERS",
        "Content-Type": "application/json",
      },
    };
  };

  removeAxiosConfig = () => {
    this.axiosConfig = {
      headers: {
        iKeapy: ``,
        "Content-Type": "application/json",
      },
    };
  };

  getMethod(uri, loading = true) {
    return this.handleFlow(this.axios.get(uri, this.axiosConfig), loading);
  }

  postMethod(uri, data, loading = true) {
    return this.handleFlow(this.axios.post(uri, data, this.axiosConfig), loading);
  }

  putMethod(uri, data, loading = true) {
    return this.handleFlow(this.axios.put(uri, data, this.axiosConfig), loading);
  }

  patchMethod(uri, data, loading = true) {
    return this.handleFlow(this.axios.patch(uri, data, this.axiosConfig), loading);
  }

  deleteMothod(uri, loading = true) {
    return this.handleFlow(this.axios.delete(uri, this.axiosConfig), loading);
  }

  handleFlow(method, loading = true) {
    loading && store.dispatch(set_request_spinner_started())
    return new Promise((resolve, reject) => {
      method
        .then((res) => {
          loading && store.dispatch(set_request_spinner_ended())

          resolve({
            data: res.data,
            status: res.status,
            isSuccess: true,
          });
        })
        .catch((err) => {
          loading && store.dispatch(set_request_spinner_ended())

          this.handleError(err);
          reject({
            err: err,
          });
        });
    });
  }

  handleError = (err) => {
    const status = err.response?.status;
    switch (
    status
    // case 400:
    // case 401:
    // case 403:
    //   window.location.assign("/lms");
    //   break;
    // default:
    //   break;
    ) {
    }
  };
  //
  axiosInstance = (req) => {
    this.axios(req, this.axiosConfig);
  };
}

const AxiosServ = new AxiosService();
export default AxiosServ;
