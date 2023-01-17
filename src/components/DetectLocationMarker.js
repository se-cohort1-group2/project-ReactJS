import { useState, useEffect } from "react"; 
import { Marker, Popup, useMap, Circle } from "react-leaflet"; 

function DetectLocationMarker({ LocationDetected, setLocationDetected }) {

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
                map.flyTo(e.latlng, 15); 
            })
            setLocationDetected(false); 
        }
    }, [LocationDetected, setLocationDetected, map, position])

    return position === null ? null : (
        <>
            <Marker position={position} draggable={true} eventHandlers={{
                click: () => {
                    map.flyTo(position, map.getZoom()); 
                }
            }}>
                <Popup>Your current location</Popup>
            </Marker>
            <Circle center={position} radius={radius} pathOptions={{}}/>
        </>
    )
}

export default DetectLocationMarker; 