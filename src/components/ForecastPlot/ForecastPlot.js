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
                    temp: data.temperatureHigh,
                    tempTime: data.temperatureHighTime,
                });
                forecastDataArr.push({
                    date: data.time,
                    temp: data.temperatureLow,
                    tempTime: data.temperatureLowTime
                })
            })
            setForecastData(forecastDataArr);
            plot(forecastDataArr);
        }
    }, [props.forecast])

    console.log(forecastData);
    function plot(data) {

        d3.select(".d3plot").remove();

        const margin = {
            top: 20,
            right: 50,
            bottom: 30,
            left: 50
        },
            width = window.innerWidth - margin.left - margin.right,
            height = 500 - margin.top - margin.bottom;

        const parseDate = d3.timeParse("%s")

        data.forEach((date) => {
            date.tempTime = parseDate(date.tempTime)
        });

        const maxTemp = data.reduce(function(a, b) {
            return (a.temp > b.temp) ? a : b;
        });

        const minTemp = data.reduce(function(a, b) {
            return (b.temp > a.temp) ? a : b;
        });

        const svg = d3.select(".plot")
            .append("svg")
            .attr("class", "d3plot")
            .attr("width", width + margin.left + margin.right)
            .attr("height", height + margin.top + margin.bottom)
            .append("g")
            .attr("transform", `translate(${margin.left}, ${margin.top})`);

        const x = d3.scaleTime()
            .domain([data[0].tempTime, data[data.length - 1].tempTime])
            .range([0, width]);

        const y = d3.scaleLinear()
            .domain(d3.extent(data, function (d) { return d.temp }))
            .range([height, 0]);

        const xAxis = d3.axisBottom(x);

        const yAxis = d3.axisLeft(y);

        const lineGenerator = d3.line()
            .curve(d3.curveMonotoneX)
            .x(function (d) { return x(d.tempTime); })
            .y(function (d) { return y(d.temp); });

        svg.append("g")
            .attr("class", "x axis")
            .attr("transform", `translate(0, ${height})`)
            .call(xAxis.tickFormat(d3.timeFormat("%A")));

        svg.append("g")
            .attr("class", "y axis")
            .call(yAxis);

        svg.append("linearGradient")
            .attr("id", "temp-gradient")
            .attr("gradientUnits", "userSpaceOnUse")
            .attr("x1", 0).attr("y1", y(minTemp.temp))
            .attr("x2", 0).attr("y2", y(maxTemp.temp))
            .selectAll("stop")
            .data([
                { offset: "0%", color: "#1A12FE" },
                // { offset: "50%", color: "gray" },
                { offset: "100%", color: "#FE1212" }
            ])
            .enter().append("stop")
            .attr("offset", function (d) { return d.offset; })
            .attr("stop-color", function (d) { return d.color; });

        svg.append("path")
            .datum(data)
            .attr("class", "line")
            .attr("d", lineGenerator)

    }

    return (
        <div className="plot"></div>
    )
};

export default ForecastPlot;