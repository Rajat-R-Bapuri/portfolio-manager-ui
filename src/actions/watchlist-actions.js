import { ADD_TO_WATCHLIST, REMOVE_FROM_WATCHLIST } from "./action-types";

export function addToWatchlistAction(payload) {
  return {
    type: ADD_TO_WATCHLIST,
    payload,
  };
}

export function removeFromWatchlistAction(payload) {
  return {
    type: REMOVE_FROM_WATCHLIST,
    payload,
  };
}
