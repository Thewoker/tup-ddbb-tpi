import mssql from 'mssql';

const conn = {
    server: process.env.SERVERNAME,
    database: process.env.DATABASENAME,
    user: process.env.USER,
    password: process.env.PASSWORD,
    options: {
        encrypt: true,
        trustServerCertificate: true
    }
};

export async function getConnection() {
    try {
        return await mssql.connect(conn)
    } catch (error) {
        console.error(error);
    }
}

export {mssql}