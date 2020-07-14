import React from "react";
import { withStyles } from "@material-ui/core/styles";
import { Paper, Link } from "@material-ui/core";
import Typography from "@material-ui/core/Typography";
import moment from "moment";

const styles = (theme) => ({
  root: {
    padding: 20,
    marginBottom: 5,
    height: theme.spacing(15),
    borderRadius: "20px",
  },
  title: {
    fontSize: 18,
  },
  pos: {
    marginBottom: 12,
  },
});

class NewsCard extends React.Component {
  render() {
    const mClasses = this.props.classes;

    return (
      <Paper elevation={15} className={mClasses.root}>
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
