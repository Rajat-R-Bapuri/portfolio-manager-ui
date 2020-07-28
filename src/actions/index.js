import * as actions from "./action-types";

export function userProfileLoaded(payload) {
  return {
    type: actions.USER_PROFILE_LOADED,
    payload,
  };
}

export function unauthorized() {
  return {
    type: actions.USER_PROFILE_LOAD_FAILED,
  };
}
