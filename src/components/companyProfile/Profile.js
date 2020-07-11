import React from "react";
import { withStyles } from "@material-ui/core/styles";
import { Link, Paper, Grid, Button } from "@material-ui/core";

const styles = (theme) => ({
  heading: {
    width: "100%",
    display: "flex",
    "justify-content": "space-between",
    "border-color": "black",
    "border-bottom-style": "solid",
    "border-bottom-width": "1px",
  },
  companyName: {
    "font-size": "xx-large",
    "font-weight": "bold",
  },
  cardsCommon: {
    alignItems: "center",
    justify: "center",
    padding: "20px",
  },
  description: {
    fontSize: "large",
  },
  cardsHeading: {
    fontWeight: "600",
  },
  fixedCardHeight: {
    height: theme.spacing(8),
  },
  webLink: {
    "font-size": "large",
  },
  tagButtons: {
    display: "flex",
    justifyContent: "center",
  },
});

class Profile extends React.Component {
  constructor(props) {
    super(props);
    this.state = { data: null };
  }

  componentDidMount() {
    fetch(
      process.env.REACT_APP_BACKEND_API + `/stocks/${this.props.symbol}/company`
    )
      .then((response) => response.json())
      .then((data) => {
        // console.log(data);
        this.setState({ data: data });
      });
  }

  render() {
    if (!this.state.data) {
      return <h3>Loading...</h3>;
    } else {
      const address2 = this.state.data["address2"];
      const mClasses = this.props.classes;

      return (
        <div>
          <Grid container spacing={3}>
            <Grid item className={mClasses.heading}>
              <div className={mClasses.companyName}>
                {this.state.data["companyName"] + " "}
              </div>
              <Link
                className={`${mClasses.webLink}`}
                href={this.state.data["website"]}
                target="_external"
              >
                Website
              </Link>
            </Grid>

            <Grid item>
              <Paper
                elevation={3}
                className={`${mClasses.cardsCommon} ${mClasses.description}`}
              >
                {this.state.data["description"]}
              </Paper>
            </Grid>

            <Grid item xs={4}>
              <Paper
                elevation={3}
                className={`${mClasses.cardsCommon} ${mClasses.fixedCardHeight}`}
              >
                <div className={mClasses.cardsHeading}>CEO</div>
                <div>{this.state.data["ceo"]} CEO</div>
              </Paper>
            </Grid>

            <Grid item xs={4}>
              <Paper
                elevation={3}
                className={`${mClasses.cardsCommon} ${mClasses.fixedCardHeight}`}
              >
                <div className={mClasses.cardsHeading}>Employees</div>
                <div>{this.state.data["employees"]}</div>
              </Paper>
            </Grid>

            <Grid item xs={4}>
              <Paper
                elevation={3}
                className={`${mClasses.cardsCommon} ${mClasses.fixedCardHeight}`}
              >
                <div className={mClasses.cardsHeading}>Industry</div>
                <div>{this.state.data["industry"]}</div>
              </Paper>
            </Grid>

            <Grid item xs={4}>
              <Paper
                elevation={3}
                className={`${mClasses.cardsCommon} ${mClasses.fixedCardHeight}`}
              >
                <div className={mClasses.cardsHeading}>Sector</div>
                <div>{this.state.data["sector"]}</div>
              </Paper>
            </Grid>

            <Grid item xs={4}>
              <Paper
                elevation={3}
                className={`${mClasses.cardsCommon} ${mClasses.fixedCardHeight}`}
              >
                <div className={mClasses.cardsHeading}>Address</div>
                <div>
                  {this.state.data["address"]},{address2 && address2 + ","}
                  {` ` + this.state.data["city"]},
                  {` ` + this.state.data["state"]},
                  {` ` + this.state.data["zip"]},
                  {` ` + this.state.data["country"]}
                </div>
              </Paper>
            </Grid>

            <Grid item xs={4}>
              <Paper
                elevation={3}
                className={`${mClasses.cardsCommon} ${mClasses.fixedCardHeight}`}
              >
                <div className={mClasses.cardsHeading}>Contact</div>
                <div>{this.state.data["phone"]}</div>
              </Paper>
            </Grid>
          </Grid>

          <div className={mClasses.tagButtons}>
            {this.state.data["tags"].map((value, index) => {
              return (
                <Button
                  style={{ margin: "10px" }}
                  key={value}
                  variant="contained"
                  color="primary"
                >
                  {value}
                </Button>
              );
            })}
          </div>
        </div>
      );
    }
  }
}

export default withStyles(styles, { withTheme: true })(Profile);

/**

exchange: "QNAADS"
industry: "amcnnmotct iulnieesTeoqupiEm"
issueType: "sc"
phone: ".9181..6914000"
primarySicCode: 3833
sector: "clngTcetiloonco rhyeE"
securityName: "Aclp epn.I"
 */
