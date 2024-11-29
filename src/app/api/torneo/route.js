import { NextResponse } from 'next/server'
import { getConnection, mssql } from '@/config/conn'

export async function GET(req) {
    try {
        const pool = await getConnection()

        const datos = await pool.request()
            .query(`
            SELECT * FROM Torneo ORDER BY InicioTorneo, FinTorneo
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
        const {inicioTorneo, finTorneo, inicioInscripcion, finInscripcion, nombreTorneo} = body


        const pool = await getConnection()

        await pool.request()
            .input('InicioTorneo', mssql.DateTime2, inicioTorneo)
            .input('FinTorneo', mssql.DateTime2, finTorneo)
            .input('InicioInscrpcion', mssql.DateTime2, inicioInscripcion)
            .input('FinInscrpcion', mssql.DateTime2, finInscripcion)
            .input('NombreTorneo', mssql.VarChar(20), nombreTorneo)
            .query(`
            INSERT INTO Torneo (InicioTorneo, FinTorneo, InicioInscrpcion, FinInscrpcion, NombreTorneo)
            VALUES (@InicioTorneo, @FinTorneo, @InicioInscrpcion, @FinInscrpcion, @NombreTorneo);
        `)
        return NextResponse.json({ message: 'Torneo agregado correctamente' })

    } catch (error) {
        console.error(error)
        return NextResponse.json({ error: 'Ha habido un error en la peticion' }, { status: 500 })
    }
}