import { userLoggedIn, userLoggedOut } from "../actions/login-actions";
import Cookies from "js-cookie";
import { dispatch } from "d3";

export default function handleGoogleLoginResponse(response) {
  console.log("resp", response);
  if ("error" in response) {
    // there was an error logging in
    return (dispatch) => dispatch(userLoggedOut());
  } else {
    // send IdToken to backend,  write cookie and dispatch logged in action to redux
    const idToken = response["tokenId"];
    const urlencoded = new URLSearchParams();
    urlencoded.append("idToken", idToken);
    return (dispatch) =>
      fetch(`${process.env.REACT_APP_BACKEND_API}/google/login`, {
        method: "POST",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/x-www-form-urlencoded",
        },
        body: urlencoded,
      })
        .then((response) => response.json())
        .then((data) => {
          Cookies.set("jwt", data.token);
          return dispatch(userLoggedIn());
        })
        .catch((err) => console.log(err));
  }
}
