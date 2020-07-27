import produce from "immer";
import { USER_PROFILE_LOADED } from "../actions/actionTypes";

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
      default:
        return state;
    }
  });
};

export default userReducer;
