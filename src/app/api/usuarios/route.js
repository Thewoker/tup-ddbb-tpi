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
	rol
FROM 
    Usuario
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

export async function POST(req, { params }) {
    try {
        const pool = await getConnection()
        const body = await req.json()
        const { dni, nombre, apellido, fechaNacimiento, telefono, direccion, rol, pass } = body

        console.log(dni, nombre, apellido, fechaNacimiento, telefono, direccion, rol, pass )

        const result = await pool.request()
        .input('DNI', mssql.Int(4), dni)
        .input('Nombre', mssql.VarChar(50), nombre)
        .input('Apellido', mssql.VarChar(50), apellido)
        .input('FechaNacimiento', mssql.DateTime2, fechaNacimiento)
        .input('Telefono', mssql.VarChar(15), telefono)
        .input('Direccion', mssql.VarChar(100), direccion)
        .input('Rol', mssql.Int(4), rol)
        .input('Contrasenia', mssql.VarChar(50), pass)
            .query(`
            INSERT INTO Usuario (DNI, Nombre, Apellido, FechaNacimiento, Telefono, Direccion, Rol, Contrasenia)
            VALUES (@DNI, @Nombre, @Apellido, @FechaNacimiento, @Telefono, @Direccion, @Rol, @Contrasenia)
            `)

        return NextResponse.json({ message: 'Usuario agregado correctamente' })

    } catch (error) {

        // console.error(error)
        return NextResponse.json({ error: 'Ha habido un error en la peticion' }, { status: 500 })
    }
}