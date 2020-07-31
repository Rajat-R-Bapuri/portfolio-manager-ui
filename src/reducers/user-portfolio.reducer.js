import produce from "immer";
import {
  ADD_TO_WATCHLIST,
  REMOVE_FROM_WATCHLIST,
  USER_PROFILE_LOADED,
} from "../actions/action-types";

const initialState = {
  profile: {},
  loaded: false,
};

const userReducer = (state = initialState, action) => {
  return produce(state, (draft) => {
    switch (action.type) {
      case USER_PROFILE_LOADED:
        draft.profile = action.payload;
        draft.loaded = true;
        break;
      case ADD_TO_WATCHLIST:
        draft.profile.watchlist = [...state.profile.watchlist, action.payload];
        break;
      case REMOVE_FROM_WATCHLIST:
        let cWatchlist = [...state.profile.watchlist];
        cWatchlist.splice(cWatchlist.indexOf(action.payload), 1);
        draft.profile.watchlist = cWatchlist;
        break;
      default:
        return state;
    }
  });
};

export default userReducer;
