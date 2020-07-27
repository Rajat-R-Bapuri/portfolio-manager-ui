import produce from "immer";
import { USER_LOGGED_IN, USER_LOGGED_OUT } from "../actions/action-types";

const initialState = {
  loggedIn: false,
};

const loginReducer = (state = initialState, action) => {
  return produce(state, (draft) => {
    switch (action.type) {
      case USER_LOGGED_IN:
        draft.loggedIn = true;
        break;
      case USER_LOGGED_OUT:
        draft.loggedIn = false;
        break;
      default:
        return state;
    }
  });
};

export default loginReducer;
