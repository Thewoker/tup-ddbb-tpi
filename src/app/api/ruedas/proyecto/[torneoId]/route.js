import { NextResponse } from 'next/server'
import { getConnection, mssql } from '@/config/conn'

export async function GET(req, { params }) {
    try {
        const { torneoId } = await params
        const pool = await getConnection()

        const datos = await pool.request()
            .input('TorneoId', mssql.Int, torneoId)
            .query(`
            SELECT 
    IDRueda,
    NumTorneo,
    NumRueda
FROM 
    Rueda
WHERE 
    NumTorneo = @TorneoId
ORDER BY 
    NumRueda;
            `
            )
        return NextResponse.json({ message: datos })
    } catch (error) {
        console.error(error)
        return NextResponse.json({ error: 'Ha habido un error en la peticion' }, { status: 500 })
    }
}

