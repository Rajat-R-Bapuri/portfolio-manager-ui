import produce from "immer";
import { STOCKS_SYMBOLS_LOADED } from "../actions/action-types";

const initialState = {
  symbols: [],
  query: null,
};

const stocksSymbolsReducer = (state = initialState, action) => {
  return produce(state, (draft) => {
    switch (action.type) {
      case STOCKS_SYMBOLS_LOADED:
        draft.symbols = action.payload;
        break;
      default:
        return state;
    }
  });
};

export default stocksSymbolsReducer;
