import { Paper, withStyles } from "@material-ui/core";
import Chart from "chart.js";
import React, { Component, createRef } from "react";
import { connect } from "react-redux";
import { fetchChart } from "../../utils/stocks-handler";
import styles from "./styles";

class StockChart extends Component {
  constructor(props) {
    super(props);
    this.chartRef = createRef();
    this.stockChartRef = null;
    this.min = Number.MAX_SAFE_INTEGER;
    this.max = -Number.MAX_SAFE_INTEGER;

    this.sse = new EventSource(
      `${process.env.REACT_APP_BACKEND_API}/stocks/price?symbols=${this.props.symbol}`
    );
  }

  componentDidMount() {
    this.props.dispatch(fetchChart(this.props.symbol));
    this.stockChartRef = this.chartRef.current.getContext("2d");
  }

  componentDidUpdate(prevProps, prevState, snapshot) {
    this.buildChart();
    this.sse.onmessage = (e) => {
      const data = JSON.parse(e.data);
      const symbol = this.props.symbol;
      this.addData(JSON.parse(data[symbol]));
    };
  }

  getIndex = (start, curr) => {
    if (curr > start) {
      let roundedTimestamp = new Date(Math.ceil(curr / 900000) * 900000);
      let delta = roundedTimestamp - start;
      let index = Math.ceil(delta / 900000);
      return index;
    }
    return 0;
  };

  addData = (e) => {
    this.lineChart.data.datasets.forEach((dataset) => {
      let startDate = dataset.data[0].x;
      let respTime = new Date(e[1]);

      let index = this.getIndex(startDate, respTime);

      if (index < 27) {
        dataset.data[index].y = e[0];
        this.lineChart.update();
      }
    });
  };

  buildChart = () => {
    let chartData = [];
    let initDate = new Date();
    // 09:30:00
    initDate.setHours(9);
    initDate.setMinutes(30);
    initDate.setSeconds(0);

    for (let i = 0; i < 27; i++) {
      chartData.push({
        x: new Date(initDate.getTime() + i * 900000),
        y: null,
      });
    }

    if (this.props.data !== undefined) {
      let sData = this.props.data.data;

      if (sData.length) {
        sData.forEach((obj, ind) => {
          let respTime = new Date(obj.timestamp);
          let index = this.getIndex(initDate, respTime);

          if (index < 27) {
            chartData[index].y = obj.price;
          }
          this.min = Math.min(this.min, obj.price);
          this.max = Math.max(this.max, obj.price);
        });
      }

      this.lineChart = new Chart(this.stockChartRef, {
        type: "line",
        data: {
          //Bring in data
          datasets: [
            {
              data: chartData,
              borderColor: "#3e95cd",
              fill: false,
              borderWidth: 1.5,
            },
          ],
        },
        options: {
          elements: {
            point: {
              radius: 1,
            },
          },
          legend: {
            display: false,
          },
          scales: {
            yAxes: [
              {
                type: "linear",
                ticks: {
                  min: Math.round(this.min - 1),
                  max: Math.round(this.max + 1),
                },
              },
            ],
            xAxes: [
              {
                type: "time",
                distribution: "series",
                display: false,
                time: {
                  unit: "minute",
                },
              },
            ],
          },
        },
      });
    }
  };

  render() {
    return (
      <Paper className={this.props.classes.graphContainer} elevation={20}>
        <canvas
          className={this.props.classes.chart}
          id="chart"
          ref={this.chartRef}
        />
      </Paper>
    );
  }
}

function mapStateToProps(state, ownProps) {
  return {
    data: state.stocksReducer[ownProps.symbol],
  };
}

export default connect(mapStateToProps)(
  withStyles(styles, { withTheme: true })(StockChart)
);
