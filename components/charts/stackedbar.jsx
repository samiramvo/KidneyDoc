"use client";
import { Chart } from "react-google-charts";
import { useTheme } from "next-themes";
import { useTranslation } from "@/app/hooks/useTranslation";

export default function App({ data }) {
  const { theme } = useTheme();
  const { t } = useTranslation();

  const transformData = () => {
    // if (!data) return [["Age group", "Men", "Women"]];
    if (!data) return [[t("ageGroups"), t("men"), t("women")]];
    const ageGroups = {};
    data.forEach((item) => {
      const ageGroup = item._id?.ageGroup || "Inconnu";
      const gender = item._id?.gender || "Inconnu";
      if (!ageGroups[ageGroup]) {
        ageGroups[ageGroup] = { Male: 0, Female: 0 };
      }
      ageGroups[ageGroup][gender] = item.count;
    });

    return [
      // ["Age group", "Men", "Women"],
      [t("ageGroups"), t("men"), t("women")],
      ...Object.entries(ageGroups).map(([ageGroup, counts]) => [
        ageGroup,
        counts.Male || 0,
        counts.Female || 0,
      ]),
    ];
  };

  const chartData = transformData();

  const options = {
    // title: "Distribution by age group and gender",
    title: t("distributionAgeGender"),
    isStacked: true,
    backgroundColor: theme === "light" ? "#F9FAFA" : "#333",
    titleTextStyle: { color: theme === "light" ? "#1B2559" : "#FFFFFF" },
    legend: { textStyle: { color: theme === "light" ? "#1B2559" : "#FFFFFF" } },
    hAxis: { textStyle: { color: theme === "light" ? "#1B2559" : "#FFFFFF" } },
    vAxis: { textStyle: { color: theme === "light" ? "#1B2559" : "#FFFFFF" } },
    colors: ["#4318FF", "#6AD2FF"],
  };

  return (
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
          {/* Loading Stacked Chart */}
          {t("loadingStackedChart")}
        </div>
      }
    />
  );
}
