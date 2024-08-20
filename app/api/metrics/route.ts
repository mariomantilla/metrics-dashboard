import { z } from 'zod';
import { withErrorHandler } from '@/utils/withErrorHandler';
import { createMetric, getMetrics } from '@/services/metrics';

const metricSchema = z.object({
    name: z.string(),
    value: z.number(),
    timestamp: z.string().datetime().optional(),
});
type MetricData = z.infer<typeof metricSchema>;

export const GET = withErrorHandler(
    async (req: Request) => await getMetrics()
);

export const POST = withErrorHandler(
    async (req: Request, data: MetricData) => await createMetric(data),
    metricSchema
);