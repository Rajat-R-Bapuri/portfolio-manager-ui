import React from "react";
import { withStyles } from "@material-ui/core/styles";
import ClickAwayListener from "@material-ui/core/ClickAwayListener";
import TextField from "@material-ui/core/TextField";
import { Grid, Typography, Paper, Button, IconButton } from "@material-ui/core";
import queryString from "query-string";
import AddCircleIcon from "@material-ui/icons/AddCircle";
import DeleteIcon from "@material-ui/icons/Delete";
import Slide from "@material-ui/core/Slide";

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
      dropdownData: [],
    };
  }

  handleClick = (event) => {
    if (event.target.value.length > 0) {
      this.setState({ query: event.target.value, dropDownState: true });
      this.fetchDropdown(event.target.value);
    } else {
      this.setState({ dropDownState: false });
    }
  };

  handleClickAway = () => {
    this.setState({ dropDownState: false });
  };

  jwt = "";

  fetchDropdown = (query) => {
    const url = queryString.stringifyUrl({
      url: process.env.REACT_APP_BACKEND_API + "/stocks/symbols",
      query: {
        query: query.toUpperCase(),
      },
    });
    const headers = new Headers();
    headers.append("Authorization", `Bearer ${this.jwt}`);
    fetch(url, {
      headers: headers,
    })
      .then((response) => response.json())
      .then((data) => {
        this.setState({ dropdownData: data });
      });
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
    console.log(this.state.dropdownData);
    if (this.state.dropdownData) {
      return (
        <Slide direction="up" in={true} mountOnEnter unmountOnExit>
          <Grid container spacing={1}>
            {this.state.dropdownData.map((item) => {
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
export default withStyles(styles, { withTheme: true })(SearchBar);
