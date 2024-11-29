"use client";

import { useState, useEffect } from "react";
import axios from "axios";

export default function CompitenFormSimple() {
  const [formData, setFormData] = useState({
    numEncuentroFK: "",
    numEquipoFK: "",
    golEquipo: "",
  });
  const [message, setMessage] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [encuentro, setEncuentro] = useState([]);
  const [equipo, setEquipo] = useState([]);
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevState) => ({
      ...prevState,
      [name]: value === "" ? "" : parseInt(value, 10),
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    try {
      const response = await axios.post("/api/compiten", formData);
      setMessage("Registro de Compiten creado exitosamente");
      // Limpiar el formulario después de un envío exitoso
      setFormData({
        numEncuentroFK: "",
        numEquipoFK: "",
        golEquipo: "",
      });
    } catch (error) {
      setMessage(
        "Error al crear el registro de Compiten: " + error.message
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
    const fetchEquipo = async () => {
      try {
        const data = await axios.get("/api/equipos");
        setEquipo(data?.data?.message?.recordsets);
        console.log(data);
      } catch (error) {}
    };
    fetchEquipo();
  }, []);

  return (
    <div className="max-w-md mx-auto mt-10 p-6 bg-white rounded-lg shadow-md">
      <h2 className="text-2xl font-bold mb-6 text-gray-800">
        Crear Registro de Compiten
      </h2>
      <form onSubmit={handleSubmit} className="space-y-4">
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
            placeholder="Ingrese el número del encuentro"
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
        <div>
          <label
            htmlFor="numEquipoFK"
            className="block text-sm font-medium text-gray-700 mb-1"
          >
            Nombre Equipo
          </label>
          {/* <input
            id="numEquipoFK"
            type="number"
            name="numEquipoFK"
            value={formData.numEquipoFK}
            onChange={handleChange}
            required
            min="1"
            className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
            placeholder="Ingrese el número del equipo"
          /> */}
          <select
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            id="numEquipoFK"
            name="numEquipoFK"
            value={formData.numEquipoFK}
            onChange={handleChange}
            required
          >
            <option value="">Elegir Equipo</option>
            {equipo?.[0]?.map((equipo) => (
              <option key={equipo.NumEquipo} value={equipo.NumEquipo}>
                {equipo.NombreEquipo}
              </option>
            ))}
          </select>
        </div>
        <div>
          <label
            htmlFor="golEquipo"
            className="block text-sm font-medium text-gray-700 mb-1"
          >
            Goles del Equipo
          </label>
          <input
            id="golEquipo"
            type="number"
            name="golEquipo"
            value={formData.golEquipo}
            onChange={handleChange}
            required
            min="0"
            max="10"
            className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
            placeholder="Ingrese la cantidad de goles"
          />
        </div>
        <button
          type="submit"
          disabled={isLoading}
          className="w-full py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {isLoading ? "Creando..." : "Crear Registro de Compiten"}
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
