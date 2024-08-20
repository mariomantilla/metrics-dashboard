import { getDailyAverages } from "@/services/metrics";
import { withErrorHandler } from "@/utils/withErrorHandler";

export const GET = withErrorHandler(
    async (req: Request) => await getDailyAverages()
);