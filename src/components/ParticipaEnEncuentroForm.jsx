"use client";

import { useState, useEffect } from "react";
import axios from "axios";

export default function ParticipaEnEncuentroForm() {
  const [formData, setFormData] = useState({
    dniJugadorFK: "",
    numEncuentroFK: "",
    roja: false,
    amarilla: 0,
    asistencia: 0,
    gol: 0,
  });
  const [message, setMessage] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [encuentro, setEncuentro] = useState([]);
  const [jugador, setJugador] = useState([]);
  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;

    setFormData((prevState) => ({
      ...prevState,
      [name]:
        type === "checkbox"
          ? checked
          : value === ""
          ? ""
          : parseInt(value, 10),
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    try {
      const response = await axios.post(
        "/api/participaEnEncuentro",
        formData
      );
      setMessage(
        "Participación en encuentro registrada exitosamente"
      );
      setFormData({
        dniJugadorFK: "",
        numEncuentroFK: "",
        roja: false,
        amarilla: 0,
        asistencia: 0,
        gol: 0,
      });
    } catch (error) {
      setMessage(
        "Error al registrar la participación: " + error.message
      );
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    const fetchEncuentro = async () => {
      try {
        const data = await axios.get("/api/encuentro");
        setEncuentro(data?.data?.datos?.recordsets);
        console.log(data);
      } catch (error) {}
    };
    fetchEncuentro();
  }, []);

  useEffect(() => {
    const fetchJugador = async () => {
      try {
        const data = await axios.get("/api/jugadores");
        setJugador(data?.data?.message?.recordsets);
        console.log(data);
      } catch (error) {}
    };
    fetchJugador();
  }, []);

  return (
    <div className="max-w-md mx-auto mt-10 p-6 bg-white rounded-lg shadow-md">
      <h2 className="text-2xl font-bold mb-6 text-gray-800">
        Registrar Participación en Encuentro
      </h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label
            htmlFor="dniJugadorFK"
            className="block text-sm font-medium text-gray-700 mb-1"
          >
            DNI del Jugador
          </label>
          {/* <input
            id="dniJugadorFK"
            type="number"
            name="dniJugadorFK"
            value={formData.dniJugadorFK}
            onChange={handleChange}
            required
            min="1"
            className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
            placeholder="Ingrese el DNI del jugador"
          /> */}
          <select
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            id="dniJugadorFK"
            name="dniJugadorFK"
            value={formData.dniJugadorFK}
            onChange={handleChange}
            required
          >
            <option value="">Elegir Jugador</option>
            {jugador?.[0]?.map((jugador) => (
              <option key={jugador.DNI} value={jugador.DNI}>
                {jugador.NombreJugador}
              </option>
            ))}
          </select>
        </div>
        <div>
          <label
            htmlFor="numEncuentroFK"
            className="block text-sm font-medium text-gray-700 mb-1"
          >
            Número de Encuentro
          </label>
          {/* <input
            id="numEncuentroFK"
            type="number"
            name="numEncuentroFK"
            value={formData.numEncuentroFK}
            onChange={handleChange}
            required
            min="1"
            className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
            placeholder="Ingrese el número de encuentro"
          /> */}
          <select
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            id="numEncuentroFK"
            name="numEncuentroFK"
            value={formData.numEncuentroFK}
            onChange={handleChange}
            required
          >
            <option value="">Elegir Encuentro</option>
            {encuentro?.[0]?.map((encuentro) => (
              <option
                key={encuentro.NumEncuentro}
                value={encuentro.NumEncuentro}
              >
                {encuentro.NumEncuentro}
              </option>
            ))}
          </select>
        </div>
        <div className="flex items-center">
          <input
            id="roja"
            type="checkbox"
            name="roja"
            checked={formData.roja}
            onChange={handleChange}
            className="h-4 w-4 text-indigo-600 focus:ring-indigo-500 border-gray-300 rounded"
          />
          <label
            htmlFor="roja"
            className="ml-2 block text-sm text-gray-900"
          >
            Tarjeta Roja
          </label>
        </div>
        <div>
          <label
            htmlFor="amarilla"
            className="block text-sm font-medium text-gray-700 mb-1"
          >
            Tarjetas Amarillas
          </label>
          <input
            id="amarilla"
            type="number"
            name="amarilla"
            value={formData.amarilla}
            onChange={handleChange}
            min="0"
            max="2"
            className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
            placeholder="Número de tarjetas amarillas"
          />
        </div>
        <div>
          <label
            htmlFor="asistencia"
            className="block text-sm font-medium text-gray-700 mb-1"
          >
            Asistencias
          </label>
          <input
            id="asistencia"
            type="number"
            name="asistencia"
            value={formData.asistencia}
            onChange={handleChange}
            min="0"
            max="10"
            className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
            placeholder="Número de asistencias"
          />
        </div>
        <div>
          <label
            htmlFor="gol"
            className="block text-sm font-medium text-gray-700 mb-1"
          >
            Goles
          </label>
          <input
            id="gol"
            type="number"
            name="gol"
            value={formData.gol}
            onChange={handleChange}
            min="0"
            max="10"
            className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
            placeholder="Número de goles"
          />
        </div>
        <button
          type="submit"
          disabled={isLoading}
          className="w-full py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {isLoading ? "Registrando..." : "Registrar Participación"}
        </button>
      </form>
      {message && (
        <div
          className={`mt-4 p-4 rounded-md ${
            message.includes("Error")
              ? "bg-red-100 text-red-700"
              : "bg-green-100 text-green-700"
          }`}
          role="alert"
        >
          <p>{message}</p>
        </div>
      )}
    </div>
  );
}
