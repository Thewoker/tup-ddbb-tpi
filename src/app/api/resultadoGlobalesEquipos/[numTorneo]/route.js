import { NextResponse } from 'next/server'
import { getConnection, mssql } from '@/config/conn'

export async function GET(req, { params }) {
    try {
        const { numTorneo } = await params
        const pool = await getConnection()

        const datos = await pool.request()
            .input('NumTorneo', mssql.Int, numTorneo)
            .query(`
            SELECT 
    EQ.Nombre AS NombreEquipo,
    COUNT(CASE WHEN Cmp.GolEquipo > CmpRival.GolEquipo THEN 1 END) AS PartidosGanados,
    COUNT(CASE WHEN Cmp.GolEquipo < CmpRival.GolEquipo THEN 1 END) AS PartidosPerdidos,
    COUNT(CASE WHEN Cmp.GolEquipo = CmpRival.GolEquipo THEN 1 END) AS PartidosEmpatados,
    SUM(Cmp.GolEquipo) AS GolesAnotados,
    SUM(CmpRival.GolEquipo) AS GolesRecibidos
FROM 
    Torneo T
    INNER JOIN Rueda R ON T.NumTorneo = R.NumTorneo
    INNER JOIN Encuentro E ON R.IDRueda = E.IDRuedaFk
    INNER JOIN Compiten Cmp ON E.NumEncuentro = Cmp.NumEncuentroFK
    INNER JOIN Compiten CmpRival ON Cmp.NumEncuentroFK = CmpRival.NumEncuentroFK AND Cmp.NumEquipoFK != CmpRival.NumEquipoFK
    INNER JOIN Equipo EQ ON Cmp.NumEquipoFK = EQ.NumEquipo
WHERE 
    T.NumTorneo = @NumTorneo
GROUP BY 
    EQ.Nombre
ORDER BY 
    PartidosGanados;
            `
            )
        return NextResponse.json({ message: datos })
    } catch (error) {
        console.error(error)
        return NextResponse.json({ error: 'Ha habido un error en la peticion' }, { status: 500 })
    }
}