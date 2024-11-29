import { NextResponse } from 'next/server'
import { getConnection, mssql } from '@/config/conn'

export async function GET(req, res) {
    try {
        const pool = await getConnection()

        const datos = await pool.request().query('SELECT GETDATE()')
        return NextResponse.json({message:datos})
    } catch (error) {
        console.error(error)
        return NextResponse.json({ error: 'Ha habido un error en la peticion' }, { status: 500 })
    }
}