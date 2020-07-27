import React, { createRef } from "react";
import Chart from "chart.js";
import StockPrice from "../stock-price/stock-price";
import classes from "./line-graph.module.css";
import stockPriceClasses from "../stock-price/stock-price.module.css";
import Paper from "@material-ui/core/Paper";

class PlotData extends React.Component {
  constructor(props) {
    super(props);
    this.chartRef = createRef();
    this.stockChartRef = null;
    this.lineChart = null;
    this.state = {
      symbol: props.symbol,
      price: null,
      priceClass: classes.same,
    };
    this.sse = new EventSource(
      `${process.env.REACT_APP_BACKEND_API}/stocks/price?symbols=${props.symbol}`
    );
    this.value = null;
  }

  componentDidMount() {
    this.stockChartRef = this.chartRef.current.getContext("2d");
    this.buildChart();
    this.sse.onmessage = (e) => {
      this.setState((prevState, props) => {
        const nextPrice = JSON.parse(e.data)[this.state.symbol].price.toFixed(
          2
        );
        return {
          priceClass: this.getPriceClass(prevState, nextPrice),
          price: nextPrice,
        };
      });
      this.addData(e.data);
    };
  }

  componentWillUnmount() {
    this.sse.close();
  }

  addData = (e) => {
    e = JSON.parse(e);
    console.log(e);
    this.lineChart.data.datasets.forEach((dataset) => {
      let startDate = dataset.data[0].x;
      let respTime = new Date(e[this.state.symbol].timestamp);
      if (respTime - startDate > 0) {
        let roundedTimestamp = new Date(Math.ceil(respTime / 15000) * 15000);
        console.log(startDate, roundedTimestamp);
        let delta = roundedTimestamp - startDate;
        let index = Math.ceil(delta / 15000);
        console.log(delta, index);

        if (index < 1680) {
          dataset.data[index].y = e[this.state.symbol].price;
          this.lineChart.update();
        }
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

    for (let i = 0; i < 1680; i++) {
      chartData.push({
        x: new Date(initDate.getTime() + i * 15000),
        y: null,
      });
    }

    fetch(
      `${process.env.REACT_APP_BACKEND_API}/stocks/${this.state.symbol}/history/1d`
    )
      .then((response) => response.json())
      .then((data) => {
        let sData = data["data"];
        if (sData.length) {
          this.setState({ price: sData[sData.length - 1].price.toFixed(2) });
          sData.forEach((obj, ind) => {
            let respTime = new Date(obj.timestamp);
            let roundedTimestamp = new Date(
              Math.ceil(respTime / 15000) * 15000
            );
            let delta = roundedTimestamp - initDate;
            let index = Math.ceil(delta / 15000);
            if (index < 1680) {
              chartData[index].y = obj.price;
            }
          });
          this.setState({ price: sData[sData.length - 1].price.toFixed(2) });
        }
      })
      .then(() => {
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
                radius: 0,
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
                    min: 22,
                    max: 29,
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
      });
  };

  getPriceClass = (prevState, nextPrice) => {
    if (prevState.price < nextPrice) {
      return stockPriceClasses.up;
    } else if (prevState.price > nextPrice) {
      return stockPriceClasses.down;
    } else {
      return stockPriceClasses.same;
    }
  };

  render() {
    return (
      <Paper className={classes.graphContainer} elevation={20}>
        <div style={{ display: "flex", justifyContent: "center" }}>
          <StockPrice
            symbol={this.state.symbol}
            price={this.state.price}
            priceClass={this.state.priceClass}
          />
        </div>
        <canvas className={classes.chart} id="myChart" ref={this.chartRef} />
      </Paper>
    );
  }
}

export default PlotData;
