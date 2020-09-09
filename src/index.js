import Container from "@material-ui/core/Container";
import React from "react";
import ReactDOM from "react-dom";
import { Provider } from "react-redux";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import Login from "./components/login/login";
// import PlotData from "./containers/chart/plot-data";
import Dashboard from "./containers/dashboard/dashboard";
import News from "./containers/news/news";
import SearchBar from "./containers/search-bar/search-bar";
import StockChart from "./containers/stock-chart/stock-chart";
import UserProfile from "./containers/user-profile/user-profile";
import store from "./store";

const symbol = "Stocks";

ReactDOM.render(
  <Provider store={store}>
    <Router>
      <Container maxWidth="lg">
        <Switch>
          <Route exact path="/search" component={SearchBar} />
          <Route path="/login" component={Login} />
          <Route path="/news" render={() => <News query={symbol} />} />
          {/* <Route path="/TSLA" render={() => <PlotData symbol={"TSLA"}/>}/> */}
          <Route path="/profile" component={UserProfile} />
          <Route path="/dashboard" component={Dashboard} />
          <Route path="/1" render={() => <StockChart symbol={"AAPL"} />} />
          <Route path="/2" render={() => <StockChart symbol={"TSLA"} />} />
        </Switch>
        {/* <PlotData symbol={symbol} />

      <Profile symbol={symbol} />
      <News query={symbol} /> */}
      </Container>
    </Router>
  </Provider>,
  document.getElementById("root")
);
