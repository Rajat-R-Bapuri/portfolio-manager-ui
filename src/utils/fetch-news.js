import Cookies from "js-cookie";
import { unauthorized } from "../actions";
import { newsLoaded } from "../actions/news-actions";

function fetchNews(symbol) {
  const jwt = Cookies.get("jwt");
  let url = `${process.env.REACT_APP_BACKEND_API}/stocks/news`;

  if (symbol !== "Stocks") url = `${url}/${symbol}`;

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
        console.log(data);
        return dispatch(
          newsLoaded({
            symbol,
            data,
          })
        );
      })
      .catch((err) => console.log(err));
}

export default fetchNews;
