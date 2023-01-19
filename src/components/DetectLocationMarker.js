import { useState, useEffect } from "react"; 
import { Marker, Popup, useMap, Circle } from "react-leaflet"; 
import { Icon } from "leaflet"; 

import DefaultMarkerIconBlue from "../images/DefaultMarkerIconBlue.png"; 

function DetectLocationMarker({ LocationDetected, setLocationDetected, flyToZoom }) {

    const [position, setPosition] = useState(null); 
    const [radius, setRadius] = useState(null); 

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
    }, [LocationDetected, setLocationDetected, map, position, flyToZoom])

    return position === null ? null : (
        <>
            <Marker
                position={position}
                icon={new Icon({ iconUrl: DefaultMarkerIconBlue, iconSize: [25, 41], iconAnchor: [12, 41], popupAnchor: [1, -34] })}
            >
                <Popup>Your current location, accurate to {radius.toFixed(2)} metres</Popup>
            </Marker>
            {/* <Marker position={position} draggable={true} eventHandlers={{
                click: () => {
                    map.flyTo(position, map.getZoom()); 
                }
            }}>
                <Popup>Your current location</Popup>
            </Marker> */}
            <Circle center={position} radius={radius} pathOptions={{}}/>
        </>
    )
}

export default DetectLocationMarker; 