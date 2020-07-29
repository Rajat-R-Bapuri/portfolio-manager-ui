import { STOCKS_SYMBOLS_LOADED, STOCKS_PRICES_RECEIVED } from "./action-types";

export function stocksSymbolsLoaded(payload) {
  return {
    type: STOCKS_SYMBOLS_LOADED,
    payload,
  };
}

export function stocksPricesReceived(payload) {
  return {
    type: STOCKS_PRICES_RECEIVED,
    payload,
  };
}
