import { NextResponse } from 'next/server'
import { getConnection, mssql } from '@/config/conn'

export async function GET(req, res) {
    try {
        const pool = await getConnection()

        const datos = await pool.request().query('SELECT GETDATE()')
        return NextResponse.json({message:datos})
    } catch (error) {
        return NextResponse.json(error.message)
    }
}