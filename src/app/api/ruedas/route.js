import { NextResponse } from 'next/server'
import { getConnection, mssql } from '@/config/conn'

export async function GET(req, { params }) {
    try {
        const pool = await getConnection()

        const datos = await pool.request()
            .query(`
                SELECT 
    T.NumTorneo,
    T.NombreTorneo,
    T.InicioTorneo,
    T.FinTorneo,
    R.IDRueda,
    R.NumRueda
FROM 
    Torneo T
INNER JOIN 
    Rueda R ON T.NumTorneo = R.NumTorneo
ORDER BY 
    T.NumTorneo, 
    R.NumRueda;
            `)

        return NextResponse.json(datos)

    } catch (error) {
        console.error(error)
        return NextResponse.json({ error: 'Ha habido un error en la peticion' }, { status: 500 })
    }
}

export async function POST(req) {
    try {
        const body = await req.json()
        const { numTorneo, numRueda } = body


        const pool = await getConnection()

        await pool.request()
            .input('NumTorneo', mssql.Int(4), numTorneo)
            .input('NumRueda', mssql.Int(4), numRueda)
            .query(`
            INSERT INTO Rueda (NumTorneo, NumRueda)
            VALUES (@NumTorneo, @NumRueda);
        `)
        return NextResponse.json({ message: 'Rueda agregado correctamente' })

    } catch (error) {
        console.error(error)
        return NextResponse.json({ error: 'Ha habido un error en la peticion' }, { status: 500 })
    }
}

