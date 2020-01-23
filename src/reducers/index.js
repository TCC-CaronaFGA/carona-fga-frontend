import { combineReducers } from "redux";
import userReducer from "../shared/LayoutApp/_/reducers"

export default combineReducers({
    user: userReducer
})