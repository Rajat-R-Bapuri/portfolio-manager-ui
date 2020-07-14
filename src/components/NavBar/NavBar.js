import React from "react";
import AppBar from "@material-ui/core/AppBar";
import Tabs from "@material-ui/core/Tabs";
import Tab from "@material-ui/core/Tab";
import Paper from "@material-ui/core/Paper";
import { withStyles } from "@material-ui/core/styles";
import { Link, withRouter } from "react-router-dom";

const styles = (theme) => ({
  appBar: {
    backgroundColor: "white",
    borderRadius: "20px 20px 0px 0px",
  },
  tabs: {
    justifyContent: "space-between",
    alignItems: "center",
    display: "flex",
    color: "black",
  },
});

class NavBar extends React.Component {
  state = {
    activeTab: window.location.pathname,
  };

  handleChange = (event, value) => {
    console.log(this.props.history);
    this.setState({ activeTab: value });
  };

  render() {
    const mClasses = this.props.classes;
    return (
      <AppBar elevation={20} position="static" className={mClasses.appBar}>
        <Tabs
          value={this.state.activeTab}
          variant="fullWidth"
          onChange={this.handleChange}
          className={mClasses.tabs}
        >
          <Tab value={"/home"} label="Home" component={Link} to={"/"} />
          <Tab value={"/news"} label="News" component={Link} to={"/news"} />
          <Tab value={"/login"} label="Login" component={Link} to={"/login"} />
        </Tabs>
      </AppBar>
    );
  }
}

export default withStyles(styles, { withTheme: true })(NavBar);
