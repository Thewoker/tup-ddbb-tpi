import { NextResponse } from 'next/server'
import { getConnection, mssql } from '@/config/conn'

export async function POST(req) {
    try {
        const body = await req.json()
        const { numEquipoFK, numTorneoFK } = body


        const pool = await getConnection()

        await pool.request()
            .input('NumEquipoFK', mssql.Int(4), numEquipoFK)
            .input('NumTorneoFK', mssql.Int(4), numTorneoFK)
            .query(`
            INSERT INTO ParticipaEnTorneo (NumEquipoFK, NumTorneoFK)
            VALUES (@NumEquipoFK, @NumTorneoFK);
        `)
        return NextResponse.json({ message: 'ParticipaEnTorneo agregado correctamente' })

    } catch (error) {
        console.error(error)
        return NextResponse.json({ error: 'Ha habido un error en la peticion' }, { status: 500 })
    }
}