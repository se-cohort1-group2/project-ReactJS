import { useState, useEffect } from "react"; 
import { useMapEvents } from "react-leaflet"; 

function MapZoom({ initialZoom }) {

    const [ZoomLevel, setZoomLevel] = useState(initialZoom); 

    useEffect(() => {
        console.log("initialZoom", initialZoom)
    }, [initialZoom])

    const mapEvents = useMapEvents({
        zoomend: () => {
            setZoomLevel(mapEvents.getZoom())
            console.log("ZoomLevel", ZoomLevel)
        }
    })

    return null; 
}

export default MapZoom; 