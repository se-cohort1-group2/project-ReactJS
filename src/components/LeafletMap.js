import "./LeafletMap.css"; 

import { MapContainer, TileLayer } from "react-leaflet"; 

function LeafletMap() {
    return (
        <>
            <MapContainer center={[1.343, 103.814]} zoom={12}>
                <TileLayer url="https://maps-{s}.onemap.sg/v3/Default/{z}/{x}/{y}.png"/>
            </MapContainer>
        </>
    )
}

export default LeafletMap; 