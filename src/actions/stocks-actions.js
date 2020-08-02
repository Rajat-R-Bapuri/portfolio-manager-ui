import {
  POPULAR_STOCK_SYMBOLS_LOADED,
  STOCKS_PRICES_RECEIVED,
  STOCKS_SYMBOLS_LOADED,
} from "./action-types";

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

export function popularStocksReceived(payload) {
  return {
    type: POPULAR_STOCK_SYMBOLS_LOADED,
    payload,
  };
}
