import Cookies from "js-cookie";
import queryString from "query-string";
import { unauthorized } from "../actions";
import {
  popularStocksReceived,
  stockHistoryLoaded,
  stocksPricesReceived,
  stocksSymbolsLoaded,
} from "../actions/stocks-actions";

const yyyymmdd = function (date) {
  let mm = date.getMonth() + 1; // getMonth() is zero-based
  let dd = date.getDate();

  return [
    date.getFullYear(),
    (mm > 9 ? "" : "0") + mm,
    (dd > 9 ? "" : "0") + dd,
  ].join("-");
};

function getSymbols(query) {
  return (dispatch) => {
    const jwt = Cookies.get("jwt");
    const url = queryString.stringifyUrl({
      url: process.env.REACT_APP_BACKEND_API + "/stocks/symbols",
      query: {
        query: query.toUpperCase(),
      },
    });
    const headers = new Headers();
    headers.append("Authorization", `Bearer ${jwt}`);
    fetch(url, {
      headers: headers,
    })
      .then((response) => response.json())
      .then((data) => dispatch(stocksSymbolsLoaded(data)));
  };
}

function getCurrentPrices(query) {
  console.log(query);
  return (dispatch) => {
    const jwt = Cookies.get("jwt");
    const url = queryString.stringifyUrl(
      {
        url: process.env.REACT_APP_BACKEND_API + "/stocks/current/price",
        query: {
          symbols: query,
        },
      },
      {
        encode: false,
      }
    );
    const headers = new Headers();
    headers.append("Authorization", `Bearer ${jwt}`);
    fetch(url, {
      headers: headers,
    })
      .then((response) => response.json())
      .then((data) => dispatch(stocksPricesReceived(data)));
  };
}

function getPopularStocks() {
  return (dispatch) => {
    const jwt = Cookies.get("jwt");
    const url = queryString.stringifyUrl(
      {
        url: process.env.REACT_APP_BACKEND_API + "/stocks/symbols/popular",
      },
      {
        encode: false,
      }
    );
    const headers = new Headers();
    headers.append("Authorization", `Bearer ${jwt}`);
    fetch(url, {
      headers: headers,
    })
      .then((response) => response.json())
      .then((data) => dispatch(popularStocksReceived(data)));
  };
}

function fetchChart(symbol) {
  const jwt = Cookies.get("jwt");
  const url = `http://localhost:8080/stocks/${symbol}/history?from=2020-08-31`;

  return (dispatch) =>
    fetch(url, {
      method: "GET",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
        Authorization: `Bearer ${jwt}`,
      },
    })
      .then((response) => response.json())
      .then((data) => {
        if ("error" in data) {
          return dispatch(unauthorized());
        }
        return dispatch(stockHistoryLoaded({ symbol: symbol, data: data }));
      })
      .catch((err) => console.log(err));
}

export { getSymbols, getCurrentPrices, getPopularStocks, fetchChart };
