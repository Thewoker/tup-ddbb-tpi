"use client";

import { useState, useEffect } from "react";
import axios from "axios";

export default function ArbitrajeForm() {
  const [formData, setFormData] = useState({
    numEncuentroFK: "",
    dniArbitroFK: "",
  });
  const [message, setMessage] = useState("");
  const [encuentro, setEncuentro] = useState([]);
  const [arbitro, setArbitro] = useState([]);
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevState) => ({
      ...prevState,
      [name]: value === "" ? "" : parseInt(value, 10),
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post("/api/arbitraje", formData);
      setMessage("Arbitraje creado exitosamente");
      // Limpiar el formulario después de un envío exitoso
      setFormData({
        numEncuentroFK: "",
        dniArbitroFK: "",
      });
    } catch (error) {
      setMessage("Error al crear el arbitraje: " + error.message);
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
    const fetchArbitro = async () => {
      try {
        const data = await axios.get("/api/arbitros");
        setArbitro(data?.data?.message?.recordsets);
        console.log(data);
      } catch (error) {}
    };
    fetchArbitro();
  }, []);
  return (
    <div className="max-w-md mx-auto mt-10">
      <form
        onSubmit={handleSubmit}
        className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4"
      >
        <div className="mb-4">
          <label
            className="block text-gray-700 text-sm font-bold mb-2"
            htmlFor="numEncuentroFK"
          >
            Número de Encuentro
          </label>
          {/* <input
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            id="numEncuentroFK"
            type="number"
            name="numEncuentroFK"
            value={formData.numEncuentroFK}
            onChange={handleChange}
            required
            min="1"
            aria-describedby="numEncuentroHelp"
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
          <p
            id="numEncuentroHelp"
            className="text-xs text-gray-500 mt-1"
          >
            Ingrese el número del encuentro asociado a este arbitraje
          </p>
        </div>
        <div className="mb-6">
          <label
            className="block text-gray-700 text-sm font-bold mb-2"
            htmlFor="dniArbitroFK"
          >
            DNI del Árbitro
          </label>
          {/* <input
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            id="dniArbitroFK"
            type="number"
            name="dniArbitroFK"
            value={formData.dniArbitroFK}
            onChange={handleChange}
            required
            min="1"
            aria-describedby="dniArbitroHelp"
          /> */}
          <select
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            id="dniArbitroFK"
            name="dniArbitroFK"
            value={formData.dniArbitroFK}
            onChange={handleChange}
            required
          >
            <option value="">Elegir Arbitro</option>
            {arbitro?.[0]?.map((arbitro) => (
              <option key={arbitro.DNI} value={arbitro.DNI}>
                {arbitro.Nombre + " " + arbitro.Apellido}
              </option>
            ))}
          </select>
          <p
            id="dniArbitroHelp"
            className="text-xs text-gray-500 mt-1"
          >
            Ingrese el DNI del árbitro asignado a este arbitraje
          </p>
        </div>
        <div className="flex items-center justify-between">
          <button
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
            type="submit"
          >
            Crear Arbitraje
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
