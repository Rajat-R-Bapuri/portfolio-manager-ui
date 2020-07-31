import Cookies from "js-cookie";
import {
  addToWatchlistAction,
  removeFromWatchlistAction,
} from "../actions/watchlist-actions";
// profile/watchlist/add
// /profile/watchlist/remove

function addToWatchlist(symbol) {
  const jwt = Cookies.get("jwt");
  return (dispatch) =>
    fetch(`${process.env.REACT_APP_BACKEND_API}/users/profile/watchlist/add`, {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
        Authorization: `Bearer ${jwt}`,
      },
      body: JSON.stringify({
        symbols: [symbol],
      }),
    })
      .then((response) => response.text())
      .then(() => dispatch(addToWatchlistAction(symbol))) // action(symbol)
      .catch((err) => console.log(err));
}

function removeFromWatchlist(symbol) {
  const jwt = Cookies.get("jwt");
  return (dispatch) =>
    fetch(
      `${process.env.REACT_APP_BACKEND_API}/users/profile/watchlist/remove`,
      {
        method: "POST",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
          Authorization: `Bearer ${jwt}`,
        },
        body: JSON.stringify({
          symbols: [symbol],
        }),
      }
    )
      .then((response) => response.text())
      .then(() => dispatch(removeFromWatchlistAction(symbol)))
      .catch((err) => console.log(err));
}

export { addToWatchlist, removeFromWatchlist };
