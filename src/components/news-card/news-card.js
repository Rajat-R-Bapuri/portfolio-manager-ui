import { Link, Paper } from "@material-ui/core";
import { withStyles } from "@material-ui/core/styles";
import Typography from "@material-ui/core/Typography";
import moment from "moment";
import React from "react";
import styles from "./styles";

class NewsCard extends React.Component {
  render() {
    const mClasses = this.props.classes;

    return (
      <Paper elevation={5} className={mClasses.root}>
        <Typography className={mClasses.title} gutterBottom>
          <Link href={this.props.link} target="_external" color="inherit">
            {this.props.title}
          </Link>
        </Typography>

        <Typography color="textSecondary">
          {this.props.source} &bull;{" "}
          {moment(new Date()).to(new Date(this.props.date))}
        </Typography>
      </Paper>
    );
  }
}

export default withStyles(styles, { withTheme: true })(NewsCard);
