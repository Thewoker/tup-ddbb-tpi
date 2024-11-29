import { NextResponse } from 'next/server'
import { getConnection, mssql } from '@/config/conn'

export async function POST(req) {
    try {
        const body = await req.json()
        const { numEncuentroFK, dniArbitroFK } = body


        const pool = await getConnection()

        await pool.request()
            .input('NumEncuentroFK', mssql.Int(4), numEncuentroFK)
            .input('DNIarbitroFK', mssql.Int(4), dniArbitroFK)
            .query(`
            INSERT INTO Arbitraje (NumEncuentroFK, DNIarbitroFK)
            VALUES (@NumEncuentroFK, @DNIarbitroFK);
        `)
        return NextResponse.json({ message: 'Arbitraje agregado correctamente' })

    } catch (error) {
        console.error(error)
        return NextResponse.json({ error: 'Ha habido un error en la peticion' }, { status: 500 })
    }
}