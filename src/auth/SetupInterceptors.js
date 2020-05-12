import { history } from "../components/Routes";
import Axios from "axios";

export const setupInterceptors = () => {
  Axios.interceptors.request.use(
    (config) => {
      config = {
        ...config,
        withCredentials: true,
      };
      config.headers = {
        ...config.headers,
        "content-type": "application/json",
        Authorization: "Token " + localStorage.getItem("auth_token"),
      };
      return config;
    },
    (error) =>
      // Do something with request error
      Promise.reject(error)
  );

  Axios.interceptors.response.use(
    (response) => {
      if (response.data["auth_token"]) {
        persistAuthHeadersInDeviceStorage(response.data);
      }
      if (response.data["message"] === "Successfully logged out.") {
        localStorage.removeItem("auth_token");
      }
      return response;
    },
    function (error) {
      // Do something with response error
      if (error.response) {
        if (error.response.status === 401) {
          localStorage.removeItem("auth_token");
          error.request.responseURL.indexOf("/auth/login") === -1 &&
            onUnauthenticated();
        }
      }
      return Promise.reject(error);
    }
  );

  function persistAuthHeadersInDeviceStorage(data) {
    localStorage.setItem("auth_token", data["auth_token"]);
  }
};

export function onUnauthenticated() {
  history.push("/logout");
}
