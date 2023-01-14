import { MapContainer, TileLayer, Marker, Popup, Polygon } from 'react-leaflet'
import { Icon } from 'leaflet';
import markerIconPng from "leaflet/dist/images/marker-icon.png"
import SetView from './SetView';

function OneMapLeaflet({ pathOptions, polygon, marker, zoom }) {
    return (
        <div id="map">
            <MapContainer center={marker} zoom={zoom} scrollWheelZoom={true}>
                <SetView marker={marker} zoom={zoom} />
                <TileLayer
                    attribution='&copy; <img src="https://www.onemap.gov.sg/docs/maps/images/oneMap64-01.png" style="height:20px;width:20px;" /> OneMap | Map data &copy; contributors, <a href="http://SLA.gov.sg">Singapore Land Authority</a>'
                    url="https://maps-{s}.onemap.sg/v3/Default/{z}/{x}/{y}.png"
                />
                {/* <GeoJSON style={areaStyle} data={mapData} /> */}
                <Polygon pathOptions={pathOptions} positions={polygon} />
                {/* <Marker position={marker} icon={new Icon({ iconUrl: markerIconPng, iconSize: [25, 41], iconAnchor: [12, 41] })}>
                    <Popup>
                        A pretty CSS3 popup. <br /> Easily customizable.
                    </Popup>
                </Marker> */}
            </MapContainer>
        </div>
    );
}

export default OneMapLeaflet;