import React, { createRef } from 'react';
import Chart from "chart.js";
import StockPrice from "../stockPrice/StockPrice";
import classes from "./LineGraph.module.css";

class PlotData extends React.Component {

    constructor(props) {
        super(props);
        this.chartRef = createRef();
        this.myChartRef = null;
        this.myLineChart = null;
        this.sse = new EventSource("http://localhost:8080/stocks/price?symbols=AAPL");
        this.state = { price: null }
        this.value = null;
    }

    componentDidMount() {
        this.myChartRef = this.chartRef.current.getContext("2d");
        this.buildChart();
        this.sse.onmessage = (e) => {
            console.log(e.data);
            // console.log(e.data["AAPL"].price);
            this.setState({ price: JSON.parse(e.data)["AAPL"].price.toFixed(2) })
            this.addData(e.data);
        }
    }

    componentWillUnmount() {
        this.sse.close();
    }

    addData = (e) => {
        e = JSON.parse(e);
        console.log(e);

        // this.myLineChart.data.labels.push(new Date());
        this.myLineChart.data.datasets.forEach((dataset) => {

            let startDate = dataset.data[0].x;
            let respTime = new Date(e["AAPL"].timestamp).getTime();
            let roundedTimestamp = new Date(Math.ceil(respTime / 15000) * 15000);
            console.log(startDate, roundedTimestamp);
            let delta = roundedTimestamp - startDate;
            let index = delta / 15000;
            console.log(delta, index);
            // dataset.data.push({
            //     x: new Date(e["AAPL"].timestamp),
            //     y:
            // });
            if (index < 1680) {
                dataset.data[index].y = e["AAPL"].price;
                this.myLineChart.update();
            }
        });
    }

    buildChart = () => {

        let chartData = [];
        let initDate = new Date("2020-07-08 09:30:00");
        for (let i = 0; i < 1680; i++) {
            chartData.push({
                x: new Date(initDate.getTime() + i * 15000),
                y: null,
            });
        }

        fetch('http://localhost:8080/stocks/history')
            .then(response => response.json())
            .then((data) => {
                let sData = data["data"];
                let startDate = new Date("2020-07-08 09:30:00");
                sData.map((obj) => {
                    let respTime = new Date(obj.timestamp).getTime();
                    let roundedTimestamp = new Date(Math.ceil(respTime / 15000) * 15000);
                    // console.log(startDate, roundedTimestamp);
                    let delta = roundedTimestamp - startDate;
                    let index = delta / 15000;
                    // console.log(delta, index);
                    if (index < 1680)
                        chartData[index].y = obj.price;
                });
                // console.log(sData[sData.length - 1])
                this.setState({ price: sData[sData.length - 1].price.toFixed(2) });

            }).then(() => {
                this.myLineChart = new Chart(this.myChartRef, {
                    type: "line",
                    data: {
                        //Bring in data
                        datasets: [{
                            data: chartData,
                            borderColor: "#3e95cd",
                            fill: false,
                            borderWidth: 1.5
                        }]
                    },
                    options: {

                        elements: {
                            point: {
                                radius: 0
                            }
                        },

                        scales: {
                            yAxes: [{
                                type: 'linear',
                                ticks: {
                                    min: 20,
                                    max: 30
                                }
                            }],
                            xAxes: [{
                                type: 'time',
                                distribution: 'series',
                                display: false,
                                time: {
                                    unit: "minute"
                                }
                            }]
                        }
                    }
                });
            });
    }

    render() {
        return (
            <div className={classes.graphContainer}>
                <StockPrice price={this.state.price} />
                {/* <span>{this.state.price}</span> */}
                <canvas
                    className={classes.chart}
                    id="myChart"
                    ref={this.chartRef}
                />
            </div>
        );
    }
}

export default PlotData;