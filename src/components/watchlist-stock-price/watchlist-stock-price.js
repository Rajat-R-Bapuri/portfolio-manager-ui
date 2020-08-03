import { Box, Paper, Typography, withStyles } from "@material-ui/core";
import React from "react";
import { connect } from "react-redux";
import stockPriceClasses from "../../containers/stock-price/stock-price.module.css";
import styles from "./styles";

class WatchlistStockPrice extends React.Component {
  getPriceClass = (nextPrice) => {
    if (this.prevPrice < nextPrice) {
      return stockPriceClasses.up;
    } else if (this.prevPrice > nextPrice) {
      return stockPriceClasses.down;
    } else {
      return stockPriceClasses.same;
    }
  };

  render() {
    let priceClass = stockPriceClasses.same;
    if (this.props.data !== undefined) {
      const curPrice = this.props.data.price.toFixed(3);
      priceClass = this.getPriceClass(curPrice);
      this.prevPrice = curPrice;
    }
    const mClasses = this.props.classes;
    return (
      <Paper style={{ borderRadius: "10px", minWidth: "80%" }}>
        {this.props.data !== undefined ? (
          <Typography component="div" className={mClasses.root}>
            <Box className={mClasses.symbol}>{this.props.symbol} </Box>
            <Box border={1} borderRadius={5} className={mClasses.priceBox}>
              <span key={Math.random()} className={priceClass}>
                ${this.props.data.price.toFixed(2)}
              </span>
            </Box>
          </Typography>
        ) : null}
      </Paper>
    );
  }
}

function mapStateToProps(state, ownProps) {
  return {
    data: state.stocksSymbolsReducer.prices[ownProps.symbol],
  };
}

export default connect(mapStateToProps)(
  withStyles(styles, { withTheme: true })(WatchlistStockPrice)
);
