"use client"

import { Line } from 'react-chartjs-2';

import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Title,
    Tooltip,
    Legend,
    TimeScale,
    Colors,
    ChartDataset
} from 'chart.js';
import 'chartjs-adapter-date-fns';

ChartJS.register(
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Title,
    Tooltip,
    Legend,
    TimeScale,
    Colors
);

type Units = "millisecond" | "second" | "minute" | "hour" | "day"

interface TimelineChartProps {
    title: string,
    yLabel: string,
    unit: Units,
    datasets: ChartDataset<"line", {x: Date | string, y: number}[]>[];
}

export default function TimelineChart({
    title,
    yLabel,
    unit,
    datasets 
}: TimelineChartProps) {
    
    const options = {
        responsive: true,
        scales: {
            x: {
                type: 'time' as const,
                time: {
                    unit: unit,
                },
                title: {
                    display: true,
                    text: 'Time',
                },
            },
            y: {
                title: {
                    display: true,
                    text: yLabel,
                },
                beginAtZero: true,
            },
        },
        plugins: {
            legend: {
                display: true,
                position: 'top' as const,
            },
            title: {
                display: true,
                text: title,
            }
        }
    };

    return <Line data={{ datasets }} options={options} />;
}