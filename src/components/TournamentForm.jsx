"use client";

import { useState } from "react";
import axios from "axios";

export default function TournamentForm() {
  const [formData, setFormData] = useState({
    inicioTorneo: "",
    finTorneo: "",
    inicioInscripcion: "",
    finInscripcion: "",
    nombreTorneo: "",
  });
  const [message, setMessage] = useState("");

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post("/api/torneo", formData);
      setMessage("Torneo creado exitosamente");
      // Limpiar el formulario después de un envío exitoso
      setFormData({
        inicioTorneo: "",
        finTorneo: "",
        inicioInscripcion: "",
        finInscripcion: "",
        nombreTorneo: "",
      });
    } catch (error) {
      setMessage("Error al crear el torneo: " + error.message);
    }
  };

  return (
    <div className="max-w-md mx-auto mt-10">
      <form
        onSubmit={handleSubmit}
        className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4"
      >
        <div className="mb-4">
          <label
            className="block text-gray-700 text-sm font-bold mb-2"
            htmlFor="nombreTorneo"
          >
            Nombre del Torneo
          </label>
          <input
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            id="nombreTorneo"
            type="text"
            name="nombreTorneo"
            value={formData.nombreTorneo}
            onChange={handleChange}
            required
            aria-describedby="nombreTorneoHelp"
          />
          <p
            id="nombreTorneoHelp"
            className="text-xs text-gray-500 mt-1"
          >
            Ingrese el nombre del torneo
          </p>
        </div>
        <div className="mb-4">
          <label
            className="block text-gray-700 text-sm font-bold mb-2"
            htmlFor="inicioTorneo"
          >
            Inicio del Torneo
          </label>
          <input
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            id="inicioTorneo"
            type="datetime-local"
            name="inicioTorneo"
            value={formData.inicioTorneo}
            onChange={handleChange}
            required
            aria-describedby="inicioTorneoHelp"
          />
          <p
            id="inicioTorneoHelp"
            className="text-xs text-gray-500 mt-1"
          >
            Seleccione la fecha y hora de inicio del torneo
          </p>
        </div>
        <div className="mb-4">
          <label
            className="block text-gray-700 text-sm font-bold mb-2"
            htmlFor="finTorneo"
          >
            Fin del Torneo
          </label>
          <input
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            id="finTorneo"
            type="datetime-local"
            name="finTorneo"
            value={formData.finTorneo}
            onChange={handleChange}
            required
            aria-describedby="finTorneoHelp"
          />
          <p
            id="finTorneoHelp"
            className="text-xs text-gray-500 mt-1"
          >
            Seleccione la fecha y hora de finalización del torneo
          </p>
        </div>
        <div className="mb-4">
          <label
            className="block text-gray-700 text-sm font-bold mb-2"
            htmlFor="inicioInscripcion"
          >
            Inicio de Inscripción
          </label>
          <input
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            id="inicioInscripcion"
            type="datetime-local"
            name="inicioInscripcion"
            value={formData.inicioInscripcion}
            onChange={handleChange}
            required
            aria-describedby="inicioInscripcionHelp"
          />
          <p
            id="inicioInscripcionHelp"
            className="text-xs text-gray-500 mt-1"
          >
            Seleccione la fecha y hora de inicio de inscripciones
          </p>
        </div>
        <div className="mb-6">
          <label
            className="block text-gray-700 text-sm font-bold mb-2"
            htmlFor="finInscripcion"
          >
            Fin de Inscripción
          </label>
          <input
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            id="finInscripcion"
            type="datetime-local"
            name="finInscripcion"
            value={formData.finInscripcion}
            onChange={handleChange}
            required
            aria-describedby="finInscripcionHelp"
          />
          <p
            id="finInscripcionHelp"
            className="text-xs text-gray-500 mt-1"
          >
            Seleccione la fecha y hora de finalización de
            inscripciones
          </p>
        </div>
        <div className="flex items-center justify-between">
          <button
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
            type="submit"
          >
            Crear Torneo
          </button>
        </div>
      </form>
      {message && (
        <div
          className={`mt-4 p-4 rounded ${
            message.includes("Error")
              ? "bg-red-100 text-red-700"
              : "bg-green-100 text-green-700"
          }`}
          role="alert"
        >
          {message}
        </div>
      )}
    </div>
  );
}
