import React, { useState } from "react";
import { Chart, registerables } from "chart.js";
import { Pie, Doughnut } from "react-chartjs-2";

Chart.register(...registerables);

const InstructorChart = ({ courses }) => {
  const [currChart, setCurrChart] = useState("students");
  const [chartType, setChartType] = useState("pie");
  //*function to generate random colors
  const getRandomColors = (numColors) => {
    const colors = [];
    for (let i = 0; i < numColors; i++) {
      const color = `rgb(${Math.floor(Math.random() * 256)},${Math.floor(
        Math.random() * 256
      )},${Math.floor(Math.random() * 256)})`;
      colors.push(color);
    }
    return colors;
  };

  //*Create data for student info to display chart
  const chartDataForStudents = {
    labels: courses?.map((course) => course.courseName),
    datasets: [
      {
        data: courses?.map((course) => course?.totalStudentsEnrolled),
        backgroundColor: getRandomColors(courses?.length),
      },
    ],
  };

  //*Create data for income info to display chart
  const chartDataForIncome = {
    labels: courses?.map((course) => course.courseName),
    datasets: [
      {
        data: courses?.map((course) => course?.totalIncome),
        backgroundColor: getRandomColors(courses?.length),
      },
    ],
  };

  return (
    <div>
      <div className=" text-white font-semibold text-2xl mb-1 flex items-center gap-2">
        <p>Visualise</p>
        <p className=" text-sm font-normal flex">
          <button
            onClick={() => setChartType("pie")}
            className={`${
              chartType === "pie"
                ? " text-yellow-50 rounded-sm px-2 py-1"
                : "text-richblack-200  rounded-sm px-2 py-1"
            }`}
          >
            Pie chart
          </button>
          <button
            onClick={() => setChartType("doughnut")}
            className={`${
              chartType === "doughnut"
                ? " text-yellow-50 rounded-sm px-2 py-1"
                : "text-richblack-200 rounded-sm px-2 py-1"
            }`}
          >
            Doughnut chart
          </button>
        </p>
      </div>
      <div className={` flex gap-x-4 text-white }`}>
        <button
          onClick={() => setCurrChart("students")}
          className={`${
            currChart === "students"
              ? " text-yellow-50 bg-richblack-600 rounded-sm px-3 py-1"
              : "text-richblack-200 bg-richblack-700 rounded-sm px-3 py-1"
          }`}
        >
          Students
        </button>
        <button
          onClick={() => setCurrChart("income")}
          className={`${
            currChart === "income"
              ? " text-yellow-50 bg-richblack-600 rounded-sm px-3 py-1"
              : "text-richblack-200 bg-richblack-700 rounded-sm px-3 py-1"
          }`}
        >
          Income
        </button>
      </div>
      <div className=" h-96 flex justify-center">
        {chartType === "pie" ? (
          <Pie
            data={
              currChart === "students"
                ? chartDataForStudents
                : chartDataForIncome
            }
          />
        ) : (
          <Doughnut
            data={
              currChart === "students"
                ? chartDataForStudents
                : chartDataForIncome
            }
          />
        )}
      </div>
    </div>
  );
};

export default InstructorChart;
