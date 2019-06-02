const mysql = require('promise-mysql');
const config = require('./config');
const httpErrors = require('http-errors');

const createPool = async () => {
    try {
        const pool = mysql.createPool(config);
        console.log(`connected to database: ${config.database}`);

        pool.getConnection((err, connection) => {
            if (err) {
                if (err.code === 'PROTOCOL_CONNECTION_LOST') {
                    console.error('Database connection was closed.');
                }
                if (err.code === 'ER_CON_COUNT_ERROR') {
                    console.error('Database has too many connections.');
                }
                if (err.code === 'ECONNREFUSED') {
                    console.error('Database connection was refused.');
                }
            }
            if (connection) connection.release();
            return;
        });
        global.pool = pool;
    } catch (error) {
        console.log(error);
        throw new httpErrors.InternalServerError(`database error`);
    }
};
module.exports = createPool;
