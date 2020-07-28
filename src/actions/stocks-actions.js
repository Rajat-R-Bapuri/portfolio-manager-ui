import { STOCKS_SYMBOLS_LOADED } from "./action-types";

export function stocksSymbolsLoaded(payload) {
  return {
    type: STOCKS_SYMBOLS_LOADED,
    payload,
  };
}
