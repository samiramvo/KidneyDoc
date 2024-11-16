"use client";
import { Chart } from "react-google-charts";
import { useTheme } from "next-themes";

export default function BarChartComponent({ data }) {
  const { theme } = useTheme();

  const month = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ];

  const chartData = [
    ["Month", "New Patients"],
    ...data.map((entry) => [month[entry._id - 1], entry.count]),
  ];

  const options = {
    title: "New patients per month",
    backgroundColor: theme === "light" ? "#F9FAFA" : "#333",
    titleTextStyle: { color: theme === "light" ? "#1B2559" : "#FFFFFF" },
    legend: { textStyle: { color: theme === "light" ? "#1B2559" : "#FFFFFF" } },
    hAxis: { textStyle: { color: theme === "light" ? "#1B2559" : "#FFFFFF" } },
    vAxis: { textStyle: { color: theme === "light" ? "#1B2559" : "#FFFFFF" } },
    colors: ["#4318FF"],
  };

  return (
    <div>
      <h2
        style={{
          color: theme === "light" ? "#1B2559" : "#FFFFFF",
          fontFamily: "Plus Jakarta Sans",
          fontSize: 17,
        }}
      >
        New patients per month
      </h2>
      <Chart
        chartType="ColumnChart"
        data={chartData}
        options={options}
        width="100%"
        height="400px"
        loader={
          <div
            className={theme === "light" ? "text-[#1B2559]" : "text-[#FFFFFF]"}
          >
            Loading Bar Chart
          </div>
        }
      />
    </div>
  );
}
