import { combineReducers } from "redux";
import { AlertReducer } from "./AlertReducer";
import { AuthReducer } from "./AuthReducer";



export const RootReducer = combineReducers({
    auth:AuthReducer,
    alert:AlertReducer
})