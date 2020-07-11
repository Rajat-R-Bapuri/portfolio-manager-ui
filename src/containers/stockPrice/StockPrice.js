import React from "react";
import { withStyles } from "@material-ui/core/styles";
import { Paper } from "@material-ui/core";
import Typography from "@material-ui/core/Typography";

const styles = (theme) => ({
  root: {
    width: "auto",
    padding: 20,
    marginBottom: 20,
    borderRadius: "30px",
  },
  symbol: {
    fontSize: "xx-large",
  },
  price: {
    fontSize: "xx-large",
    display: "inline",
  },
});

class StockPrice extends React.Component {
  render() {
    const mClasses = this.props.classes;
    return (
      <Paper elevation={10} className={mClasses.root}>
        <Typography className={mClasses.symbol}>
          {this.props.symbol} &bull;{" "}
          <span
            key={Math.random()}
            className={`${this.props.priceClass} ${mClasses.price}`}
          >
            {this.props.price}
          </span>
        </Typography>
      </Paper>
    );
  }
}

export default withStyles(styles, { withTheme: true })(StockPrice);
