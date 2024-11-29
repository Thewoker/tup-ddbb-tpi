'use client'

import { useState } from 'react'
import axios from 'axios'

export default function CanchaForm() {
  const [formData, setFormData] = useState({
    nombreCancha: '',
    direccion: ''
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
      const response = await axios.post('/api/cancha', formData)
      setSuccess(true)
      setFormData({
        nombreCancha: '',
        direccion: ''
      })
    } catch (err) {
      setError('Error al crear la cancha. Por favor, intente nuevamente.')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="max-w-md mx-auto mt-10">
      <form onSubmit={handleSubmit} className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4">
        <h2 className="text-2xl font-bold mb-6 text-center">Crear Nueva Cancha</h2>
        
        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="nombreCancha">
            Nombre de la Cancha
          </label>
          <input
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            id="nombreCancha"
            type="text"
            name="nombreCancha"
            value={formData.nombreCancha}
            onChange={handleChange}
            required
          />
        </div>
        
        <div className="mb-6">
          <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="direccion">
            Dirección
          </label>
          <input
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            id="direccion"
            type="text"
            name="direccion"
            value={formData.direccion}
            onChange={handleChange}
            required
          />
        </div>
        
        {error && <p className="text-red-500 text-xs italic mb-4">{error}</p>}
        {success && <p className="text-green-500 text-xs italic mb-4">Cancha creada exitosamente.</p>}
        
        <div className="flex items-center justify-between">
          <button
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
            type="submit"
            disabled={loading}
          >
            {loading ? 'Creando...' : 'Crear Cancha'}
          </button>
        </div>
      </form>
    </div>
  )
}

