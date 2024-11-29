import { NextResponse } from 'next/server'
import { getConnection, mssql } from '@/config/conn'

export async function POST(req) {
    try {
        const body = await req.json()
        const { numEncuentroFK, numEquipoFK, golEquipo } = body


        const pool = await getConnection()

        await pool.request()
            .input('NumEncuentroFK', mssql.Int, numEncuentroFK)
            .input('NumEquipoFK', mssql.Int, numEquipoFK)
            .input('GolEquipo', mssql.Int, golEquipo)
            .query(`
            INSERT INTO Compiten (NumEncuentroFK, NumEquipoFK, GolEquipo)
            VALUES (@NumEncuentroFK, @NumEquipoFK, @GolEquipo);
        `)
        return NextResponse.json({ message: 'Compiten agregado correctamente' })

    } catch (error) {
        console.error(error)
        return NextResponse.json({ error: 'Ha habido un error en la peticion' }, { status: 500 })
    }
}