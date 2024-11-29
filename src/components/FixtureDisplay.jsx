'use client'

import { useState, useEffect } from 'react'
import axios from 'axios'


export default function FixtureDisplay() {
    const [fixtures, setFixtures] = useState([])
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState('')

    useEffect(() => {
        const fetchFixtures = async () => {
            try {
                const response = await axios.get('/api/fixture')
                setFixtures(response.data.message.recordset)
            } catch (err) {
                setError('Error al cargar los datos del fixture')
            } finally {
                setLoading(false)
            }
        }

        fetchFixtures()
    }, [])

    if (loading) return <div className="text-center">Cargando...</div>
    if (error) return <div className="text-center text-red-500">{error}</div>
    if (fixtures.length === 0) return <div className="text-center">No hay datos disponibles</div>

    return (
        <div className="space-y-8">
            {fixtures.map((fixture, index) => (
                <div key={index} className="bg-white shadow-md rounded-lg p-6">
                    <div className="grid grid-cols-2 gap-4 mb-4">
                        <div>
                            <p className="font-semibold">Número de Torneo:</p>
                            <p>{fixture.NumTorneo}</p>
                        </div>
                        <div>
                            <p className="font-semibold">Número de Rueda:</p>
                            <p>{fixture.NumRueda}</p>
                        </div>
                        <div>
                            <p className="font-semibold">Inicio del Torneo:</p>
                            <p>{new Date(fixture.InicioTorneo).toLocaleDateString()}</p>
                        </div>
                        <div>
                            <p className="font-semibold">Fin del Torneo:</p>
                            <p>{new Date(fixture.FinTorneo).toLocaleDateString()}</p>
                        </div>
                    </div>

                    <div className="border-t pt-4 mt-4">
                        <h2 className="text-xl font-bold mb-2">Detalles del Encuentro</h2>
                        <div className="grid grid-cols-2 gap-4">
                            <div>
                                <p className="font-semibold">Número de Encuentro:</p>
                                <p>{fixture.NumEncuentro}</p>
                            </div>
                            <div>
                                <p className="font-semibold">Fecha del Encuentro:</p>
                                <p>{new Date(fixture.FechaEncuentro).toLocaleString()}</p>
                            </div>
                            <div>
                                <p className="font-semibold">Cancha:</p>
                                <p>{fixture.Cancha || 'No especificada'}</p>
                            </div>
                        </div>
                    </div>

                    <div className="border-t pt-4 mt-4">
                        <h2 className="text-xl font-bold mb-2">Resultado</h2>
                        <div className="flex justify-between items-center">
                            <div className="text-center">
                                <p className="font-semibold">{fixture.Equipo1}</p>
                                <p className="text-3xl font-bold">{fixture.GolesEquipo1}</p>
                            </div>
                            <div className="text-xl font-bold">VS</div>
                            <div className="text-center">
                                <p className="font-semibold">{fixture.Equipo2}</p>
                                <p className="text-3xl font-bold">{fixture.GolesEquipo2}</p>
                            </div>
                        </div>
                    </div>
                </div>
            ))}
        </div>
    )
}

