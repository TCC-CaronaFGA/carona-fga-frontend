import { setupInterceptors } from "../../../../auth/SetupInterceptors";
import Axios from "axios";
import {
  loginRoute,
  authStatusRoute,
  logoutRoute,
  registerRoute
} from "../../../../constants/apiRoutes";
import { FETCH_USER, LOGOUT_USER } from "./types";

setupInterceptors();

export function login(values, callback) {
  return dispatch => {
    Axios.post(loginRoute, values)
      .then(response => {
        if (response.status === 200) {
          dispatch({ type: FETCH_USER, payload: response.data.data });
          callback(true);
        }
      })
      .catch(() => {
        callback(false);
      });
  };
}

export function register(values, callback) {
  return dispatch => {
    Axios.post(registerRoute, values)
      .then(response => {
        if (response.status === 201) {
          dispatch({ type: FETCH_USER, payload: response.data.data });
          callback(true);
        }
      })
      .catch(() => {
        callback(false);
      });
  };
}

export function logout(callback) {
  return dispatch => {
    Axios.get(logoutRoute)
      .then(response => {
        if (response.status === 200) {
          dispatch({ type: LOGOUT_USER });
        }
        callback();
      })
      .catch(() => {
        callback();
      });
  };
}

export function checkLogin(callback) {
  return dispatch => {
    Axios.get(authStatusRoute)
      .then(response => {
        if (response.status === 200) {
          dispatch({ type: FETCH_USER, payload: response.data.data });
          callback(true);
        } else {
          callback(false);
        }
      })
      .catch(error => {
        callback(false);
      });
  };
}
