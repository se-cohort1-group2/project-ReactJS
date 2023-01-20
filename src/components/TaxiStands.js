import style from "./TaxiStands.module.css"; 

import { useState } from "react"; 
import { Marker, Popup, useMapEvents } from "react-leaflet"; 
import { Icon } from "leaflet"; 

import TaxiStandsJSON from "./TaxiStands.json"; 
import TaxiStandIcon from "../images/TaxiStandIcon.svg"; 

function TaxiStands({ initialZoom, handlerGetClickedDest }) {

    const [ActivePopup, setActivePopup] = useState(null); 

    const [CurrentZoomLevel, setCurrentZoomLevel] = useState(initialZoom); 
    const mapEvents = useMapEvents({
        zoomend: () => {
            setCurrentZoomLevel(mapEvents.getZoom())
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
                        icon={new Icon({ iconSize: [20, 20], iconUrl: TaxiStandIcon })}
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
                            <div className={style.popupTaxiStand}>
                                <div className={style.popupTaxiStandHeader}>Taxi {item.Type}</div>
                                <div className={style.popupTaxiStandCode}>{item.TaxiCode}</div>
                                <div>{item.Name}</div>
                                <div>Barrier Free Access: {item.Bfa}</div>
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

export default TaxiStands; 