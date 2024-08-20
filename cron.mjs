import cron from 'node-cron';

const job = cron.schedule('* * * * *', () => {
    fetch(
        `http://localhost:3000/api/weather`
    ).then((response) => {
        console.log(response);
    })
    .catch((error) => {
        console.error(error)
    })
});

job.start();
