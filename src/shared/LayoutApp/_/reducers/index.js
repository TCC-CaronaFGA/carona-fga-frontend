
import {FETCH_USER, LOGOUT_USER} from "../actions/types"

export default (state = {}, action) => {
    switch(action.type){
        case FETCH_USER:
            return action.payload.data != null ? action.payload.data : action.payload;
        case LOGOUT_USER:
            return {};
        default:
            return {...state}
    }
}
