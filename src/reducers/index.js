import { combineReducers } from "redux";
import userReducer from "./user-portfolio.reducer";
import loginReducer from "./login.reducer";

export default combineReducers({ userReducer, loginReducer });
