"use client";

import { useState, useEffect } from "react";
import axios from "axios";

export default function PlayerForm() {
  const [formData, setFormData] = useState({
    dni: "",
    nombre: "",
    apellido: "",
    fechaNacimiento: "",
    telefono: "",
    direccion: "",
    categoria: "",
    numEquipoFK: "",
    foto: "",
    pass: "",
  });
  const [message, setMessage] = useState("");
  const [equipos, setEquipos] = useState([]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevState) => ({
      ...prevState,
      [name]:
        name === "dni" || name === "numEquipoFK"
          ? parseInt(value) || ""
          : value,
    }));

    if (name === "fechaNacimiento") {
      const categoria = calcularCategoria(value);
      setFormData((prevState) => ({
        ...prevState,
        categoria,
      }));
    }
  };

  const calcularCategoria = (fechaNacimiento) => {
    const hoy = new Date();
    const fechaNac = new Date(fechaNacimiento);
    let edad = hoy.getFullYear() - fechaNac.getFullYear();
    const mes = hoy.getMonth() - fechaNac.getMonth();

    if (
      mes < 0 ||
      (mes === 0 && hoy.getDate() < fechaNac.getDate())
    ) {
      edad--;
    }

    if (edad >= 41 && edad <= 45) return "Maxi";
    if (edad >= 46 && edad <= 50) return "Super";
    if (edad >= 51 && edad <= 55) return "Master";
    return "";
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setFormData((prevState) => ({
          ...prevState,
          foto: reader.result,
        }));
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post("/api/jugadores", formData);
      setMessage("Jugador creado exitosamente");
      // Limpiar el formulario después de un envío exitoso
      setFormData({
        dni: "",
        nombre: "",
        apellido: "",
        fechaNacimiento: "",
        telefono: "",
        direccion: "",
        categoria: "",
        numEquipoFK: "",
        foto: "",
        pass: "",
      });
    } catch (error) {
      setMessage("Error al crear el jugador: " + error.message);
    }
  };

  useEffect(() => {
    const fetchEquipo = async () => {
      try {
        const data = await axios.get("/api/equipos");
        setEquipos(data?.data?.message?.recordsets);
      } catch (error) {}
    };
    fetchEquipo();
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
            htmlFor="dni"
          >
            DNI
          </label>
          <input
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            id="dni"
            type="number"
            name="dni"
            value={formData.dni}
            onChange={handleChange}
            required
          />
        </div>
        <div className="mb-4">
          <label
            className="block text-gray-700 text-sm font-bold mb-2"
            htmlFor="nombre"
          >
            Nombre
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
          <label
            className="block text-gray-700 text-sm font-bold mb-2"
            htmlFor="apellido"
          >
            Apellido
          </label>
          <input
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            id="apellido"
            type="text"
            name="apellido"
            value={formData.apellido}
            onChange={handleChange}
            required
          />
        </div>
        <div className="mb-4">
          <label
            className="block text-gray-700 text-sm font-bold mb-2"
            htmlFor="fechaNacimiento"
          >
            Fecha de Nacimiento
          </label>
          <input
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            id="fechaNacimiento"
            type="date"
            name="fechaNacimiento"
            value={formData.fechaNacimiento}
            onChange={handleChange}
            required
          />
        </div>
        <div className="mb-4">
          <label
            className="block text-gray-700 text-sm font-bold mb-2"
            htmlFor="telefono"
          >
            Teléfono
          </label>
          <input
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            id="telefono"
            type="tel"
            name="telefono"
            value={formData.telefono}
            onChange={handleChange}
            required
          />
        </div>
        <div className="mb-4">
          <label
            className="block text-gray-700 text-sm font-bold mb-2"
            htmlFor="direccion"
          >
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
        <div className="mb-4">
          <label
            className="block text-gray-700 text-sm font-bold mb-2"
            htmlFor="categoria"
          >
            Categoría
          </label>
          <input
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            id="categoria"
            type="text"
            name="categoria"
            value={formData.categoria}
            readOnly
          />
        </div>
        <div className="mb-4">
          <label
            className="block text-gray-700 text-sm font-bold mb-2"
            htmlFor="numEquipoFK"
          >
            Número de Equipo
          </label>
          <select
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            id="numEquipoFK"
            name="numEquipoFK"
            value={formData.numEquipoFK}
            onChange={handleChange}
            required
          >
            <option value="">Elegir Equipo</option>
            {equipos?.[0]?.map((equipo) => (
              <option key={equipo.NumEquipo} value={equipo.NumEquipo}>
                {equipo.NombreEquipo}
              </option>
            ))}
          </select>
        </div>
        <div className="mb-4">
          <label
            className="block text-gray-700 text-sm font-bold mb-2"
            htmlFor="foto"
          >
            Foto
          </label>
          <input
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            id="foto"
            type="text"
            name="foto"
            value={formData.foto}
            onChange={handleChange}
            required
          />
        </div>
        <div className="mb-6">
          <label
            className="block text-gray-700 text-sm font-bold mb-2"
            htmlFor="pass"
          >
            Contraseña
          </label>
          <input
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline"
            id="pass"
            type="password"
            name="pass"
            value={formData.pass}
            onChange={handleChange}
            required
          />
        </div>
        <div className="flex items-center justify-between">
          <button
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
            type="submit"
          >
            Crear Jugador
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
        >
          {message}
        </div>
      )}
    </div>
  );
}
