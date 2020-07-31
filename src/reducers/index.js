import { combineReducers } from "redux";
import loginReducer from "./login.reducer";
import stocksSymbolsReducer from "./stocks.reducer";
import userReducer from "./user-portfolio.reducer";

export default combineReducers({
  userReducer,
  loginReducer,
  stocksSymbolsReducer,
});
