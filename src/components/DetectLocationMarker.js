import { useState, useEffect } from "react";
import { useMap, Circle, Tooltip } from "react-leaflet";
// import { Icon } from "leaflet"; 

// import DefaultMarkerIconBlue from "../images/DefaultMarkerIconBlue.png"; 

function DetectLocationMarker({ LocationDetected, setLocationDetected, flyToZoom, position, setPosition }) {

    // const [position, setPosition] = useState(null); 
    const [radius, setRadius] = useState(null);

    const map = useMap();
    useEffect(() => {
        if (LocationDetected) {
            map.locate().on("locationfound", function (e) {
                setPosition(e.latlng);
                setRadius(e.accuracy);
                // console.log("Coordinates", e.latlng)
                // console.log("Accuracy", e.accuracy)
                map.flyTo(e.latlng, flyToZoom);
            })
            setLocationDetected(false);
        }
    }, [LocationDetected, setLocationDetected, map, position, radius, flyToZoom])

    return position === null ? null : (
        <>
            <Circle center={position} radius={radius} pathOptions={{}}>
                <Tooltip sticky={true}>Your current location, accurate to {radius.toFixed(2)} metres</Tooltip>
            </Circle>
        </>
    )
}

export default DetectLocationMarker; 