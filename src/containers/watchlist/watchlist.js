import { Grid, Paper, Typography, withStyles } from "@material-ui/core";
import React, { Component } from "react";
import { connect } from "react-redux";
import { withRouter } from "react-router-dom";
import { stocksPricesReceived } from "../../actions/stocks-actions";
import WatchlistStockPrice from "../../components/watchlist-stock-price/watchlist-stock-price";
import { getCurrentPrices } from "../../utils/stocks-handler";
import styles from "./styles";

class Watchlist extends Component {
  constructor(props) {
    super(props);
    this.sse = null;
    if (this.props.watchlist.length) {
      this.sseInit(this.props.watchlist);
    }
  }

  sseInit(symbols) {
    this.sse = new EventSource(
      `${process.env.REACT_APP_BACKEND_API}/stocks/price?symbols=${symbols}`
    );
    this.sseMessageHandler();
  }

  sseMessageHandler() {
    if (this.props.watchlist.length)
      this.props.dispatch(getCurrentPrices(this.props.watchlist.join(",")));
    this.sse.onmessage = (e) => {
      // dispatch redux action
      this.props.dispatch(stocksPricesReceived(JSON.parse(e.data)));
    };
  }

  componentDidUpdate(prevProps) {
    if (!this.props.watchlist.length) {
      this.sse.close();
      this.sse = null;
    } else if (
      JSON.stringify(prevProps.watchlist) !==
      JSON.stringify(this.props.watchlist)
    ) {
      if (this.sse != null) {
        this.sse.close();
      }
      this.sseInit(this.props.watchlist);
    }
  }

  createList() {
    const list = [];
    if (this.props.watchlist.length) {
      this.props.watchlist.map((symbol, index) =>
        list.push(
          <Grid
            key={index}
            item
            xs={12}
            lg={12}
            sm={12}
            className={this.props.classes.gridItem}
          >
            <WatchlistStockPrice key={symbol} symbol={symbol} />
          </Grid>
        )
      );
    } else {
      list.push(
        <Grid
          key={0}
          item
          xs={12}
          lg={12}
          sm={12}
          className={this.props.classes.messageGrid}
        >
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
      <Grid container spacing={2} className={mClasses.container}>
        <Paper elevation={5} className={mClasses.paper}>
          <Grid
            key={0}
            item
            xs={12}
            lg={12}
            className={this.props.classes.messageGrid}
          >
            <Typography variant={"h5"}>Your Watchlist</Typography>
          </Grid>
          {this.createList()}
        </Paper>
      </Grid>
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
