import { MapContainer, TileLayer, Polygon, Marker, Polyline, Circle, Popup } from "react-leaflet";
import ResetViewControl from "@20tab/react-leaflet-resetview";
import markerIconPng from "leaflet/dist/images/marker-icon.png";
import { Icon } from "leaflet";
import { useRef } from "react";

import TaxiStands from "./TaxiStands";
import TaxiAvailability from "./TaxiAvailability";

import SetView from "./SetView";
import DetectLocationMarker from "./DetectLocationMarker";
import CountTaxis from "./CountTaxis";

import DefaultMarkerIconRed from "../images/DefaultMarkerIconRed.png";

function LeafletMap({
    polygon,
    LocationDetected,
    setLocationDetected,
    center,
    zoom,
    userLatLong,
    destLatLong,
    showPolyLine,
    polyLatLong,
    taxiCount,
    setTaxiCount,
    radius,
    flyToZoom,
    taxiAvailabilityList,
    handlerGetClickedDest,
    position,
    setPosition,
}) {

    const TaxiCountMarkerRef = useRef(null);
    const markerRef = TaxiCountMarkerRef.current;
    if (markerRef) {
        markerRef.openPopup();
    }

    return (
        <>
            <MapContainer
                center={[1.343, 103.814]}
                zoom={12} minZoom={11} maxZoom={18}
                /* maxBounds={[[1.514, 104.166], [1.114, 103.581]]} */
                zoomSnap={0.5} zoomDelta={0.5}
                scrollWheelZoom={true} wheelPxPerZoomLevel={120}
            >
                <TileLayer
                    // copyright attribution, do not remove
                    attribution='<img src="https://www.onemap.gov.sg/docs/maps/images/oneMap64-01.png" style="height:14px;width:14px;vertical-align:middle;"> <a href="http://onemap.gov.sg" target="_blank" rel="noreferrer">OneMap</a> | © <a href="http://sla.gov.sg" target="_blank" rel="noreferrer">Singapore Land Authority</a>'
                    url="https://maps-{s}.onemap.sg/v3/Default/{z}/{x}/{y}.png"
                    crossOrigin={true}
                />
                <ResetViewControl
                    icon="url(https://raw.githubusercontent.com/se-cohort1-group2/project-ReactJS/71a66e2ba063dc9ae3a652cac95531e249ea5b71/assets/ResetMapView.svg)"
                />
                <TaxiStands initialZoom={12} handlerGetClickedDest={handlerGetClickedDest} />
                <TaxiAvailability initialZoom={12} taxiAvailabilityList={taxiAvailabilityList} handlerGetClickedDest={handlerGetClickedDest} />
                <Polygon pathOptions={{ color: "green" }} positions={polygon} />
                <SetView center={center} zoom={zoom} />
                <DetectLocationMarker LocationDetected={LocationDetected} setLocationDetected={setLocationDetected} flyToZoom={flyToZoom} position={position} setPosition={setPosition} />
                {userLatLong && <Circle pathOptions={{ color: "#d75f6a" }} center={userLatLong} radius={radius} />}
                {userLatLong && <Marker
                    ref={TaxiCountMarkerRef}
                    position={userLatLong}
                    icon={new Icon({ iconUrl: DefaultMarkerIconRed, iconSize: [25, 41], iconAnchor: [12, 41], popupAnchor: [1, -34] })}
                >
                    <Popup>
                        Taxis within {radius} metres: {taxiCount}
                    </Popup>
                </Marker>}
                {userLatLong && <CountTaxis marker={userLatLong} radius={radius} setTaxiCount={setTaxiCount} taxiAvailabilityList={taxiAvailabilityList} />}
                {destLatLong && <Marker position={destLatLong} icon={new Icon({ iconUrl: markerIconPng, iconSize: [25, 41], iconAnchor: [12, 41] })} />}
                {showPolyLine && <Polyline pathOptions={{ color: "blue" }} positions={polyLatLong} />}
            </MapContainer>
        </>
    )
}

export default LeafletMap; 