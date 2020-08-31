import produce from "immer";
import { NEWS_LOADED } from "../actions/action-types";

const initialState = {};

const newsReducer = (state = initialState, action) => {
  return produce(state, (draft) => {
    switch (action.type) {
      case NEWS_LOADED:
        draft[action.payload.symbol] = action.payload.data;
        break;
      default:
        return state;
    }
  });
};

export default newsReducer;
