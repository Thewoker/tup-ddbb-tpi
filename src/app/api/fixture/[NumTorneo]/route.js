import { NextResponse } from 'next/server'
import { getConnection, mssql } from '@/config/conn'

export async function GET(req, { params }) {
    try {
        const { NumTorneo } = await params
        const pool = await getConnection()

        const datos = await pool.request()
        .input('NumTorneo', mssql.Int, NumTorneo)
        .query(`
            SELECT 
    T.NumTorneo,
    T.InicioTorneo,
    T.FinTorneo,
    R.NumRueda,
    E.NumEncuentro,
    E.Fecha AS FechaEncuentro,
    EQ.Nombre AS NombreEquipo,
    Cmp.GolEquipo AS GolesAnotados
FROM 
    Torneo T
    INNER JOIN Rueda R ON T.NumTorneo = R.NumTorneo
    INNER JOIN Encuentro E ON R.IDRueda = E.IDRuedaFk
    INNER JOIN Cancha C ON E.NumCanchaFK = C.NumCancha
    INNER JOIN Compiten Cmp ON E.NumEncuentro = Cmp.NumEncuentroFK
    INNER JOIN Equipo EQ ON Cmp.NumEquipoFK = EQ.NumEquipo
    INNER JOIN ParticipaEnTorneo PT ON EQ.NumEquipo = PT.NumEquipoFK
WHERE 
    T.NumTorneo = @NumTorneo
ORDER BY 
    R.NumRueda, 
    E.Fecha;`
        )
        return NextResponse.json({ message: datos })
    } catch (error) {
        console.error(error)
        return NextResponse.json({ error: 'Ha habido un error en la peticion' }, { status: 500 })
    }
}