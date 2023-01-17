import { useMap } from "react-leaflet"; 

function SetView({ center, zoom }) {
    const map = useMap(); 
    // map.setView(marker, zoom); 
    map.flyTo(center, zoom); 
}

export default SetView; 