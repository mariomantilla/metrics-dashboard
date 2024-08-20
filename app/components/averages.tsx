"use client"

import useSWR from "swr";
import TimelineChart from "./timeline";
import { fetcher } from "@/utils/fetcher";

type Average = {
	time: string,
	name: string,
	average: number
}

export default function AveragesChart({ period }: { period: "day" | "hour" | "minute" }) {

	const { data, isLoading } = useSWR(`/api/metrics/${period}-average`, fetcher, { refreshInterval: 1000 });

	if (isLoading) return '';

	const groupMetrics = (metrics: Average[]) => metrics.reduce((acc, metric) => {
		if (!acc[metric.name]) {
			acc[metric.name] = [];
		}
		acc[metric.name].push(metric);
		return acc;
	}, {} as Record<string, Average[]>)

	const getDatasetsConfig = (groupedMetrics: Record<string, Average[]>) => Object.keys(groupedMetrics).map((name) => ({
		label: name,
		data: groupedMetrics[name].map((metric) => ({
			x: metric.time,
			y: metric.average,
		})),
		fill: false,
	}));

	const groupedMetrics = groupMetrics(data);
	const datasets = getDatasetsConfig(groupedMetrics);
	return <TimelineChart
		title={"Average by "+period}
		yLabel="Values"
		unit={period}
		datasets={datasets}
	/>
}