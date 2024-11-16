"use client";
import { Chart } from "react-google-charts";
import { useTheme } from "next-themes";

export default function App({ data }) {
  const { theme } = useTheme();

  const chartData = [
    ["Gender", "Number of patients"],
    ...data.map((entry) => [entry._id, entry.count]),
  ];

  const options = {
    title: "Distribution by gender",
    is3D: true,
    backgroundColor: theme === "light" ? "#F9FAFA" : "#333",
    titleTextStyle: { color: theme === "light" ? "#1B2559" : "#FFFFFF" },
    legend: { textStyle: { color: theme === "light" ? "#1B2559" : "#FFFFFF" } },
    colors: ["#4318FF", "#6AD2FF"],
  };

  return (
    <Chart
      chartType="PieChart"
      data={chartData}
      options={options}
      width="100%"
      height="400px"
      loader={
        <div
          className={theme === "light" ? "text-[#1B2559]" : "text-[#FFFFFF]"}
        >
          Loading Line Chart
        </div>
      }
    />
  );
}
