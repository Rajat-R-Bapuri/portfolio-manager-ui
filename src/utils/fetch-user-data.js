import Cookies from "js-cookie";
import { unauthorized, userProfileLoaded } from "../actions";

function fetchUserProfile() {
  const jwt = Cookies.get("jwt");
  return (dispatch) =>
    fetch(`${process.env.REACT_APP_BACKEND_API}/users/profile`, {
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
        return dispatch(userProfileLoaded(data));
      })
      .catch((err) => console.log(err));
}

export default fetchUserProfile;
