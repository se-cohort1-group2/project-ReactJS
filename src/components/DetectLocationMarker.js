import { useState, useEffect } from "react"; 
import { Marker, Popup, useMap, Circle } from "react-leaflet"; 
import { Icon } from "leaflet"; 

import DefaultMarkerIconBlue from "../images/DefaultMarkerIconBlue.png"; 

function DetectLocationMarker({ LocationDetected, setLocationDetected, flyToZoom }) {

    const [position, setPosition] = useState(null);

    const map = useMap();
    useEffect(() => {
        if (LocationDetected) {
            map.locate().on("locationfound", function(e) {
                setPosition(e.latlng); 
                setRadius(e.accuracy); 
                // console.log("Coordinates", e.latlng)
                // console.log("Accuracy", e.accuracy)
                map.flyTo(e.latlng, flyToZoom); 
            })
            setLocationDetected(false);
        }

    }, [LocationDetected, setLocationDetected, map, position])
}

export default DetectLocationMarker; 