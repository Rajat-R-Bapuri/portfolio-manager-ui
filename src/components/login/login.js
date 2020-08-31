import { Button, Grid } from "@material-ui/core";
import { withStyles } from "@material-ui/core/styles";
import Typography from "@material-ui/core/Typography";
import EmailIcon from "@material-ui/icons/Email";
import React from "react";
import { GoogleLogin } from "react-google-login";
import { connect } from "react-redux";
import { Redirect, withRouter } from "react-router-dom";
import handleGoogleLoginResponse from "../../utils/login-handler";
import styles from "./styles";

class Login extends React.Component {
  render() {
    const mClasses = this.props.classes;
    return this.props.loggedIn ? (
      <Redirect to={"/"} />
    ) : (
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
            onSuccess={(resp) =>
              this.props.dispatch(handleGoogleLoginResponse(resp))
            }
            onFailure={(resp) =>
              this.props.dispatch(handleGoogleLoginResponse(resp))
            }
            cookiePolicy={"single_host_origin"}
            className={mClasses.gButton}
          />
        </Grid>
      </Grid>
    );
  }
}

function mapStateToProps(state) {
  return {
    loggedIn: state.loginReducer.loggedIn,
  };
}

export default connect(mapStateToProps)(
  withRouter(withStyles(styles, { withTheme: true })(Login))
);
