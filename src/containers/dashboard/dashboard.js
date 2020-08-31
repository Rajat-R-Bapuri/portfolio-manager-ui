import {Box, Grid, withStyles} from "@material-ui/core";
import React from "react";
import {connect} from "react-redux";
import AppBar from "../../containers/app-bar/app-bar";
// import fetchUserProfile from "../../utils/fetch-user-data";
// import { getPopularStocks } from "../../utils/stocks-handler";
import News from "../news/news";
// import SearchBar from "../search-bar/search-bar";
import styles from "./styles";

class DashBoard extends React.Component {
    componentDidMount() {
        // this.props.dispatch(fetchUserProfile());
        // this.props.dispatch(getPopularStocks());
    }

    getDashboardComponents() {
        return (
            <div>
                <AppBar/>
                <Box borderRadius={25} boxShadow={10}>
                    <Grid container spacing={0} className={this.props.classes.root}>
                        <Grid item lg={6} sm={12} xs={12}>
                            <div>{/* <SearchBar /> */}</div>
                        </Grid>
                        <Grid item lg={6} sm={12} xs={12}>
                            {/* <Watchlist /> */}
                        </Grid>
                        <News query={"Stocks"}/>
                    </Grid>
                </Box>
            </div>
        );
    }

    render() {
        return this.getDashboardComponents();
        // return this.props.loaded ? this.getDashboardComponents() : <h1>Loading</h1>;
    }
}

function mapStateToProps(state) {
    return {
        profile: state.userReducer.profile,
        loaded: state.userReducer.loaded,
    };
}

export default connect(mapStateToProps)(
    withStyles(styles, {withTheme: true})(DashBoard)
);
