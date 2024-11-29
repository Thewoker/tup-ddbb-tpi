import { NextResponse } from 'next/server'
import { getConnection, mssql } from '@/config/conn'

export async function GET(req, { params }) {
    try {
        const pool = await getConnection()

        const datos = await pool.request()
            .query(`
            SELECT 
    T.NumTorneo,
    T.InicioTorneo,
    T.FinTorneo,
    R.NumRueda,
    E.NumEncuentro,
    E.Fecha AS FechaEncuentro,
    C.NombreCancha AS Cancha,
    EQ1.Nombre AS Equipo1,
    Cmp1.GolEquipo AS GolesEquipo1,
    EQ2.Nombre AS Equipo2,
    Cmp2.GolEquipo AS GolesEquipo2
FROM 
    Torneo T
    INNER JOIN Rueda R ON T.NumTorneo = R.NumTorneo
    INNER JOIN Encuentro E ON R.IDRueda = E.IDRuedaFk
    INNER JOIN Cancha C ON E.NumCanchaFK = C.NumCancha
    INNER JOIN Compiten Cmp1 ON E.NumEncuentro = Cmp1.NumEncuentroFK
    INNER JOIN Equipo EQ1 ON Cmp1.NumEquipoFK = EQ1.NumEquipo
    INNER JOIN Compiten Cmp2 ON E.NumEncuentro = Cmp2.NumEncuentroFK AND Cmp1.NumEquipoFK < Cmp2.NumEquipoFK
    INNER JOIN Equipo EQ2 ON Cmp2.NumEquipoFK = EQ2.NumEquipo
ORDER BY 
    R.NumRueda, 
    E.Fecha;
            `
            )
        return NextResponse.json({ message: datos })
    } catch (error) {
        console.error(error)
        return NextResponse.json({ error: 'Ha habido un error en la peticion' }, { status: 500 })
    }
}