import produce from "immer";
import {
  POPULAR_STOCK_SYMBOLS_LOADED,
  STOCKS_PRICES_RECEIVED,
  STOCKS_SYMBOLS_LOADED,
  STOCK_HISTORY_LOADED,
} from "../actions/action-types";

const initialState = {
  symbols: [],
  prices: {},
  query: null,
};

const stocksReducer = (state = initialState, action) => {
  return produce(state, (draft) => {
    switch (action.type) {
      case STOCKS_SYMBOLS_LOADED:
        draft.symbols = action.payload;
        break;
      case STOCKS_PRICES_RECEIVED:
        draft.prices = action.payload;
        break;
      case POPULAR_STOCK_SYMBOLS_LOADED:
        draft.popularStocks = action.payload;
        break;
      case STOCK_HISTORY_LOADED:
        draft[action.payload.symbol] = action.payload.data;
        break;
      default:
        return state;
    }
  });
};

export default stocksReducer;
