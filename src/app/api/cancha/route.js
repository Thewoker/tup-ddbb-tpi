import { NextResponse } from 'next/server'
import { getConnection, mssql } from '@/config/conn'

export async function GET(req) {
    try {
        const pool = await getConnection()

        const datos = await pool.request()
            .query(`
            SELECT * FROM Cancha ORDER BY NombreCancha
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
        const { nombreCancha, direccion } = body

        const pool = await getConnection()

        await pool.request()
        .input('NombreCancha', mssql.VarChar(20), nombreCancha)
        .input('Direccion', mssql.VarChar(20), direccion)
        .query(`
            INSERT INTO Cancha (NombreCancha, Direccion)
            VALUES (@NombreCancha, @Direccion);
        `)
        return NextResponse.json({ message: 'Cancha agregado correctamente' })
        
    } catch (error) {
        console.error(error)
        return NextResponse.json({ error: 'Ha habido un error en la peticion' }, { status: 500 })
    }
}