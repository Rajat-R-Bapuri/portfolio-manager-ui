import React from "react";
import ReactDOM from "react-dom";
import PlotData from "./containers/chart/plot-data";
import ComapanyProfile from "./components/company-profile/company-profile";
import UserProfile from "./containers/user-profile/user-profile";
import Login from "./components/login/login";
import SearchBar from "./containers/search-bar/search-bar";
import News from "./containers/news/news";
import Container from "@material-ui/core/Container";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import { Provider } from "react-redux";
import store from "./store";

const symbol = "Stocks";

ReactDOM.render(
  <Provider store={store}>
    <Router>
      <Container maxWidth="md">
        <Switch>
          {/* <Route exact path="/" component={SearchBar} /> */}
          <Route path="/login" component={Login} />
          <Route path="/news" render={() => <News query={symbol} />} />
          <Route path="/TSLA" render={() => <PlotData symbol={"TSLA"} />} />
          <Route path="/" component={UserProfile} />
          {/* <PortfolioHome /> */}
        </Switch>

        {/* <PlotData symbol={symbol} />
      <Profile symbol={symbol} />
      <News query={symbol} /> */}
      </Container>
    </Router>
  </Provider>,
  document.getElementById("root")
);
