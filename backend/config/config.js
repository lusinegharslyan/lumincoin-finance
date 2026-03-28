const path = require("path");

const config = {
    secret: '243Oaslhbstdfgh4O7FdaghYLDQWliuwe7YFLIAS7EDFY7iyflasi',
    env: process.env.ENV,
    port: 3000,
    db: {
        dbUrl: 'mongodb://127.0.0.1:27017',
        dbName: 'operations',
        dbHost: 'localhost',
        dbPort: 27017,
    },
};

module.exports = config;