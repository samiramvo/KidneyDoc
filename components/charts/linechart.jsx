"use client"
import { Chart } from "react-google-charts";
import { useTheme } from "next-themes";
export const data = [
    ["Month", "Sales", "Expenses"],
    ["Jan", 1000, 400],
    ["Feb", 1170, 460],
    ["Mar", 660, 1120],
    ["Apr", 1030, 540],
    ["May", 800, 200],
    ["Jun", 1230, 900],
    ["Jul", 1100, 700],
    ["Aug", 1400, 600],
    ["Sep", 1000, 300],
    ["Oct", 1170, 600],
    ["Nov", 660, 800],
    ["Dec", 1030, 400],
];


export default function App() {
    const { theme } = useTheme();
    const options = {
        title: "Company Performance",
        curveType: "function",
        backgroundColor: theme === 'light' ? '#FFF' : '#333',
        legend: { position: "bottom" },
        series: {
            0: { color: "#4318FF" }, // Couleur de la première série (Sales)
            1: { color: "#6AD2FF" } // Couleur de la deuxième série (Expenses)
        },
        titleTextStyle: {
            color: theme === 'light' ? '#1B2559' : '#FFFFFF',
            fontName: 'DM Sans',
            fontSize: 18
        },
        hAxis: {
            title: 'Month',
            titleTextStyle: {
                color: '#A3AED0',
                fontName: 'DM Sans',
                fontSize: 14
            },
            textStyle: {
                color: '#A3AED0',
                fontName: 'DM Sans',
                fontSize: 12
            }
        },
        vAxis: {
            title: 'Amount',
            titleTextStyle: {
                color: '#A3AED0',
                fontName: 'DM Sans',
                fontSize: 14
            },
            textStyle: {
                color: '#A3AED03',
                fontName: 'DM Sans',
                fontSize: 12
            }
        }
    }
    return (
        <Chart
            chartType="LineChart"
            width="100%"
            height="400px"
            loader={<div className={theme === 'light' ? 'text-[#1B2559]' : 'text-[#FFFFFF]'}>Loading Line Chart</div>}
            data={data}
            options={options}
        />
    );
}
