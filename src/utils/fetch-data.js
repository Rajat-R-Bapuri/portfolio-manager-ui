import { userProfileLoaded } from "../actions";

function fetchUserProfile() {
  const jwt =
    "eyJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJyYWphdC5yLmJhcHVyaUBnbWFpbC5jb20iLCJpYXQiOjE1OTU3OTkwMzksImV4cCI6MTU5NjE1OTAzOX0.CnybwmL7v-LiXO4QwTuwwK0udYwj3F_ENPO0A2wd78E";

  return (dispatch) =>
    fetch(`http://localhost:8080/users/profile`, {
      method: "GET",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
        Authorization: `Bearer ${jwt}`,
      },
    })
      .then((response) => response.json())
      .then((data) => {
        return dispatch(userProfileLoaded(data));
      })
      .catch((err) => console.log(err));
}

export default fetchUserProfile;
