'use client'

import { useState } from 'react'
import axios from 'axios'

export default function EquipoForm() {
  const [formData, setFormData] = useState({
    dniDirectorTecnicoFK: '',
    divicion: '',
    nombre: '',
    categoria: '',
    dniRepresentanteFK: ''
  })
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')
  const [success, setSuccess] = useState(false)

  const handleChange = (e) => {
    const { name, value } = e.target
    setFormData(prev => ({
      ...prev,
      [name]: value
    }))
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setLoading(true)
    setError('')
    setSuccess(false)

    try {
      const response = await axios.post('/api/equipos', {
        ...formData,
        dniDirectorTecnicoFK: parseInt(formData.dniDirectorTecnicoFK),
        dniRepresentanteFK: parseInt(formData.dniRepresentanteFK)
      })
      setSuccess(true)
      setFormData({
        dniDirectorTecnicoFK: '',
        divicion: '',
        nombre: '',
        categoria: '',
        dniRepresentanteFK: ''
      })
    } catch (err) {
      setError('Error al crear el equipo. Por favor, intente nuevamente.')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="max-w-md mx-auto mt-10">
      <form onSubmit={handleSubmit} className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4">
        <h2 className="text-2xl font-bold mb-6 text-center">Crear Nuevo Equipo</h2>
        
        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="dniDirectorTecnicoFK">
            DNI Director Técnico
          </label>
          <input
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            id="dniDirectorTecnicoFK"
            type="number"
            name="dniDirectorTecnicoFK"
            value={formData.dniDirectorTecnicoFK}
            onChange={handleChange}
            required
          />
        </div>
        
        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="divicion">
            División
          </label>
          <input
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            id="divicion"
            type="text"
            name="divicion"
            value={formData.divicion}
            onChange={handleChange}
            required
          />
        </div>
        
        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="nombre">
            Nombre del Equipo
          </label>
          <input
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            id="nombre"
            type="text"
            name="nombre"
            value={formData.nombre}
            onChange={handleChange}
            required
          />
        </div>
        
        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="categoria">
            Categoría
          </label>
          <select
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            id="categoria"
            name="categoria"
            value={formData.categoria}
            onChange={handleChange}
            required
          >
            <option value="">Seleccione una categoría</option>
            <option value="maxi">Maxi</option>
            <option value="super">Super</option>
            <option value="master">Master</option>
          </select>
        </div>
        
        <div className="mb-6">
          <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="dniRepresentanteFK">
            DNI Representante
          </label>
          <input
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            id="dniRepresentanteFK"
            type="number"
            name="dniRepresentanteFK"
            value={formData.dniRepresentanteFK}
            onChange={handleChange}
            required
          />
        </div>
        
        {error && <p className="text-red-500 text-xs italic mb-4">{error}</p>}
        {success && <p className="text-green-500 text-xs italic mb-4">Equipo creado exitosamente.</p>}
        
        <div className="flex items-center justify-between">
          <button
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
            type="submit"
            disabled={loading}
          >
            {loading ? 'Creando...' : 'Crear Equipo'}
          </button>
        </div>
      </form>
    </div>
  )
}

