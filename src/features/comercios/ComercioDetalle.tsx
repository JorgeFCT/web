import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { MainLayout } from "../../layout";
import WebMap from "../../components/WebMap";
import styles from "./Comercios.module.css";

type Negocio = {
    id: string;
    nombre: string;
    sector: string;
    descripcion: string;
    images: string[];
    latitude: number;
    longitude: number;
};

export const ComercioDetalle = () => {
    const { id } = useParams();
    const [negocio, setNegocio] = useState<Negocio | null>(null);

    useEffect(() => {
        const fetchNegocio = async () => {
            const res = await fetch(`http://localhost:3000/api/business/${id}`);
            const data = await res.json();

            const adaptado: Negocio = {
                id: data._id,
                nombre: data.name,
                sector: data.sectors[0],
                descripcion: data.description,
                images: data.images,
                latitude: data.latitude,
                longitude: data.longitude,
            };

            setNegocio(adaptado);
        };

        fetchNegocio();
    }, [id]);

    if (!negocio) return <div>Cargando...</div>;

    return (
        <MainLayout>
            <div className={`${styles.background} w-full py-10`}>
                <div className="container mx-auto w-4/5 max-w-screen-xl px-4">
                    <h1 className={`text-[27pt] font-bold ${styles.comercioTitle}`}>{negocio.nombre}</h1>

                    <div className="shadow-md rounded-2xl my-10 overflow-hidden">
                        <WebMap markers={[negocio]} selectedStyle="OpenStreetMap" />
                    </div>

                    <div className="bg-white rounded-xl px-9 py-5">
                        <p className={`${styles.title} text-lg mb-2 font-semibold capitalize`}>{negocio.sector}</p>

                        <p className="mb-6">{negocio.descripcion}</p>

                        {/* Mostrar imágenes */}
                        <div className="flex my-6">
                            {negocio.images.map((image, index) => (
                                <img
                                    key={index}
                                    src={image}
                                    alt={`Imagen ${index + 1}`}
                                    className="w-full max-w-xs rounded-lg"
                                />
                            ))}
                        </div>
                    </div>


                </div>
            </div>
        </MainLayout>
    );
};
