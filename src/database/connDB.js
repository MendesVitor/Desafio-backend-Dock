const db = require('../configs/db');
const mssql = require('mssql');

const query = (sql) => {
    return new Promise((res, rej) => {
        new mssql.ConnectionPool(db)
            .connect()
            .then((pool) => {
                res(pool.query(sql));
            })
            .catch((err) => {
                rej(err);
            });
    });
};

module.exports = {
    query,
};
