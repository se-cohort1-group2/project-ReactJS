import style from "./TaxiAvailability.module.css"; 

import { useState } from "react"; 
import { Marker, Popup, useMapEvents } from "react-leaflet"; 
import { Icon } from "leaflet"; 

import TaxiAvailableIcon from "../images/TaxiAvailableIcon.svg"; 
import GetAddress from "./GetAddress"; 

function TaxiAvailability({ initialZoom, taxiAvailabilityList, handlerGetClickedDest }) {

    const [ActivePopup, setActivePopup] = useState(null); 

    const [CurrentZoomLevel, setCurrentZoomLevel] = useState(initialZoom); 
    const mapEvents = useMapEvents({
        zoomend: () => {
            setCurrentZoomLevel(mapEvents.getZoom())
        }
    })

    return (
        <>
        {taxiAvailabilityList.map(item => {
            return (
                <>
                {CurrentZoomLevel >= 14.5 && (
                    <Marker
                        key={item.id}
                        position={[item.Latitude, item.Longitude]}
                        icon={new Icon({ iconSize: [25, 25], iconUrl: TaxiAvailableIcon })}
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
                            <div className={style.popupTaxiAvailable}>
                                <div className={style.popupTaxiAvailableHeader}>Taxi Available</div>
                                <GetAddress Lat={item.Latitude} Long={item.Longitude}/>
                                {/* <Button label="Get Location" onClick={() => {handler(item)}}/> */}
                                <button className={style.popupButton} onClick={() => {
                                    handlerGetClickedDest(item)
                                }}>
                                    Use this location
                                </button>
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