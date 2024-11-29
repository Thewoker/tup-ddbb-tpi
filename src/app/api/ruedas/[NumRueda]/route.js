import { NextResponse } from 'next/server'
import { getConnection, mssql } from '@/config/conn'

export async function GET(req, { params }) {
    try {
        const { NumRueda } = await params
        const pool = await getConnection()

        const datos = await pool.request()
        .input('NumRueda', mssql.Int, NumRueda)
        .query(`
            SELECT 
    E.NumEncuentro AS NumeroEncuentro,
    EQ1.Nombre AS Equipo1,
    EQ2.Nombre AS Equipo2,
    E.Fecha AS FechaEncuentro
FROM 
    Rueda R
    INNER JOIN Encuentro E ON R.IDRueda = E.IDRuedaFk
    INNER JOIN Compiten C1 ON E.NumEncuentro = C1.NumEncuentroFK
    INNER JOIN Compiten C2 ON E.NumEncuentro = C2.NumEncuentroFK
    INNER JOIN Equipo EQ1 ON C1.NumEquipoFK = EQ1.NumEquipo
    INNER JOIN Equipo EQ2 ON C2.NumEquipoFK = EQ2.NumEquipo
WHERE 
    R.IDRueda = @NumRueda
    AND C1.NumEquipoFK < C2.NumEquipoFK
ORDER BY 
    E.Fecha, E.NumEncuentro;
            `
        )
        return NextResponse.json({ message: datos })
    } catch (error) {
        console.error(error)
        return NextResponse.json({ error: 'Ha habido un error en la peticion' }, { status: 500 })
    }
}