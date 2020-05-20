import { setupInterceptors } from "../../../../auth/SetupInterceptors";
import Axios from "axios";
import {
  loginRoute,
  authStatusRoute,
  logoutRoute,
  registerRoute,
  rideRoute,
  carRoute,
  solicitRideRoute,
} from "../../../../constants/apiRoutes";
import { FETCH_USER, LOGOUT_USER, FETCH_CAR } from "./types";

setupInterceptors();

export function login(values, callback) {
  return (dispatch) => {
    Axios.post(loginRoute, values)
      .then((response) => {
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
  return (dispatch) => {
    Axios.post(registerRoute, values)
      .then((response) => {
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
  return (dispatch) => {
    Axios.get(logoutRoute)
      .then((response) => {
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
  return (dispatch) => {
    Axios.get(authStatusRoute)
      .then((response) => {
        if (response.status === 200) {
          dispatch({ type: FETCH_USER, payload: response.data.data });
          callback(true);
        } else {
          callback(false);
        }
      })
      .catch((error) => {
        callback(false);
      });
  };
}

export function createRide(values, callback) {
  return (dispatch) => {
    Axios.post(rideRoute, values)
      .then((response) => {
        if (response.status === 201) {
          // dispatch({ type: FETCH_RIDE, payload: response.data.data });
          // callback(true);
        }
      })
      .catch(() => {
        callback(false);
      });
  };
}

export function createCar(values, callback) {
  return (dispatch) => {
    Axios.post(carRoute, values)
      .then((response) => {
        if (response.status === 201) {
          dispatch({ type: FETCH_CAR, payload: response.data.data });
          callback(true);
        }
      })
      .catch(() => {
        callback(false);
      });
  };
}

export function solicitRide(values, rideId, callback) {
  return (dispatch) => {
    console.log("solicite ride route:", solicitRideRoute(rideID));
    Axios.post(solicitRideRoute(rideId), values)
      .then((response) => {
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
