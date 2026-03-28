const config = require('./config/config');
const configMigrations = {
    mongodb: {
        url: config.db.dbUrl,
        databaseName: config.db.dbName,
    },
    moduleSystem: 'commonjs',
    migrationsDir: "data",
    changelogCollectionName: "data",
    migrationFileExtension: ".js",
    useFileHash: false
};
module.exports = configMigrations;