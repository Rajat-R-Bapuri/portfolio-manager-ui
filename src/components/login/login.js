import React from "react";
import { Grid, Button } from "@material-ui/core";
import EmailIcon from "@material-ui/icons/Email";
import { withStyles } from "@material-ui/core/styles";
import Typography from "@material-ui/core/Typography";
import { GoogleLogin } from "react-google-login";
import styles from "./styles";

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
            clientId={process.env.REACT_APP_GOOGLE_CLIENT_ID}
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
