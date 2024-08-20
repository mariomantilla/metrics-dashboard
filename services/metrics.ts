import { MAX_METRICS_PER_QUERY } from "@/constants";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export const getMetrics = async () => {
	const lastHour = Date.now() - (60 * 60 * 1000);
	return prisma.metric.findMany({
		orderBy: [
			{ name: "asc" },
			{ timestamp: "asc" },
		],
		where: {
			timestamp: {
				gt: new Date(lastHour).toISOString()
			}
		},
		take: MAX_METRICS_PER_QUERY,
	});
};

const getAverages = async (format: string, period: string) => {
	return await prisma.$queryRaw<
		{ time: string; name: string; average: number }[]
	>`
	SELECT 
		strftime(${format}, datetime(timestamp / 1000, 'unixepoch')) as time,
		name,
		AVG(value) as average
	FROM 
		Metric
	WHERE
		datetime(timestamp / 1000, 'unixepoch') > datetime('now', ${period})
	GROUP BY 
		name, time
	ORDER BY 
		name ASC, time ASC
	LIMIT ${MAX_METRICS_PER_QUERY};
	`;
};

export const getDailyAverages = async () => {
  return await getAverages('%Y-%m-%d', '-30 Days');
};

export const getHourlyAverages = async () => {
	return await getAverages('%Y-%m-%d %H', '-24 Hour');
};

export const getAveragesByMinute = async () => {
	return await getAverages('%Y-%m-%d %H:%M', '-1 Hour');
};

export const createMetric = async (data: {
  name: string;
  value: number;
  timestamp?: string;
}) => {
  return prisma.metric.create({
    data,
  });
};
