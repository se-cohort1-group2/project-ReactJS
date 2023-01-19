import { useState, useEffect } from "react";
import { Marker, Popup, useMap, Circle } from "react-leaflet";

function DetectLocationMarker({ LocationDetected, setLocationDetected }) {

    const [position, setPosition] = useState(null);

    const map = useMap();
    useEffect(() => {
        if (LocationDetected) {
            map.locate().on("locationfound", function (e) {
                setPosition(e.latlng);
                map.flyTo(e.latlng, 15);
            })
            setLocationDetected(false);
        }
    }, [LocationDetected, setLocationDetected, map, position])
}

export default DetectLocationMarker; 