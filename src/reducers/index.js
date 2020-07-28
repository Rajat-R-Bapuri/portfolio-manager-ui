import { combineReducers } from "redux";
import userReducer from "./user-portfolio.reducer";
import loginReducer from "./login.reducer";
import stocksSymbolsReducer from "./stocks.reducer";

export default combineReducers({
  userReducer,
  loginReducer,
  stocksSymbolsReducer,
});
