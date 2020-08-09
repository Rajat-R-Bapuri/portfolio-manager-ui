import { NEWS_LOADED } from "./action-types";

export function newsLoaded(payload) {
  return {
    type: NEWS_LOADED,
    payload,
  };
}
