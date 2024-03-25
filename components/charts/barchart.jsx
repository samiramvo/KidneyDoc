"use client"
import { Chart } from "react-google-charts";
import { useTheme } from "next-themes";

export const data = [
    ["Year", "Sales", "Expenses", "Profit"],
    ["2014", 1000, 400, 200],
    ["2015", 1170, 460, 250],
    ["2016", 660, 1120, 300],
    ["2017", 1030, 540, 350],
];

export default function BarChartComponent() {
    const { theme } = useTheme();

    const options = {
        chart: {
            title: "Company Performance",
            subtitle: "Sales, Expenses, and Profit: 2014-2017",
        },
        backgroundColor: theme === 'light' ? '#FFF' : '#333',
        legend: {
            textStyle: {
                color: '#A3AED0',
                fontName: 'DM Sans',
                fontSize: 14
            }
        },
        hAxis: {
            titleTextStyle: {
                color: theme === 'light' ? '#A3AED0' : '#FFFFFF',
                fontName: 'DM Sans',
                fontSize: 12
            },
            textStyle: {
                color: theme === 'light' ? '#A3AED0' : '#FFFFFF',
                fontName: 'DM Sans',
                fontSize: 12
            }
        },
        series: {
            0: {
                type: 'bars',
                areaOpacity: 0,
                lineWidth: 1,
                color: '#624aff'
            },
            1: {
                type: 'bars',
                areaOpacity: 0,
                lineWidth: 1,
                color: '#6AD2FF'
            },
            2: {
                type: 'bars',
                areaOpacity: 0,
                lineWidth: 1,
                color: '#EFF4FB'
            }
        },
        titleTextStyle: {
            color: '#1B2559',
            fontName: 'DM Sans',
            fontSize: 20
        },
        subtitleTextStyle: {
            color: '#A3AED0',
            fontName: 'DM Sans',
            fontSize: 14
        },
    };

    return (
        <div>
            <h2 style={{ color: theme === 'light' ? '#1B2559' : '#FFFFFF', fontFamily: 'DM Sans', fontSize: 17 }}>Company Performance</h2>
            <h3 style={{ color: theme === 'light' ? '#A3AED0' : '#A3AED0', fontFamily: 'DM Sans', fontSize: 14 }}>Sales, Expenses, and Profit: 2014-2017</h3>
            <Chart
                chartType="ColumnChart"
                width="100%"
                height="400px"
                loader={<div className={theme === 'light' ? 'text-[#1B2559]' : 'text-[#FFFFFF]'}>Loading Bar Chart</div>}
                data={data}
                options={options}
            />
        </div>
    );
}
