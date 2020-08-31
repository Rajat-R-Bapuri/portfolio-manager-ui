import { combineReducers } from "redux";
import loginReducer from "./login.reducer";
import newsReducer from "./news.reducer";
import stocksReducer from "./stocks.reducer";
import userReducer from "./user-portfolio.reducer";

export default combineReducers({
  userReducer,
  loginReducer,
  stocksReducer,
  newsReducer,
});
