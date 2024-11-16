"use client";
import { Chart } from "react-google-charts";
import { useTheme } from "next-themes";

export default function App({ consultationData, patientData }) {
  const { theme } = useTheme();

  const months = [
    "Jan",
    "Fév",
    "Mar",
    "Avr",
    "Mai",
    "Jun",
    "Jul",
    "Aoû",
    "Sep",
    "Oct",
    "Nov",
    "Déc",
  ];

  const chartData = [
    ["Month", "Consultations", "New Patients"],
    ...months.map((month, idx) => [
      month,
      consultationData.find((m) => m._id === idx + 1)?.count || 0,
      patientData.find((m) => m._id === idx + 1)?.count || 0,
    ]),
  ];

  const options = {
    title: "Monthly evolution",
    backgroundColor: theme === "light" ? "#F9FAFA" : "#333",
    titleTextStyle: { color: theme === "light" ? "#1B2559" : "#FFFFFF" },
    legend: { textStyle: { color: theme === "light" ? "#1B2559" : "#FFFFFF" } },
    hAxis: { textStyle: { color: theme === "light" ? "#1B2559" : "#FFFFFF" } },
    vAxis: { textStyle: { color: theme === "light" ? "#1B2559" : "#FFFFFF" } },
    colors: ["#4318FF", "#6AD2FF"],
  };

  return (
    <Chart
      chartType="LineChart"
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
