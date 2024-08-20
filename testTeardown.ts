const fs = require('fs');

module.exports = async function (globalConfig: any, projectConfig: any) {
    try {
        fs.unlinkSync('./prisma/test.db');
        console.log('successfully deleted testing db');
    } catch (err) {
        console.log('Error deleting testing Database')
    }
};