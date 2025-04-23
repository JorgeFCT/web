import { useState } from "react";
import BrownButton from "../../components/BrownButton";
import { MainLayout } from "../../layout";
import styles from "./Comercios.module.css";
import WebMap from "../../components/WebMap";
import { useNavigate } from "react-router-dom";
import TextInput from "../../components/TextInput";
import ViewButton from "../../components/ViewButton";


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
    const [view, setView] = useState<"list" | "map">("list");
    const navigate = useNavigate();

    const handleBuscar = async () => {
        const response = await fetch("http://localhost:3000/api/business");
        if (!response.ok) throw new Error("Error al cargar negocios");
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

    const toggleView = () => {
        setView(view === "list" ? "map" : "list");
    };

    return (
        <MainLayout>
            <div className={`${styles.background} py-10`}>
                <div className="container mx-auto w-9/10 max-w-screen-xl px-4">
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

                    <div className="mt-10 w-full">
                        <div className="flex w-full gap-0">
                            {/* SELECT */}
                            <select
                                className="basis-5/10 bg-white p-3 outline-none rounded-s-md shadow-sm w-full"
                                value={sector}
                                onChange={(e) => setSector(e.target.value)}
                            >
                                <option value="">Todos los sectores</option>
                                <option value="fashionaccesories">Accesorios de moda</option>
                                <option value="professional">Profesional</option>
                                <option value="businessretail">Minoristas</option>
                                <option value="health">Salud</option>
                            </select>

                            {/* INPUT */}
                            <TextInput
                                placeholder="Palabra clave..."
                                value={keyword}
                                onChange={(e) => setKeyword(e.target.value)}
                                className="basis-4/10 bg-white p-3 shadow-sm w-full"
                            />

                            {/* BOTÓN */}
                            <BrownButton
                                text="Buscar"
                                onClick={handleBuscar}
                                className="p-3 basis-2/10 rounded-e-md shadow-md"
                            />
                        </div>
                    </div>



                    <div className="mt-5 w-full">
                        <ViewButton
                            text={`Cambiar a ${view === "list" ? "mapa" : "lista"}`}
                            onClick={toggleView}
                            className="rounded-md font-bold"
                        />
                    </div>


                    {/* Vista dinámica */}
                    {filtered.length > 0 && (
                        <>
                            <div className="mt-8 rounded-2xl shadow-md overflow-hidden">
                                <div className={`text-white px-6 py-3 flex items-center justify-between ${styles.barraResultados}`}>
                                    <h3 className="text-xl font-bold">Resultados encontrados</h3>
                                    <span className="text-sm text-white/80">{filtered.length} resultados</span>
                                </div>

                                {view === "list" ? (
                                    <div className="max-h-[500px] overflow-y-auto bg-white px-4 py-6 space-y-4">
                                        {filtered.map((n) => (
                                            <div
                                                key={n.id}
                                                className="w-full bg-gray-50 shadow-2xl rounded-xl  p-4 hover:bg-gray-200 transition cursor-pointer"
                                                onClick={() => navigate(`/comercios/${n.id}`)}
                                            >
                                                <h4 className="text-lg font-semibold text-brown-700 mb-1">{n.nombre}</h4>
                                                <span className="block text-brown-100 text-sm font-medium px-3 py-1 rounded mb-2 w-max capitalize">
                                                    {n.sector}
                                                </span>
                                                <p className="text-gray-600 text-sm leading-relaxed">{n.descripcion}</p>
                                            </div>
                                        ))}
                                    </div>
                                ) : (
                                    <div className="shadow-md rounded-b">
                                        <WebMap markers={filtered} selectedStyle="OpenStreetMap" />
                                    </div>
                                )}
                            </div>
                        </>
                    )}

                </div>
            </div>
        </MainLayout>
    );
};