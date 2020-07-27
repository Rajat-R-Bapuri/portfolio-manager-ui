import * as actions from "./action-types";

export function userProfileLoaded(payload) {
  return {
    type: actions.USER_PROFILE_LOADED,
    payload,
  };
}
