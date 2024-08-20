import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

const interval = 15;

async function main() {

	const currentDate = new Date();
	let date = new Date();
	date.setDate(currentDate.getDate() - 3);

	const dates: Date[] = [];
	while (date <= currentDate) {
		dates.push(new Date(date));
		date.setSeconds(date.getSeconds() + 15)
	}

	const indexToTempDelta = (i: number) => 5*Math.cos((i*interval/3600-6)*(2*3.1415/24));

	await prisma.metric.createMany({
		data: dates.map((d, i) => ({
			name: "Internal Temperature",
			value: indexToTempDelta(i)+25,
			timestamp: d,
		})).concat(dates.map((d, i) => ({
			name: "Fridge Temperature",
			value: indexToTempDelta(i)+15,
			timestamp: d,
		})))

	})

}

main().then(async () => {
	await prisma.$disconnect();
})
.catch(async (e) => {
	console.error(e);
	await prisma.$disconnect();
	process.exit(1);
});
