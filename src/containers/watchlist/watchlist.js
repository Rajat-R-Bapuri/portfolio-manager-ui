import React, { Component } from "react";
import { connect } from "react-redux";
import { withRouter } from "react-router-dom";
import DashoardStockPrice from "../../components/dashboard-stock-price/dashboard-stock-price";
import { Paper, Grid, Typography, withStyles } from "@material-ui/core";
import { stocksPricesReceived } from "../../actions/stocks-actions";
import { getCurrentPrices } from "../../utils/stocks-handler";
import styles from "./styles";

class Watchlist extends Component {
  constructor(props) {
    super(props);
    if (this.props.watchlist.length)
      this.sse = new EventSource(
        `${process.env.REACT_APP_BACKEND_API}/stocks/price?symbols=${this.props.watchlist}`
      );
  }

  componentDidMount() {
    if (this.props.watchlist.length) {
      this.props.dispatch(getCurrentPrices(this.props.watchlist.join(",")));
      this.sse.onmessage = (e) => {
        // dispatch redux action
        this.props.dispatch(stocksPricesReceived(JSON.parse(e.data)));
      };
    }
  }

  createList() {
    const list = [];
    if (this.props.watchlist.length) {
      this.props.watchlist.map((symbol, index) =>
        list.push(
          <Grid key={index} item xs={12}>
            <DashoardStockPrice key={symbol} symbol={symbol} />
          </Grid>
        )
      );
    } else {
      list.push(
        <Grid key={0} item xs={12} className={this.props.classes.messageGrid}>
          <Typography className={this.props.classes.message}>
            It seems like your watchlist is empty. Search for Stock Tickers and
            add them to your watchlist
          </Typography>
        </Grid>
      );
    }
    return list;
  }

  render() {
    const mClasses = this.props.classes;
    return (
      <Paper elevation={10} className={mClasses.root}>
        <Grid container spacing={2} className={mClasses.container}>
          <Typography variant={"h4"}>Your Watchlist</Typography>
          {this.createList()}
        </Grid>
      </Paper>
    );
  }
}

function mapStateToProps(state) {
  return {
    watchlist: state.userReducer.profile.watchlist,
  };
}

export default connect(mapStateToProps)(
  withStyles(styles, { withTheme: true })(withRouter(Watchlist))
);
