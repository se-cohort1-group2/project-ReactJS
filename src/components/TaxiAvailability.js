import "./TaxiAvailability.css"; 

import { useState } from "react"; 
import { Marker, Popup, useMapEvents } from "react-leaflet"; 
import { Icon } from "leaflet"; 

import TaxiAvailabilityJSON from "./TaxiAvailability.json"; 
import TaxiAvailableIcon from "../images/TaxiAvailableIcon.svg"; 
import GetAddress from "./GetAddress"; 

function TaxiAvailability({ initialZoom }) {

    const [ActivePopup, setActivePopup] = useState(null); 

    const [CurrentZoomLevel, setCurrentZoomLevel] = useState(initialZoom); 
    const mapEvents = useMapEvents({
        zoomend: () => {
            setCurrentZoomLevel(mapEvents.getZoom())
        }
    })

    return (
        <>
        {TaxiAvailabilityJSON.value.map(item => {
            return (
                <>
                {CurrentZoomLevel >= 14.5 && (
                    <Marker
                        key={item.id}
                        position={[item.Latitude, item.Longitude]}
                        icon={ new Icon({iconSize: [25, 25], iconUrl: TaxiAvailableIcon}) }
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
                            <div className="popup-TaxiAvailable">
                                <div className="popup-TaxiAvailable-header">Taxi Available</div>
                                <GetAddress Lat={item.Latitude} Long={item.Longitude}/>
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

export default TaxiAvailability; 