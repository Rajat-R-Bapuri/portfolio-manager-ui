import React from "react";
import { connect } from "react-redux";
import styles from "./styles";
import SearchBar from "../search-bar/search-bar";
import Watchlist from "../watchlist/watchlist";
import fetchUserProfile from "../../utils/fetch-user-data";
import { withStyles } from "@material-ui/core";
import News from "../news/news";

class DashBoard extends React.Component {
  componentDidMount() {
    this.props.dispatch(fetchUserProfile());
  }

  getDashboardComponents() {
    return (
      <div>
        <SearchBar />
        <Watchlist />
        <News query={"Stocks"} />
      </div>
    );
  }

  render() {
    return this.props.loaded ? this.getDashboardComponents() : <h1>Loading</h1>;
  }
}

function mapStateToProps(state) {
  return {
    profile: state.userReducer.profile,
    loaded: state.userReducer.loaded,
  };
}

export default connect(mapStateToProps)(
  withStyles(styles, { withTheme: true })(DashBoard)
);
