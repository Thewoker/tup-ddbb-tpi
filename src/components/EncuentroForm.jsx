"use client";

import { useState, useEffect } from "react";
import axios from "axios";

export default function EncuentroForm() {
  const [formData, setFormData] = useState({
    numCanchaFK: "",
    idRuedaFK: "",
    fecha: "",
  });
  const [message, setMessage] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [cancha, setCancha] = useState([]);
  const [rueda, setRueda] = useState([]);
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevState) => ({
      ...prevState,
      [name]:
        name === "numCanchaFK" || name === "idRuedaFK"
          ? value === ""
            ? ""
            : parseInt(value, 10)
          : value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    try {
      const response = await axios.post("/api/encuentro", formData);
      setMessage("Encuentro creado exitosamente");
      setFormData({
        numCanchaFK: "",
        idRuedaFK: "",
        fecha: "",
      });
    } catch (error) {
      setMessage("Error al crear el encuentro: " + error.message);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    const fetchCancha = async () => {
      try {
        const data = await axios.get("/api/cancha");
        setCancha(data?.data?.datos?.recordsets);
        console.log(data);
      } catch (error) {}
    };
    fetchCancha();
  }, []);

  useEffect(() => {
    const fetchRueda = async () => {
      try {
        const data = await axios.get(`/api/ruedas${NumRueda}`); // no funciona no (como no tiene la peticion get en el primer path creo yo)
        setRueda(data?.data?.datos?.recordsets);
        console.log(data);
      } catch (error) {}
    };
    fetchRueda();
  }, []);

  return (
    <div className="max-w-md mx-auto mt-10 p-6 bg-white rounded-lg shadow-md">
      <h2 className="text-2xl font-bold mb-6 text-gray-800">
        Crear Nuevo Encuentro
      </h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label
            htmlFor="numCanchaFK"
            className="block text-sm font-medium text-gray-700 mb-1"
          >
            Número de Cancha
          </label>
          {/* <input
            id="numCanchaFK"
            type="number"
            name="numCanchaFK"
            value={formData.numCanchaFK}
            onChange={handleChange}
            required
            min="1"
            className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
            placeholder="Ingrese el número de cancha"
          /> */}
          <select
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            id="numCanchaFK"
            name="numCanchaFK"
            value={formData.numCanchaFK}
            onChange={handleChange}
            required
          >
            <option value="">Elegir Cancha</option>
            {cancha?.[0]?.map((cancha) => (
              <option key={cancha.NumCancha} value={cancha.NumCancha}>
                {cancha.NombreCancha}
              </option>
            ))}
          </select>
        </div>
        <div>
          <label
            htmlFor="idRuedaFK"
            className="block text-sm font-medium text-gray-700 mb-1"
          >
            Num de Rueda
          </label>
          {/* <input
            id="idRuedaFK"
            type="number"
            name="idRuedaFK"
            value={formData.idRuedaFK}
            onChange={handleChange}
            required
            min="1"
            className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
            placeholder="Ingrese el ID de la rueda"
          /> */}
          <select
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            id="idRuedaFK"
            name="idRuedaFK"
            value={formData.idRuedaFK}
            onChange={handleChange}
            required
          >
            <option value="">Elegir Rueda</option>
            {rueda?.[0]?.map((rueda) => (
              <option key={rueda.IDRueda} value={rueda.IDRueda}>
                {rueda.NumRueda}
              </option>
            ))}
          </select>
        </div>
        <div>
          <label
            htmlFor="fecha"
            className="block text-sm font-medium text-gray-700 mb-1"
          >
            Fecha y Hora del Encuentro
          </label>
          <input
            id="fecha"
            type="datetime-local"
            name="fecha"
            value={formData.fecha}
            onChange={handleChange}
            required
            className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
          />
        </div>
        <button
          type="submit"
          disabled={isLoading}
          className="w-full py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {isLoading ? "Creando..." : "Crear Encuentro"}
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
