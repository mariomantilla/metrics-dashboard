"use client"

import { Metric } from "@prisma/client";
import TimelineChart from "./timeline";
import { fetcher } from "@/utils/fetcher";
import useSWR from 'swr'

export default function GeneralTimelineChart() {

    const { data, isLoading } = useSWR('/api/metrics', fetcher, { refreshInterval: 1000 });

	if (isLoading) return '';

    const groupMetrics = (metrics: Metric[]) => metrics.reduce((acc, metric) => {
        if (!acc[metric.name]) {
          acc[metric.name] = [];
        }
        acc[metric.name].push(metric);
        return acc;
    }, {} as Record<string, Metric[]>)
    
    const getDatasetsConfig = (groupedMetrics: Record<string, Metric[]>) => Object.keys(groupedMetrics).map((name) => ({
        label: name,
        data: groupedMetrics[name].map((metric) => ({
          x: metric.timestamp,
          y: metric.value,
        })),
        fill: false,
    }));

    const groupedMetrics = groupMetrics(data);
    const datasets = getDatasetsConfig(groupedMetrics);
    return <TimelineChart
        title="Timeline"
        yLabel="Values"
        unit="second"
        datasets={datasets}
    />
}