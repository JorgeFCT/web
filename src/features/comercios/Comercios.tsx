import { useState } from "react";
import BrownButton from "../../components/BrownButton";
import { MainLayout } from "../../layout";
import styles from "./Comercios.module.css";
import WebMap from "../../components/WebMap";


type Negocio = {
  id: string;
  nombre: string;
  sector: string;
  descripcion: string;
  latitude: number;
  longitude: number;
};
type BusinessAPI = {
  _id: string;
  name: string;
  description: string;
  sectors: string[];
  latitude: number;
  longitude: number;
};

export const Comercios = () => {
  const [sector, setSector] = useState("");
  const [keyword, setKeyword] = useState("");
  const [filtered, setFiltered] = useState<Negocio[]>([]);

  const handleBuscar = async () => {
    const response = await fetch("http://localhost:3000/api/business");
    const rawData: BusinessAPI[] = await response.json();

    const data: Negocio[] = rawData
      .filter((item) => item.name && item.sectors && item.description)
      .map((item) => ({
        id: item._id || "no-id",
        nombre: item.name || "",
        sector: item.sectors[0] || "",
        descripcion: item.description || "",
        latitude: item.latitude,
        longitude: item.longitude,
      }));

    const resultado = data.filter(
      (n) =>
        (sector === "" || n.sector.toLowerCase() === sector.toLowerCase()) &&
        (keyword === "" ||
          n.nombre?.toLowerCase().includes(keyword.toLowerCase()) ||
          n.sector?.toLowerCase().includes(keyword.toLowerCase()) ||
          n.descripcion?.toLowerCase().includes(keyword.toLowerCase()))
    );

    setFiltered(resultado);
  };

  return (
    <MainLayout>
      <div className={`${styles.background} py-10`}>
        <div className="container mx-auto w-4/5 max-w-screen-xl px-4">
          <div className="mt-5">
            <h1 className={`text-[27pt] font-bold ${styles.title}`}>
              El buscador de negocios
            </h1>
          </div>

          <div className="mt-2">
            <h2 className={`${styles.subtitle} font-bold`}>
              que aceptan crypto
            </h2>
          </div>

          <div className="mt-1">
            <p className="text-[15pt]">
              Empieza a usar tus criptomonedas en el mundo real.
            </p>
          </div>

          <div className="mt-10 grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="flex justify-center md:justify-start">
              <select
                className="w-full border border-gray- rounded-md p-2  bg-white"
                value={sector}
                onChange={(e) => setSector(e.target.value)}
              >
                <option value="">Todos los sectores</option>
                <option value="fashionaccesories">Accesorios de moda</option>
                <option value="professional">Profesional</option>
                <option value="businessretail">Minoristas</option>
                <option value="health">Salud</option>
              </select>
            </div>

            <div className="flex justify-center md:justify-start  bg-white">
              <input
                placeholder="Keyword…"
                type="text"
                value={keyword}
                onChange={(e) => setKeyword(e.target.value)}
                className="w-full border border-gray-300 rounded-md p-2"
              />
            </div>

            <div className="flex justify-center md:justify-start">
              <div className="grid grid-cols-2 gap-2 w-full">
                <BrownButton text="Buscar" onClick={handleBuscar} />
                <button className={`${styles.viewBtn}`}>Cambiar vista</button>
              </div>
            </div>
          </div>

          {filtered.length > 0 && (
            <div className="mt-10">
              <h3 className="text-xl font-bold mb-4">Resultados:</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {filtered.map((n) => (
                  <div key={n.id} className="border p-4 rounded hover:bg-blue-200 shadow-xl bg-white"
                  onClick={() => {
                    setKeyword(n.nombre);
                    setSector(n.sector);
                    setTimeout(() => {
                        handleBuscar();
                      }, 0);
                  }}>
                    
                    <h4 className="text-lg font-semibold">{n.nombre}</h4>
                    <p className="text-sm text-gray-500">{n.sector}</p>
                    <p>{n.descripcion}</p>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/*Mapa*/}
          <div className="pt-2 w-full h-6/6">
              <WebMap markers={filtered} selectedStyle="OpenStreetMap" />
          </div>
          
        </div>
      </div>
    </MainLayout>
  );
};