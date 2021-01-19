const db = {
    user: process.env.DB_USER,
    password: process.env.DB_PASS,
    server: process.env.DB_SERVER,
    port: 2741,
    database: process.env.DB,
    connectionTimeout: 720000,
    requestTimeout: 720000,
    options: { enableArithAbort: true },
    pool: {
        max: 10,
        min: 0,
        idleTimeoutMillis: 30000,
    },
};
module.exports = db;
