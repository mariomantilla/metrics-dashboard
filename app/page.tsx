import NewMetricForm from './components/metricForm';
import GeneralTimelineChart from './components/generalTimeline';
import DailyAverageChart from './components/averages';

export default async function Home() {

	return (
		<div className='flex items-center flex-col p-10 gap-5'>
			<h1 className='text-3xl p-4'>Welcome to the Metrics Dashboard</h1>
			<NewMetricForm />
			<h2 className='text-2xl mt-4'>Metrics Timelines</h2>
			<div className='grid grid-cols-2 w-full'>
				<div>
					<GeneralTimelineChart />
				</div>
				<div>
					<DailyAverageChart period={"minute"} />
				</div>
				<div>
					<DailyAverageChart period={"hour"} />
				</div>
				<div>
					<DailyAverageChart period={"day"} />
				</div>
			</div>
		</div>
	);
}
