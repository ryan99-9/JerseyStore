import { combineReducers } from "redux";
import userReducer from "./userReducer";
import historyReducer from "./historyReducer";

export default combineReducers({
    userReducer, historyReducer
})