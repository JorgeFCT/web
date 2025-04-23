import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import L from "leaflet";
import pinIconUrl from "../assets/img/pin.png";


// Tipo de props
type WebMapProps = {
    markers: {
        id: string;
        nombre: string;
        sector: string;
        descripcion: string;
        latitude: number;
        longitude: number;
    }[];
    selectedStyle: string;
};

// Estilos de mapas
const mapStyles: Record<string, string> = {
    OpenStreetMap: "https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png",
    CartoDB_Positron:
        "https://{s}.basemaps.cartocdn.com/light_all/{z}/{x}/{y}{r}.png",
    CartoDB_Dark: "https://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}{r}.png",
};

const defaultIcon = L.icon({
    iconUrl: pinIconUrl,
    iconSize: [40, 40],
    iconAnchor: [20, 40],
});


export default function WebMap({ markers, selectedStyle }: WebMapProps) {
    if (!markers.length) return <p>No hay marcadores para mostrar</p>;

    const position: [number, number] = [
        markers[0].latitude,
        markers[0].longitude,
    ];

    return (
        <div className="h-[500px] w-full">
            <MapContainer
                center={position}
                zoom={13}
                className="h-[500px] w-full"
            >
                <TileLayer url={mapStyles[selectedStyle]} />
                {markers.map((marker, index) => (
                    <Marker
                        key={index}
                        position={[marker.latitude, marker.longitude]}
                        icon={defaultIcon}
                    >
                        <Popup>
                            <strong>{marker.nombre}</strong>
                            <br />
                            {marker.descripcion}
                        </Popup>
                    </Marker>
                ))}
            </MapContainer>
        </div>
    );
    
}