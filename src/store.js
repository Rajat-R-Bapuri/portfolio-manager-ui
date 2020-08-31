import { applyMiddleware, compose, createStore } from "redux";
import thunk from "redux-thunk";
import reducer from "./reducers";

const composeEnhancer = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
export default createStore(reducer, composeEnhancer(applyMiddleware(thunk)));
