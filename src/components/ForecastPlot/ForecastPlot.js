import React, { useState, useEffect } from "react";
import * as d3 from "d3";
import "./ForecastPlot.scss";

const ForecastPlot = (props) => {

    const [forecastData, setForecastData] = useState(null)

    useEffect(() => {

        if (props.forecast) {
            const rawForecastData = props.forecast;

            let forecastDataArr = [];

            rawForecastData.forEach((data) => {
                forecastDataArr.push({
                    date: data.time,
                    highTemp: data.temperatureHigh,
                    highTempTime: data.temperatureHighTime,
                    lowTemp: data.temperatureLow,
                    lowTempTime: data.temperatureLowTime
                })
            });
            setForecastData(forecastDataArr);
        }
    }, [props.forecast])

    console.log(forecastData);

    const margin = {
        top: 20,
        right: 20,
        bottom: 30,
        left: 50
    },
        width = 960 - margin.left - margin.right,
        height = 500 - margin.top - margin.bottom;

    // const parseDate = d3.time.format("%Y%m%d");

    const svg = d3.select(".plot")
        .append("svg")
        .attr("width", width + margin.left + margin.right)
        .attr("height", height + margin.top + margin.bottom)
        .append("g")
        .attr("transform", `translate(${margin.left}, ${margin.top})`);

    const x = d3.scaleTime()
        .range([0, width]);

    const y = d3.scaleLinear()
        .range([height, 0])

    const xAxis = d3.axisBottom(x);

    const yAxis = d3.axisLeft(y);

    const lineGenerator = d3.line()
        .curve(d3.curveMonotoneX)
        .x(function (d) { return x(d.day); })
        .y(function (d) { return y(d.temp); });

    return (
        <div className="plot"></div>
    )
};

export default ForecastPlot;