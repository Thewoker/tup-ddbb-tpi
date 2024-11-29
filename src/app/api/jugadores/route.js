import { NextResponse } from 'next/server'
import { getConnection, mssql } from '@/config/conn'

export async function GET(req, { params }) {
    try {
        const pool = await getConnection()

        const datos = await pool.request()
            .query(`
            SELECT 
    J.DNI,
    J.Nombre AS NombreJugador,
    J.Apellido,
    J.FechaNacimiento,
    J.Telefono,
    J.Direccion,
    J.NumSocio,
    J.Categoria,
    COALESCE(SUM(PE.Gol), 0) AS GolesTotales,
    COALESCE(SUM(PE.Asistencias), 0) AS AsistenciasTotales,
    COALESCE(SUM(PE.Amarilla), 0) AS TarjetasAmarillas,
    COALESCE(SUM(CASE WHEN PE.Roja = 1 THEN 1 ELSE 0 END), 0) AS TarjetasRojas,
    EQ.Nombre AS NombreEquipo,
    j.Foto
FROM 
    Jugador J
    LEFT JOIN Equipo EQ ON J.NumEquipoFK = EQ.NumEquipo
    LEFT JOIN ParticipaEnEncuentro PE ON J.DNI = PE.DNIJugadorFK
GROUP BY 
    J.DNI, J.Nombre, J.Apellido, J.FechaNacimiento, J.Telefono, J.Direccion, J.NumSocio, J.Categoria, EQ.Nombre
ORDER BY 
    J.Nombre, J.Apellido;
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
        const pool = await getConnection()
        const body = await req.json()
        const { dni, nombre, apellido, fechaNacimiento, telefono, direccion, categoria, numEquipoFK, foto, pass } = body
        
        
        const result = await pool.request()
        .input('DNI', mssql.Int, dni)
        .input('NumEquipoFK', mssql.Int(4), numEquipoFK)
        .input('Nombre', mssql.VarChar(50), nombre)
        .input('Apellido', mssql.VarChar(50), apellido)
        .input('FechaNacimiento', mssql.DateTime2, fechaNacimiento)
        .input('Telefono', mssql.VarChar(15), telefono)
        .input('Direccion', mssql.VarChar(100), direccion)
        .input('Categoria', mssql.VarChar(50), categoria)
        .input('Foto', mssql.VarChar(250), foto)
        .input('Contrasenia', mssql.VarChar(50), pass)
        .query(`
        INSERT INTO Jugador (DNI, Nombre, Apellido, FechaNacimiento, Telefono, Direccion, Categoria, NumEquipoFK, Foto, Contrasenia)
        VALUES (@DNI, @Nombre, @Apellido, @FechaNacimiento, @Telefono, @Direccion, @Categoria, @NumEquipoFK, @Foto, @Contrasenia);
        `)
        
        return NextResponse.json({ message: 'Jugador agregado correctamente' })
        
    } catch (error) {
        console.error(error)
        return NextResponse.json({ error: 'Ha habido un error en la peticion' }, { status: 500 })
    }
}