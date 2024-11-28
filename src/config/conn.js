import mssql from 'mssql';

const conn = {
    server: 'tpi-gaona-futbol-leofjr.database.windows.net',
    database: 'tpi-gaona-futbol-leofjr',
    user: 'Userfutbol',
    password: 'bolful_2024',
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