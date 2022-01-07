// Initial Imports
require('dotenv').config();
const csv = require('csv-parser')
const fs = require('fs');
const colors = require('./colors');
const { initServices, syncUser } = require('./services');

// Users Array
const users = [];

// Read users from local file (CSV)
const readUsersFromCSV = async () => {
    console.log(colors.blue, "Reading users from file");
    return new Promise((resolve, reject) => {
        fs.createReadStream('users.csv')
            .pipe(csv())
            .on('data', (data) => users.push(data))
            .on('end', () => {
                resolve();
            })
            .on("error", error => reject(error));
    });
}

// Check if services are initialized
const runSync = async () => {
    if (initServices) {
        console.log(colors.blue,"Services initialized");
        await readUsersFromCSV();
        if (users.length > 0) {
            // Process Users
            console.log(colors.yellow,`Initiating users sync service for ${users.length} users`);
            users.forEach(user => {
                // Users Found
                syncUser(user);
            });
        }
        else {
            // No Users were found
            console.log(colors.red,"No users were found, finishing sync service");
        }
    }
}

// Run sync service
runSync();
