import { NextResponse } from 'next/server'
import { getConnection, mssql } from '@/config/conn'

export async function GET(req, { params }) {
    try {
        const pool = await getConnection()

        const datos = await pool.request()
            .query(`
            SELECT 
    DNI,
    Nombre,
    Apellido,
    FechaNacimiento,
    Telefono,
    Direccion,
    Experiencia,
    CASE 
        WHEN Certificado = 1 THEN 'Sí'
        ELSE 'No'
    END AS Certificado
FROM 
    Arbitro
ORDER BY 
    Nombre, Apellido;
            `
            )
        return NextResponse.json({ message: datos })
    } catch (error) {
        console.error(error)
        return NextResponse.json({ error: 'Ha habido un error en la peticion' }, { status: 500 })
    }
}

export async function POST(req) {
    try {
        const body = await req.json()
        const { dni, nombre, apellido, fechaNacimiento, telefono, direccion, experiencia, certificado, pass } = body

        console.log(dni, nombre, apellido, fechaNacimiento, telefono, direccion, experiencia, certificado, pass)


        const pool = await getConnection()

        await pool.request()
        .input('DNI', mssql.Int(4), dni)
        .input('Nombre', mssql.VarChar(50), nombre)
        .input('Apellido', mssql.VarChar(50), apellido)
        .input('FechaNacimiento', mssql.DateTime2, fechaNacimiento)
        .input('Telefono', mssql.VarChar(20), telefono)
        .input('Direccion', mssql.VarChar(100), direccion)
        .input('Experiencia', mssql.Int(3), experiencia)
        .input('Certificado', mssql.Int(3), certificado)
        .input('Contrasenia', mssql.VarChar(100), pass)
        .query(`
            INSERT INTO Arbitro (DNI, Nombre, Apellido, FechaNacimiento, Telefono, Direccion, Experiencia, Certificado, Contrasenia)
            VALUES (@DNI, @Nombre, @Apellido, @FechaNacimiento, @Telefono, @Direccion, @Experiencia, @Certificado, @Contrasenia);
        `)
        return NextResponse.json({ message: 'Arbitro agregado correctamente' })
        
    } catch (error) {
        console.error(error)
        return NextResponse.json({ error: 'Ha habido un error en la peticion' }, { status: 500 })
    }
}