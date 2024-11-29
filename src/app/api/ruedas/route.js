import { NextResponse } from 'next/server'
import { getConnection, mssql } from '@/config/conn'

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