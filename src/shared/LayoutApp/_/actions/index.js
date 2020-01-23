import { setupInterceptors } from "../../../../auth/SetupInterceptors";
import Axios from "axios";
import { loginRoute, authStatusRoute } from "../../../../constants/apiRoutes";
import { FETCH_USER } from "./types";

setupInterceptors();

export function login(values, callback) {
  return dispatch => {
    Axios.post(loginRoute, values).then((response) => {
        if(response.status === 200){
            dispatch({type: FETCH_USER, payload: response.data});
            callback(true);
        }
      })
      .catch(error => {
            callback(false);
    });
  };
}

export function checkLogin(callback) {
  return dispatch => {

    Axios.get(authStatusRoute).then(response => {
        if(response.status === 200){
            dispatch({type: FETCH_USER, payload: response.data});
            callback(true);
        }
        else{
            callback(false);
        }
    })
    .catch(error => {
        callback(false);
    });
  }
}