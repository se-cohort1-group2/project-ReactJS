import "./LeafletMap.css"; 

import { MapContainer, TileLayer } from "react-leaflet"; 
import ResetViewControl from "@20tab/react-leaflet-resetview"; 

import MapZoom from "./MapZoom"; 
import TaxiStands from "./TaxiStands"; 

function LeafletMap() {
    return (
        <>
            <MapContainer
                center={[1.343, 103.814]}
                zoom={12} minZoom={11} maxZoom={18}
                maxBounds={[[1.514, 104.166], [1.114, 103.581]]}
                zoomSnap={0.5} zoomDelta={0.5}
                scrollWheelZoom={true} wheelPxPerZoomLevel={120}
            >
            <TileLayer
                // copyright attribution, do not remove //
                attribution='<img src="https://www.onemap.gov.sg/docs/maps/images/oneMap64-01.png" style="height:14px;width:14px;vertical-align:middle;"> <a href="http://onemap.gov.sg" target="_blank" rel="noreferrer">OneMap</a> | © <a href="http://sla.gov.sg" target="_blank" rel="noreferrer">Singapore Land Authority</a>'
                url="https://maps-{s}.onemap.sg/v3/Default/{z}/{x}/{y}.png"
            />
            <ResetViewControl
                icon="url(https://raw.githubusercontent.com/se-cohort1-group2/project-ReactJS/71a66e2ba063dc9ae3a652cac95531e249ea5b71/assets/ResetMapView.svg)"
            />
            <MapZoom initialZoom={12}/>
            <TaxiStands initialZoom={12}/>
            </MapContainer>
        </>
    )
}

export default LeafletMap; 