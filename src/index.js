import React from 'react';
import ReactDOM from 'react-dom';
import PlotData from './containers/chart/PlotData';
import Profile from './components/companyProfile/Profile';
import classes from './index.module.css';
import Container from "@material-ui/core/Container";

ReactDOM.render(
  <React.StrictMode>
    <Container maxWidth="md">
      <PlotData symbol="AAPL" />
      <Profile symbol="AAPL" />
    </Container>
  </React.StrictMode>,
  document.getElementById('root')
);
