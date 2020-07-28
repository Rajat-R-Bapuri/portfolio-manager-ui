import Cookies from "js-cookie";
import { stocksSymbolsLoaded } from "../actions/stocks-actions";
import queryString from "query-string";

export default function getSymbols(query) {
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
