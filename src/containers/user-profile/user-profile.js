import React from "react";
import { withStyles } from "@material-ui/core/styles";
import {
  Paper,
  Grid,
  CircularProgress,
  Avatar,
  Typography,
  Button,
} from "@material-ui/core";
import fetchUserProfile from "../../utils/fetch-user-data";
import { connect } from "react-redux";
import Zoom from "@material-ui/core/Zoom";

const styles = (theme) => ({
  root: {
    marginTop: "50px",
  },
  imageGridItem: {
    display: "flex",
    margin: "auto",
    justifyContent: "center",
  },
  image: {
    width: "50%",
    height: "50%",
  },
  gridItems: {
    padding: "15px",
    margin: "5px",
  },
  title: {
    fontSize: "25px",
  },
  content: {
    marginTop: "10px",
    fontSize: "18px",
  },
  updateButtonGrid: {
    display: "flex",
    margin: "auto",
    justifyContent: "center",
  },
});

class UserProfile extends React.Component {
  componentDidMount() {
    this.props.dispatch(fetchUserProfile());
  }

  renderProfile() {
    const mClasses = this.props.classes;
    console.log(this.props.profile);
    return (
      <Zoom in={true} timeout={1000}>
        <Grid container spacing={2} className={mClasses.root}>
          <Grid item xs={5} className={mClasses.imageGridItem}>
            <Avatar
              src={this.props.profile.imageUrl}
              className={mClasses.image}
            />
          </Grid>

          <Grid item xs={6} sm container>
            <Grid item xs container direction="column" spacing={2}>
              <Paper className={mClasses.gridItems} elevation={10}>
                <Typography className={mClasses.title}>Email</Typography>
                <Typography className={mClasses.content}>
                  {this.props.profile.userEmail}
                </Typography>
              </Paper>
              <Paper className={mClasses.gridItems} elevation={10}>
                <Typography className={mClasses.title}>Full Name</Typography>
                <Typography className={mClasses.content}>
                  {this.props.profile.userFullName}
                </Typography>
              </Paper>
            </Grid>
          </Grid>

          <Grid item xs={12} container className={mClasses.updateButtonGrid}>
            <Button
              variant="contained"
              color="primary"
              style={{ width: "300px", marginTop: "30px" }}
            >
              Update Profile
            </Button>
          </Grid>
        </Grid>
      </Zoom>
    );
  }

  render() {
    const tableHeader = ["Symbol", "Price", "Change", "% Change"];
    return this.props.loaded ? (
      this.renderProfile()
    ) : (
      <CircularProgress color="secondary" />
    );
  }
}

function mapStateToProps(state) {
  return {
    profile: state.userReducer.profile,
    loaded: state.userReducer.loaded,
  };
}

export default connect(mapStateToProps)(
  withStyles(styles, { withTheme: true })(UserProfile)
);

{
  /* <TableContainer className={classes.container}>
<Table stickyHeader aria-label="sticky table">
  <TableHead>
    <TableRow>
      {tableHeader.map((header) => {
        return <TableCell key={Math.random()}>{header}</TableCell>;
      })}
    </TableRow>
  </TableHead>
  <TableBody>
    <TableRow hover role="checkbox" tabIndex={-1} key={Math.random()}>
      <TableCell key={Math.random()}>Test</TableCell>
      <TableCell key={Math.random()}>Test</TableCell>
      <TableCell key={Math.random()}>Test</TableCell>
      <TableCell key={Math.random()}>Test</TableCell>
    </TableRow>
  </TableBody>
</Table>
</TableContainer> */
}
