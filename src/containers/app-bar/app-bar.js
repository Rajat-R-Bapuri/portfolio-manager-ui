import {
  Box,
  Button,
  Menu,
  MenuItem,
  Typography,
  withStyles,
} from "@material-ui/core";
import React, { Component } from "react";
import { connect } from "react-redux";
import styles from "./styles";

class AppBar extends Component {
  constructor(props) {
    super(props);

    this.state = {
      menuEnabled: false,
      anchorEl: null,
    };
  }

  getGreeting = () => {
    var today = new Date();
    var curHr = today.getHours();

    if (curHr < 12) {
      return "Good Morning!";
    } else if (curHr < 18) {
      return "Good Afternoon!";
    } else {
      return "Good evening!";
    }
  };

  handleOptionsOpen = (event) => {
    this.setState({
      menuEnabled: !this.state.menuEnabled,
      anchorEl: event.currentTarget,
    });
  };

  render() {
    const mClasses = this.props.classes;
    return (
      <Box borderRadius={25} boxShadow={10} className={mClasses.root}>
        <Typography className={mClasses.text}>
          Hey<span>{"\u{1F44B}"}</span>,{` ${this.props.userName}`}.{" "}
          {this.getGreeting()}
        </Typography>

        <Button
          aria-controls="simple-menu"
          aria-haspopup="true"
          onClick={this.handleOptionsOpen}
        >
          Options
        </Button>
        <Menu
          id="simple-menu"
          anchorEl={this.state.anchorEl}
          keepMounted
          open={Boolean(this.state.menuEnabled)}
          onClose={this.handleOptionsOpen}
        >
          <MenuItem>Profile</MenuItem>
          <MenuItem>Logout</MenuItem>
        </Menu>
      </Box>
    );
  }
}

function mapStateToProps(state) {
  return {
    userName: state.userReducer.profile.userFullName,
  };
}

export default connect(mapStateToProps)(
  withStyles(styles, { withTheme: true })(AppBar)
);
