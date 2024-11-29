import { NextResponse } from 'next/server'
import { getConnection, mssql } from '@/config/conn'

export async function GET(req) {
    try {
        const pool = await getConnection()

        const datos = await pool.request()
            .query(`
            SELECT * FROM Encuentro ORDER BY Fecha
            `
            )
        return NextResponse.json({ datos })
    } catch (error) {
        console.error(error)
        return NextResponse.json({ error: 'Ha habido un error en la peticion' }, { status: 500 })
    }
}

export async function POST(req) {
    try {
        const body = await req.json()
        const { numCanchaFK, idRuedaFK, fecha } = body

        const pool = await getConnection()

        await pool.request()
            .input('NumCanchaFK', mssql.Int(4), numCanchaFK)
            .input('IDRuedaFK', mssql.Int(4), idRuedaFK)
            .input('Fecha', mssql.DateTime2, fecha)
            .query(`
            INSERT INTO Encuentro (NumCanchaFK, IDRuedaFK, Fecha)
            VALUES (@NumCanchaFK, @IDRuedaFK, @Fecha);
        `)
        return NextResponse.json({ message: 'Encuentro agregado correctamente' })

    } catch (error) {
        console.error(error)
        return NextResponse.json({ error: 'Ha habido un error en la peticion' }, { status: 500 })
    }
}