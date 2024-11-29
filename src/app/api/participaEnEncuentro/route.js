import { NextResponse } from 'next/server'
import { getConnection, mssql } from '@/config/conn'

export async function POST(req) {
    try {
        const body = await req.json()
        const { dniJugadorFK, numEncuentroFK, roja, amarilla, asistencia, gol } = body


        const pool = await getConnection()

        await pool.request()
            .input('DNIJugadorFK', mssql.Int(4), dniJugadorFK)
            .input('NumEncuentroFK', mssql.Int(4), numEncuentroFK)
            .input('Roja', mssql.Bit, roja)
            .input('Amarilla', mssql.Int(4), amarilla)
            .input('Asistencias', mssql.Int(4), asistencia)
            .input('Gol', mssql.Int(4), gol)
            .query(`
            INSERT INTO ParticipaEnEncuentro (DNIJugadorFK, NumEncuentroFK, Roja, Amarilla, Asistencias, Gol)
            VALUES (@DNIJugadorFK, @NumEncuentroFK, @Roja, @Amarilla, @Asistencias, @Gol);
        `)
        return NextResponse.json({ message: 'ParticipaEnEncuentro agregado correctamente' })

    } catch (error) {
        console.error(error)
        return NextResponse.json({ error: 'Ha habido un error en la peticion' }, { status: 500 })
    }
}