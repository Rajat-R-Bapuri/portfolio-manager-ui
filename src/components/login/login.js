import React from "react";
import { Grid, Button } from "@material-ui/core";
import EmailIcon from "@material-ui/icons/Email";
import { withStyles } from "@material-ui/core/styles";
import Typography from "@material-ui/core/Typography";
import { GoogleLogin } from "react-google-login";

const styles = (theme) => ({
  root: {
    minHeight: "90vh",
  },
  emailSignInButton: {
    fontSize: "18px",
    margin: "10px",
    width: "300px",
    color: "black",
    backgroundColor: "white",
  },
  googleSignInGridItem: {
    margin: "10px",
    width: "500px",
    display: "flex",
    justifyContent: "center",
  },
  title: {
    fontFamily: "monospace",
    margin: theme.spacing(3),
    fontSize: theme.spacing(4.5),
  },
  signUpText: { justifyContent: "center", display: "flex" },
  gButton: {
    width: "300px !important",
    display: "flex !important",
    justifyContent: "center !important",
  },
});

class Login extends React.Component {
  responseGoogle = (response) => {
    console.log(response);
  };

  render() {
    const mClasses = this.props.classes;
    return (
      <Grid
        container
        spacing={0}
        direction="column"
        alignItems="center"
        justify="center"
        className={mClasses.root}
      >
        <Grid item xs={12}>
          <Typography className={mClasses.title}>
            Welcome to Protfolio Manager
            <br />
            <span className={mClasses.signUpText}>Sign Up</span>
          </Typography>
        </Grid>
        <Grid item xs={12}>
          <Button
            variant="contained"
            className={mClasses.emailSignInButton}
            startIcon={<EmailIcon />}
          >
            Sign up with Email
          </Button>
        </Grid>
        <Grid item xs={12} className={mClasses.googleSignInGridItem}>
          <GoogleLogin
            clientId="220834486328-i2pa7u34h83nnoosurup6bq2do2v7dps.apps.googleusercontent.com"
            buttonText="Google Sign In"
            onSuccess={this.responseGoogle}
            onFailure={this.responseGoogle}
            cookiePolicy={"single_host_origin"}
            className={mClasses.gButton}
          />
        </Grid>
      </Grid>
    );
  }
}

export default withStyles(styles, { withTheme: true })(Login);
