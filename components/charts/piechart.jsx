"use client"
import { Chart } from "react-google-charts";
import { useTheme } from "next-themes";
export const data = [
    ["Task", "Hours per Day"],
    ["Work", 6],
    ["Eat", 2],
    ["Commute", 2],
];

export default function App() {
    const { theme } = useTheme();
    const options = {
        title: "My Daily Activities",
        is3D: true,
        backgroundColor: theme === 'light' ? '#FFF' : '#333',
        colors: ['#624aff', '#6AD2FF', '#EFF4FB'],
        titleTextStyle: {
            color: theme === 'light' ? '#1B2559' : '#FFFFFF',
            fontName: 'DM Sans',
            fontSize: 18
        },
        pieSliceTextStyle: {
            color: '#FFFFFF',
            fontName: 'DM Sans',
            fontSize: 12
        },
        legend: {
            position: "bottom",
            alignment: "center",
            textStyle: {
                color: '#A3AED0',
                fontName: 'DM Sans',
                fontSize: 14
            }
        }
    }
    return (
        <Chart
            chartType="PieChart"
            data={data}
            options={options}
            width={"100%"}
            height={"400px"}
            loader={<div className={theme === 'light' ? 'text-[#1B2559]' : 'text-[#FFFFFF]'}>Loading Line Chart</div>}

        />
    );
}