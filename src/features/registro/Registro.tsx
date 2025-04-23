import { useState } from "react";
import { MainLayout } from "../../layout";

type BusinessData = {
  name: string;
  description: string;
  sector: string;
  latitude: string;
  longitude: string;
};

const Register = () => {
  const [formData, setFormData] = useState<BusinessData>({
    name: "",
    description: "",
    sector: "",
    latitude: "",
    longitude: "",
  });

  const [statusMessage, setStatusMessage] = useState("");

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const businessToSend = {
      name: formData.name,
      description: formData.description,
      sectors: [formData.sector],
      latitude: parseFloat(formData.latitude),
      longitude: parseFloat(formData.longitude),
    };

    try {
      const response = await fetch("http://localhost:3000/api/business/addBusiness", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(businessToSend),
      });

      if (!response.ok) throw new Error("Error al registrar el negocio");

      setStatusMessage("Negocio registrado con éxito");
      setFormData({
        name: "",
        description: "",
        sector: "",
        latitude: "",
        longitude: "",
      });
    } catch (err) {
      console.error(err);
      setStatusMessage("Error al registrar el negocio");
    }
  };

  return (
    <MainLayout>
      <div className="flex justify-center mt-6">
        <img
          src="src/assets/img/mapamask-logo.png"
          alt="Logo"
          className="w-24 h-24 object-contain mb-4"
        />
      </div>

      <div className="flex justify-center mb-6">
        <h2 className="text-2xl font-bold text-[#804617]">Registrar Negocio</h2>
      </div>

      <form
        onSubmit={handleSubmit}
        className="w-105 mx-auto bg-white p-6 space-x-1 rounded-lg shadow border border-[#804617]"
      >
        <div className="mb-4">
          <input
            type="text"
            name="name"
            value={formData.name}
            onChange={handleChange}
            placeholder="Nombre del negocio"
            className="w-full p-3 border border-[#804617] rounded-lg bg-white text-[#804617] focus:outline-none"
            required
          />
        </div>

        <div className="mb-4">
          <textarea
            name="description"
            value={formData.description}
            onChange={handleChange}
            placeholder="Descripción breve"
            rows={3}
            className="w-full p-3 border border-[#804617] rounded-lg bg-white text-[#804617] focus:outline-none"
            required
          ></textarea>
        </div>

        <div className="mb-4">
          <select
            name="sector"
            value={formData.sector}
            onChange={handleChange}
            className="w-full p-3 border border-[#804617] rounded-lg bg-white text-[#804617] focus:outline-none"
            required
          >
            <option value="">Selecciona un sector</option>
            <option value="fashionaccesories">Accesorios de moda</option>
            <option value="professional">Profesional</option>
            <option value="businessretail">Minoristas</option>
            <option value="health">Salud</option>
          </select>
        </div>

        <div className="mb-4">
          <input
            type="text"
            name="latitude"
            value={formData.latitude}
            onChange={handleChange}
            placeholder="Latitud"
            className="w-full p-3 border border-[#804617] rounded-lg bg-white text-[#804617] focus:outline-none"
            required
          />
        </div>

        <div className="mb-4">
          <input
            type="text"
            name="longitude"
            value={formData.longitude}
            onChange={handleChange}
            placeholder="Longitud"
            className="w-full p-3 border border-[#804617] rounded-lg bg-white text-[#804617] focus:outline-none"
            required
          />
        </div>

        <button
          type="submit"
          className="w-full bg-[#804617] hover:bg-[#a65c2a] text-white font-bold py-3 rounded-lg transition duration-200"
        >
          Registrar
        </button>

        {statusMessage && (
          <p className="text-center mt-4 text-[#804617] font-semibold">
            {statusMessage}
          </p>
        )}
      </form>
    </MainLayout>
  );
};

export default Register;