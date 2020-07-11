import React from "react";
import ReactDOM from "react-dom";
import PlotData from "./containers/chart/PlotData";
import Profile from "./components/companyProfile/Profile";
import News from "./containers/news/News";
import Container from "@material-ui/core/Container";

const symbol = "TSLA";

ReactDOM.render(
  <React.StrictMode>
    <Container maxWidth="md">
      <PlotData symbol={symbol} />
      <Profile symbol={symbol} />
      <News query={symbol} />
    </Container>
  </React.StrictMode>,
  document.getElementById("root")
);
