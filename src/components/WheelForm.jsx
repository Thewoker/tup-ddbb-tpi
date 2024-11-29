"use client";

import { useState, useEffect } from "react";
import axios from "axios";

export default function WheelForm() {
  const [formData, setFormData] = useState({
    numTorneo: "",
    numRueda: "",
  });
  const [message, setMessage] = useState("");
  const [torneo, setTorneo] = useState([]);
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
      const response = await axios.post("/api/ruedas", formData);
      setMessage("Rueda creada exitosamente");
      // Limpiar el formulario después de un envío exitoso
      setFormData({
        numTorneo: "",
        numRueda: "",
      });
    } catch (error) {
      setMessage("Error al crear la rueda: " + error.message);
    }
  };

  useEffect(() => {
    const fetchTorneo = async () => {
      try {
        const data = await axios.get("/api/torneo");
        setTorneo(data?.data?.datos?.recordsets);
        console.log(data);
      } catch (error) {}
    };
    fetchTorneo();
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
            htmlFor="numTorneo"
          >
            Número de Torneo
          </label>
          {/* <input
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            id="numTorneo"
            type="number"
            name="numTorneo"
            value={formData.numTorneo}
            onChange={handleChange}
            required
            min="1"
            aria-describedby="numTorneoHelp"
          /> */}
          <select
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            id="numTorneo"
            name="numTorneo"
            value={formData.numTorneo}
            onChange={handleChange}
            required
          >
            <option value="">Elegir Equipo</option>
            {torneo?.[0]?.map((torneo) => (
              <option key={torneo.NumTorneo} value={torneo.NumTorneo}>
                {torneo.NombreTorneo}
              </option>
            ))}
          </select>
          <p
            id="numTorneoHelp"
            className="text-xs text-gray-500 mt-1"
          >
            Ingrese el número del torneo asociado a esta rueda
          </p>
        </div>
        <div className="mb-6">
          <label
            className="block text-gray-700 text-sm font-bold mb-2"
            htmlFor="numRueda"
          >
            Número de Rueda
          </label>
          <input
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            id="numRueda"
            type="number"
            name="numRueda"
            value={formData.numRueda}
            onChange={handleChange}
            required
            min="1"
            aria-describedby="numRuedaHelp"
          />
          <p id="numRuedaHelp" className="text-xs text-gray-500 mt-1">
            Ingrese el número de la rueda a crear
          </p>
        </div>
        <div className="flex items-center justify-between">
          <button
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
            type="submit"
          >
            Crear Rueda
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
