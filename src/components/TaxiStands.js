import "./TaxiStands.css"; 

import { useState } from "react"; 
import { Marker, Popup, useMapEvents } from "react-leaflet"; 
import { Icon } from "leaflet"; 

import TaxiStandsJSON from "./TaxiStands.json"; 
import TaxiStandIcon from "../images/TaxiStandIcon.svg"; 

function TaxiStands({ initialZoom }) {

    const [ActivePopup, setActivePopup] = useState(null); 

    const [CurrentZoomLevel, setCurrentZoomLevel] = useState(initialZoom); 

    const mapEvents = useMapEvents({
        zoomend: () => {
            setCurrentZoomLevel(mapEvents.getZoom())
            console.log("CurrentZoomLevel", CurrentZoomLevel)
        }
    })

    return (
        <>
        {TaxiStandsJSON.value.map(item => {
            return (
                <>
                {CurrentZoomLevel >= 14.5 && (
                    <Marker
                        key={item.id}
                        position={[item.Latitude, item.Longitude]}
                        icon={ new Icon({iconSize: [20, 20], iconUrl: TaxiStandIcon}) }
                        onClick={() => {
                            setActivePopup(item.id); 
                            console.log(ActivePopup)
                        }}
                    >
                        <Popup
                            position={[item.Latitude, item.Longitude]}
                            onClose={() => {
                                setActivePopup(null); 
                            }}
                        >
                            <div className="popup">
                                <div className="popup-header">Taxi {item.Type}</div>
                                <div className="taxi-code">{item.TaxiCode}</div>
                                <div className="taxi-name">{item.Name}</div>
                                <div className="taxi-bfa">Barrier Free Access: {item.Bfa}</div>
                            </div>
                        </Popup>
                    </Marker>
                )}
                </>
            )
        })}
        </>
    )
}

export default TaxiStands; 