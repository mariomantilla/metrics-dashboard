/**
 * @jest-environment node
 */

import { createMetric, getAveragesByMinute, getDailyAverages, getHourlyAverages, getMetrics } from "@/services/metrics";

describe("metrics service", () => {
	test("creates a new metric", async () => {
		const metric = await createMetric({
			name: "testMetric",
			value: 5,
		});
		expect(metric).toMatchObject({ name: "testMetric", value: 5 });
	});
	test("query metrics", async () => {
		const metrics = await getMetrics();
		expect(Array.isArray(metrics)).toBe(true);
		metrics.forEach((item) => {
			expect(item).toHaveProperty("name");
			expect(item).toHaveProperty("value");
			expect(item).toHaveProperty("timestamp");
		});
	});
	test("average match", async () => {
		await createMetric({
			name: "average",
			value: 0,
		});
		await createMetric({
			name: "average",
			value: 1,
		});
		const dailyAverages = await getDailyAverages();
		dailyAverages.forEach((item) => {
			if (item.name == 'average') expect(item).toMatchObject({ average: 0.5 });
		});
		const hourlyAverages = await getHourlyAverages();
		hourlyAverages.forEach((item) => {
			if (item.name == 'average') expect(item).toMatchObject({ average: 0.5 });
		});
		const minutesAverages = await getAveragesByMinute();
		minutesAverages.forEach((item) => {
			if (item.name == 'average') expect(item).toMatchObject({ average: 0.5 });
		});
	});
});
