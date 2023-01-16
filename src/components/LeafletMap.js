import "./LeafletMap.css"; 

import { React, useState } from "react";
import { MapContainer, TileLayer, Marker } from "react-leaflet"; 
import markerIconPng from "leaflet/dist/images/marker-icon.png"
import {Icon} from 'leaflet'

//components
import Input from "./Input";
import Button from "./Button";
import TableSearchResults from "./TableSearchResults";
import TableUserLoc from "./TableUserLoc";
import TableSelectedLoc from "./TableSelectedLoc";

//functions
import funcSearch from "./funcSearch";
import funcGetLocDetails from "./funcGetLocDetails";


function LeafletMap() {

    const initialPosition =[1.343, 103.814]

    //Status for user to edit location
    const [editLocStatus, setEditLocStatus] = useState(true);

    //Edit location - via device location - statuses
    const [getGeoLocstatus, setGetGeoLocStatus] = useState();
    const [selectGeoLocStatus,setSelectGeoLocStatus] = useState(false);
    
    //Edit location - via Search
    const [searchResults, setSearchResults] = useState({});

    //Edit location - location inputs/outputs
    const [userLocInput, setUserLocInput] = useState();
    const [userLocList, setUserLocList] = useState({});
    const [userSelectedLocDetail, setUserSelectedLocDetail] = useState();
    const [userLatLong, setUserLatLog] = useState();

    const handlerChangeInput = (value) => {
        setUserLocInput(value);
    }

    const handlerGetSearchResults = (value) => {
        setSearchResults(value)
      }
    
    const handlerSearch = () =>{
        setSearchResults([]);
        funcSearch(userLocInput,1,handlerGetSearchResults)
        
    }

    const handlerAdd = (id, item) => {
        const newLocList = [item];
        setUserLocList(newLocList)
        console.log(newLocList);
      }
    
      const handlerDelete = (id, item) => {
        setUserLocList([]);
      }
    
      const handlerConfirm = () => {
        Object.entries(userLocList).map(([key,value]) => {
            setUserSelectedLocDetail(value);
            console.log([value.LATITUDE, value.LONGITUDE]);
            setUserLatLog([value.LATITUDE, value.LONGITUDE]);
            setEditLocStatus(false);
        })   
      }

      const handlerEdit = () => {
        setEditLocStatus(true);
      }

    const handlerGetGeoLoc = () => {
        if (!navigator.geolocation) {
            setGetGeoLocStatus('Geolocation is not supported by your browser');
          } else {
            setGetGeoLocStatus('Locating...');
          }
          navigator.geolocation.getCurrentPosition((position) => {
            setGetGeoLocStatus('Location Detected');
              const newUserLatLong = [position.coords.latitude, position.coords.longitude]
              setUserLatLog(newUserLatLong);
              console.log(newUserLatLong);
              funcGetLocDetails(newUserLatLong, handlerConfirm);
            }, () => {
                setGetGeoLocStatus('Unable to retrieve your location');
            });
          
          setSelectGeoLocStatus(true);
    }

    let locSearchBar;
    if (editLocStatus) {
        locSearchBar = 
        <div>
            <Input value={userLocInput} label='Search' onChange={handlerChangeInput}/>
            <div className="search-container">
            <Button label='Use my location' onClick={handlerGetGeoLoc} />
            <Button label='Search' onClick={handlerSearch} />
            </div>
        </div>
    }

    let geoLocEnabler;
    if (selectGeoLocStatus) {
        geoLocEnabler = <p>{getGeoLocstatus}</p>
    }

    let locSelectedTable;
    if (editLocStatus && Object.keys(userLocList).length > 0) {
        locSelectedTable = 
        <div>
            <TableUserLoc list={userLocList} handler={handlerDelete}/>
            <div className="search-container">
            <Button label='Confirm' onClick={handlerConfirm}/>
            </div>
        </div>
    }

    let locSearchResultsTable;
    if (editLocStatus && Object.keys(searchResults).length > 0){
        locSearchResultsTable = <TableSearchResults list={searchResults} handlerAdd={handlerAdd}/>}

    return (
        <>
            <h1>Taxi Availability App</h1>

            <div className="container">

                <div className="sideBar">
                    {locSearchBar}
                    {geoLocEnabler}
                    {locSelectedTable}
                    {locSearchResultsTable}
                    {!editLocStatus && <TableSelectedLoc item={userSelectedLocDetail} handler={handlerEdit}/>}
                </div>

                <div className="leaflet-container">
                    <MapContainer center={initialPosition} zoom={12}>
                        <TileLayer 
                            url="https://maps-{s}.onemap.sg/v3/Default/{z}/{x}/{y}.png"
                            attribution='<img src="https://www.onemap.gov.sg/docs/maps/images/oneMap64-01.png" style="height:20px;width:20px;"/> OneMap | Map data &copy; contributors, <a href="http://SLA.gov.sg">Singapore Land Authority</a>'/>
                        {userLatLong && <Marker position={userLatLong} icon={new Icon({iconUrl: markerIconPng, iconSize: [25, 41], iconAnchor: [12, 41]})}/>}
                    </MapContainer>
                </div>

            </div>
        </>
    )
}

export default LeafletMap; 