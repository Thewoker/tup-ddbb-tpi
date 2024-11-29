import { NextResponse } from 'next/server'
import { getConnection, mssql } from '@/config/conn'

export async function GET(req) {
    try {
        const pool = await getConnection()

        const datos = await pool.request()
            .query(`
            SELECT 
    NumEquipo,
    e.Nombre AS NombreEquipo,
    Divicion AS Division,
    Categoria,
    DNI AS DirectorTecnicoDNI,
    DT.Nombre AS DirectorTecnicoNombre,
    DT.Apellido AS DirectorTecnicoApellido
FROM 
    Equipo E
    INNER JOIN Usuario DT ON E.DNIDirectorTecnicoFK = DT.DNI
ORDER BY 
    e.Nombre;
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
        const { dniDirectorTecnicoFK, divicion, nombre, categoria, dniRepresentanteFK } = body


        const pool = await getConnection()

        await pool.request()
            .input('DNIDirectorTecnicoFK', mssql.Int(4), dniDirectorTecnicoFK)
            .input('Divicion', mssql.VarChar(20), divicion)
            .input('Nombre', mssql.VarChar(20), nombre)
            .input('Categoria', mssql.VarChar(20), categoria)
            .input('DNIRepresentanteFK', mssql.Int(4), dniRepresentanteFK)
            .query(`
            INSERT INTO Equipo (DNIDirectorTecnicoFK, Divicion, Nombre, Categoria, DNIRepresentanteFK)
            VALUES (@DNIDirectorTecnicoFK, @Divicion, @Nombre, @Categoria, @DNIRepresentanteFK);
        `)
        return NextResponse.json({ message: 'Equipo agregado correctamente' })

    } catch (error) {
        console.error(error)
        return NextResponse.json({ error: 'Ha habido un error en la peticion' }, { status: 500 })
    }
}