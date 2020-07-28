import React from "react";
import { withStyles } from "@material-ui/core/styles";
import ClickAwayListener from "@material-ui/core/ClickAwayListener";
import TextField from "@material-ui/core/TextField";
import { Grid, Typography, Paper, Button, IconButton } from "@material-ui/core";
import AddCircleIcon from "@material-ui/icons/AddCircle";
import DeleteIcon from "@material-ui/icons/Delete";
import Slide from "@material-ui/core/Slide";
import { connect } from "react-redux";
import getSymbols from "../../utils/stocks-handler";

const styles = (theme) => ({
  root: {
    width: "100%",
  },
});

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
      this.setState({ query: event.target.value, dropDownState: true });
      this.props.dispatch(getSymbols(event.target.value));
    } else {
      this.setState({ dropDownState: false });
    }
  };

  handleClickAway = () => {
    this.setState({ dropDownState: false });
  };

  handleAdd = (id, event) => {
    // console.log(id, event.currentTarget, event.target.nodeName);
    const addSet = new Set(["BUTTON", "svg", "path"]);
    if (addSet.has(event.target.nodeName)) {
      console.log("add button");
    } else {
      console.log("open stock page");
      window.location.assign(`/${id}`);
    }
  };

  renderDropdown = () => {
    if (this.props.dropdownData) {
      return (
        <Slide direction="up" in={true} mountOnEnter unmountOnExit>
          <Grid container spacing={1}>
            {this.props.dropdownData.map((item) => {
              return (
                <Grid key={item.symbol} item xs={12}>
                  <Paper
                    id={item.symbol}
                    elevation={1}
                    style={{ padding: "20px", cursor: "pointer" }}
                    onClick={(event) => this.handleAdd(item.symbol, event)}
                  >
                    <Typography>{item.symbol}</Typography>
                    <Typography color="textSecondary">{item.name}</Typography>
                    <IconButton>
                      {/* TODO: check profile */}
                      {item.symbol.length > 4 ? (
                        <AddCircleIcon style={{ color: "green" }} />
                      ) : (
                        <DeleteIcon color="secondary" />
                      )}
                    </IconButton>
                  </Paper>
                </Grid>
              );
            })}
          </Grid>
        </Slide>
      );
    }
  };
  render() {
    const mClasses = this.props.classes;
    return (
      <ClickAwayListener onClickAway={this.handleClickAway}>
        <div>
          <TextField
            id="outlined-basic"
            label="Search"
            variant="outlined"
            onChange={this.handleClick}
            onFocus={this.handleClick}
          />
          {this.state.dropDownState ? this.renderDropdown() : null}
        </div>
      </ClickAwayListener>
    );
  }
}

function mapStateToProps(state) {
  return {
    dropdownData: state.stocksSymbolsReducer.symbols,
  };
}

export default connect(mapStateToProps)(
  withStyles(styles, { withTheme: true })(SearchBar)
);
