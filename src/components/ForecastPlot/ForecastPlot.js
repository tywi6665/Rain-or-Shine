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
            plot(forecastDataArr);
        }
    }, [props.forecast])

    console.log(forecastData);
    function plot(data) {

        d3.select(".d3plot").remove();

        const n = 21;
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
            .attr("class", "d3plot")
            .attr("width", width + margin.left + margin.right)
            .attr("height", height + margin.top + margin.bottom)
            .append("g")
            .attr("transform", `translate(${margin.left}, ${margin.top})`);

        const x = d3.scaleTime()
            .domain([data[0].date, data[data.length - 1].date])
            .range([0, width]);

        const y = d3.scaleLinear()
            .domain(d3.extent(data, function(d) { return d.highTemp }))
            .range([height, 0]);

        const xAxis = d3.axisBottom(x);

        const yAxis = d3.axisLeft(y);

        const lineGenerator = d3.line()
            .curve(d3.curveMonotoneX)
            .x(function (d, i) { return x(i); })
            .y(function (d) { return y(d.y); });

        svg.append("g")
            .attr("class", "x axis")
            .attr("transform", `translate(0, ${height})`)
            .call(xAxis);

        svg.append("g")
            .attr("class", "y axis")
            .call(yAxis);

        svg.append("linearGradient")
            .attr("id", "temp-gradient")
            .attr("gradientUnits", "userSpaceOnUse")
            .attr("x1", 0).attr("y1", y(0))
            .attr("x2", 0).attr("y2", y(1))
            .selectAll("stop")
            .data([
                { offset: "0%", color: "black" },
                { offset: "50%", color: "gray" },
                { offset: "100%", color: "red" }
            ])
            .enter().append("stop")
            .attr("offset", function (d) { return d.offset; })
            .attr("stop-color", function (d) { return d.color; });


        // var dataset = d3.range(n).map(function (d) { return { "y": d3.randomUniform(1)() } })

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