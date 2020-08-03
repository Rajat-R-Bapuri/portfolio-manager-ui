import {
  ClickAwayListener,
  Grid,
  Slide,
  TextField,
  Typography,
} from "@material-ui/core";
import { withStyles } from "@material-ui/core/styles";
import React from "react";
import { connect } from "react-redux";
import StockListItem from "../../components/search-bar-stock-list-item/search-bar-stock-list-item";
import { getSymbols } from "../../utils/stocks-handler";
import {
  addToWatchlist,
  removeFromWatchlist,
} from "../../utils/update-watchlist";
import styles from "./styles";

class SearchBar extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      dropDownState: false,
      query: null,
    };
  }

  handleClick = (event) => {
    if (event.target.value.length > 0) {
      if (event.type === "change") {
        this.setState({ query: event.target.value, dropDownState: true });
        this.props.dispatch(getSymbols(event.target.value));
      } else {
        this.setState({ dropDownState: true });
      }
    } else {
      this.setState({ dropDownState: false });
    }
  };

  handleClickAway = () => {
    this.setState({ dropDownState: false });
  };

  handleAdd = (id, event) => {
    const addSet = new Set(["BUTTON", "svg", "path"]);
    if (addSet.has(event.target.nodeName)) {
      if (this.props.watchlist.has(id)) {
        // remove from watchlist
        this.props.dispatch(removeFromWatchlist(id));
      } else {
        // add to watchlist
        this.props.dispatch(addToWatchlist(id));
      }
    } else {
      console.log("open stock page");
      // window.location.assign(`/${id}`);
    }
  };

  renderList = (list, heading = null) => {
    const header = (
      <div
        key={"popularStockSymbols"}
        className={this.props.classes.stockListItem}
      >
        <Typography className={this.props.classes.popularStocksText}>
          {heading ? heading : "\u00A0"}
        </Typography>
      </div>
    );

    return [
      header,
      list.map((item, index) => {
        return (
          <Slide
            key={index}
            direction="up"
            in={true}
            mountOnEnter
            unmountOnExit
          >
            <Grid
              item
              xs={12}
              className={this.props.classes.stockListItem}
              key={item.symbol}
            >
              <StockListItem
                symbol={item.symbol}
                name={item.name}
                handleAdd={this.handleAdd}
                status={this.props.watchlist.has(item.symbol)}
              />
            </Grid>
          </Slide>
        );
      }),
    ];
  };

  renderPopularStocks = () => {
    if (this.props.popularStocks) {
      return this.renderList(this.props.popularStocks, "Popular Stock Symbols");
    }
  };

  renderStocksList = () => {
    if (this.props.dropdownData.length) {
      return this.renderList(this.props.dropdownData);
    }
  };

  render() {
    return (
      <ClickAwayListener onClickAway={this.handleClickAway}>
        <Grid container spacing={1}>
          <Grid item xs={12} key={"TextfieldGrid"}>
            <TextField
              label="Search for Stocks"
              variant="outlined"
              onChange={this.handleClick}
              onFocus={this.handleClick}
              className={this.props.classes.textField}
            />
          </Grid>
          {this.state.dropDownState
            ? this.renderStocksList()
            : this.renderPopularStocks()}
        </Grid>
      </ClickAwayListener>
    );
  }
}

function mapStateToProps(state) {
  return {
    dropdownData: state.stocksSymbolsReducer.symbols,
    watchlist: new Set(state.userReducer.profile.watchlist),
    popularStocks: state.stocksSymbolsReducer.popularStocks,
  };
}

export default connect(mapStateToProps)(
  withStyles(styles, { withTheme: true })(SearchBar)
);
