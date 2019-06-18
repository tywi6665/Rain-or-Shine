import React, { useState, useEffect, useContext } from "react";
import * as d3 from "d3";
import "./ForecastPlot.scss";
import "weather-underground-icons";
// import { WeatherContext } from "../../context/weatherContext";

const ForecastPlot = ({ forecast, isMetric }) => {

    // const [weather, setWeather] = useContext(WeatherContext)
    const [forecastData, setForecastData] = useState(null)
    const [windowWidth, setWindowWidth] = useState(window.innerWidth);

    useEffect(() => {

        if (forecast) {

            const rawForecastData = forecast;

            let forecastDataArr = [];

            rawForecastData.forEach((data) => {
                forecastDataArr.push({
                    date: data.time,
                    temp: data.temperatureHigh,
                    tempTime: data.temperatureHighTime,
                    icon: data.icon.replace(/-/g, "").replace("day", "").replace("night", "")
                });
                forecastDataArr.push({
                    date: data.time,
                    temp: data.temperatureLow,
                    tempTime: data.temperatureLowTime,
                    icon: data.icon.replace(/-/g, "").replace("day", "").replace("night", "")
                })
            });

            if (isMetric) {
                forecastDataArr.forEach((date) => {
                    date.temp = Number(((date.temp - 32) * 5 / 9).toString().slice(0, 5))
                });
            }
            setForecastData(forecastDataArr);
            plot(forecastDataArr);
        }
    }, [forecast, isMetric, windowWidth])

    useEffect(() => {
        const handleResize = () => setWindowWidth(window.innerWidth);
        window.addEventListener("resize", handleResize);
        return () => window.removeEventListener("resize", handleResize);
    }, []);

    function plot(data) {

        d3.select(".d3plot").remove();

        // data.pop();

        const margin = {
            top: 20,
            right: 60,
            bottom: 30,
            left: 60
        },
            width = (windowWidth / 1.15) - margin.left - margin.right,
            height = 550 - margin.top - margin.bottom;

        const parseDate = d3.timeParse("%s")

        data.forEach((date) => {
            date.tempTime = parseDate(date.tempTime)
        });

        const maxTemp = data.reduce(function (a, b) {
            return (a.temp > b.temp) ? a : b;
        });

        const minTemp = data.reduce(function (a, b) {
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
            .range([height - 25, 0]);

        const xAxis = d3.axisBottom(x);

        const yAxis = d3.axisLeft(y);

        const lineGenerator = d3.line()
            .curve(d3.curveCardinal)
            .x(function (d) { return x(d.tempTime); })
            .y(function (d) { return y(d.temp); });

        svg.append("g")
            .attr("class", "x axis")
            .attr("transform", `translate(0, ${height - 25})`)
            .call(xAxis.tickFormat(d3.timeFormat("%A")))

        svg.append("text")
            .attr("transform", `translate(${width / 2}, ${((height - 25) + margin.top + 20)})`)
            .style("text-anchor", "middle")
            .text("7 Day Forecast");

        svg.append("g")
            .attr("class", "y axis")
            .call(yAxis);

        svg.append("text")
            .attr("transform", "rotate(-90)")
            .attr("y", 0 - (margin.left - 10))
            .attr("x", 0 - (height / 2))
            .attr("dy", "1em")
            .style("text-anchor", "middle")
            .text(isMetric ? "Temperature(C)" : "Temperature(F)");

        svg.append("linearGradient")
            .attr("id", "temp-gradient")
            .attr("gradientUnits", "userSpaceOnUse")
            .attr("x1", 0).attr("y1", y(minTemp.temp))
            .attr("x2", 0).attr("y2", y(maxTemp.temp))
            .selectAll("stop")
            .data([
                { offset: "0%", color: "#1A12FE" },
                { offset: "100%", color: "#FE1212" }
            ])
            .enter().append("stop")
            .attr("offset", function (d) { return d.offset; })
            .attr("stop-color", function (d) { return d.color; });

        svg.append("path")
            .datum(data)
            .attr("class", "line")
            .attr("d", lineGenerator);

        svg.selectAll(".dot")
            .data(data)
            .enter()
            .append("circle")
            .attr("class", "dot")
            .attr("cx", function (d, i) { return x(d.tempTime); })
            .attr("cy", function (d) { return y(d.temp); })
            .attr("r", 2.5)
            .on("mouseover", handleMouseOver)
            .on("mouseout", handleMouseOut);

        const div = d3.select(".plot")
            .append("div")
            .attr("class", "toolTip")
            .style("opacity", 0);

        function handleMouseOver(d) {
            d3.select(this)
                .transition()
                .duration(200)
                .attr("r", 10);

            div.transition()
                .delay(100)
                .duration(200)
                .style("opacity", 0.9);

            div.html(`<i class="wu wu-white wu-${d.icon} wu-64 icon"></i><br/><strong>${d.temp}º${isMetric ? "C" : "F"}</strong><br/><p>${d.tempTime.toString().split("").slice(0, 21).join("")}</p>`)
                .style("left", `${d3.event.pageX - 55}px`)
                .style("top", `${d3.event.pageY + 20}px`)
            // .style("border-color", `${rgb}`)
        };

        function handleMouseOut(d) {
            d3.select(this)
                .transition()
                .attr("r", 2.5);

            div.transition()
                .duration(500)
                .style("opacity", 0);
        };
    };

    return (
        <div className="plot"></div>
    );
};

export default ForecastPlot;