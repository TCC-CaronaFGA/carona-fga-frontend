var baseURL = "";
if (process.env.REACT_APP_BACKEND_URL) {
  baseURL = `${process.env.REACT_APP_BACKEND_URL}`;
} else {
  baseURL = "http://localhost:5000/api";
}

export const loginRoute = baseURL + "/auth/login";
export const registerRoute = baseURL + "/auth/registration";
export const logoutRoute = baseURL + "/auth/logout";
export const authStatusRoute = baseURL + "/auth/status";
export const rideRoute = baseURL + "/rides";
export const carRoute = baseURL + "/cars";
export const solicitRideRoute = function (rideID) {
  return baseURL + "/rides/" + rideID;
};
