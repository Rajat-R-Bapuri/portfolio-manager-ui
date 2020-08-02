import { Box, Grid, withStyles } from "@material-ui/core";
import React from "react";
import { connect } from "react-redux";
import fetchUserProfile from "../../utils/fetch-user-data";
import { getPopularStocks } from "../../utils/stocks-handler";
import SearchBar from "../search-bar/search-bar";
import Watchlist from "../watchlist/watchlist";
import styles from "./styles";
// import News from "../news/news";

class DashBoard extends React.Component {
  componentDidMount() {
    this.props.dispatch(fetchUserProfile());
    this.props.dispatch(getPopularStocks());
  }

  getDashboardComponents() {
    return (
      <Box borderRadius={25} borderBottom={1} boxShadow={2}>
        <Grid container spacing={0} className={this.props.classes.root}>
          <Grid item xs={6}>
            <div>
              <SearchBar />
            </div>
          </Grid>
          <Grid item xs={6} style={{ padding: "5px" }}>
            <Watchlist />
          </Grid>
          {/* <News query={"Stocks"} /> */}
        </Grid>
      </Box>
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
