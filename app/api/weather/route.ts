import { createMetric } from "@/services/metrics";
import { withErrorHandler } from "@/utils/withErrorHandler";

export const GET = withErrorHandler(
    async (req: Request) => await updateWeatherMetric()
);

async function updateWeatherMetric() {
    const latestWeather = await fetch(
        `http://us-east.api.openweathermap.org/data/2.5/weather?lat=40.4379543&lon=-3.6795367&appid=${process.env.WEATHER_API_KEY}`
    ).then((res) => res.json());

    const tempMetric = await createMetric({
        name: "Ambient Temperature",
        value: latestWeather['main']['temp']-272.15,
    });

    return tempMetric;
}
