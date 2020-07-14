import React from "react";
import ReactDOM from "react-dom";
import PlotData from "./containers/chart/PlotData";
import Profile from "./components/companyProfile/Profile";
import PortfolioHome from "./components/portfolio/portfolioHome";
import Login from "./components/login/login";
import NavBar from "./components/NavBar/NavBar";
import News from "./containers/news/News";
import Container from "@material-ui/core/Container";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";

const symbol = "Stocks";

ReactDOM.render(
  <React.StrictMode>
    <Router>
      <Container maxWidth="md">
        <NavBar />
        <Switch>
          <Route path="/news" render={() => <News query={symbol} />} />
          <Route path="/login" component={Login} />
        </Switch>
        {/* <NavBar /> */}
        {/* <Login /> */}
        {/* <PortfolioHome /> */}
        {/* <PlotData symbol={symbol} />
      <Profile symbol={symbol} />
      <News query={symbol} /> */}
      </Container>
    </Router>
  </React.StrictMode>,
  document.getElementById("root")
);
