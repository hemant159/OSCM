import React from 'react';
import { Line, Doughnut } from "react-chartjs-2";
import {CategoryScale, Chart as ChartJS, Tooltip, Filler, LinearScale, PointElement, LineElement, ArcElement, Legend, plugins, scales} from "chart.js";
import { getLast7Days } from '../../lib/features';
import { grayColor, violet, violetLight } from '../../constants/color';

ChartJS.register(
    Tooltip,
    CategoryScale,
    Filler,
    LinearScale,
    LineElement,
    PointElement,
    ArcElement,
    Legend
);

const labels = getLast7Days();

const lineChartOptions = {
    responsive: true,
    plugins: {
        legend: {
            display: false
        },
    },

    scales: {
        x: {
            grid: {
                display: false
            },
        },
        y: {
            beginAtZero: true,
            grid: {
                display: false
            },
        },
    }
}

const LineChart = ({value=[]}) => {
    const data = {
        labels,
        datasets: [
            {
                data: value,
                label: "Revenge 1",
                fill: true,
                backgroundColor: "rgba(72, 12, 192, 0.2)",
                borderColor: "rgba(75, 12, 192, 1)"
            },
        ]
    }
  return (
    <Line data={ data } options={lineChartOptions} />
  )
}

const doughnutChartOption = {
    responsive: true,
    plugins: {
        legend: false,
    },
    cutout: 120,
};

const DoughnutChart = ({ value=[], labels=[] }) => {

    const data = {
        labels,
        datasets: [
            {
                data: value,
                label: "Toyal Chats Vs Group Chats",
                backgroundColor: [violetLight, grayColor],
                borderColor: [violet, grayColor],
                hoverBackgroundColor: [violet, grayColor],
                offset: 40
            },
        ]
    }

    return (
      <Doughnut style={{ zIndex: 10}} data={data} options={doughnutChartOption} />
    )
  }

export { LineChart, DoughnutChart };