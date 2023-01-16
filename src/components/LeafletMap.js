import "./LeafletMap.css"; 

import { React, useState } from "react";
import { MapContainer, TileLayer, Marker } from "react-leaflet"; 
import markerIconPng from "leaflet/dist/images/marker-icon.png"
import {Icon} from 'leaflet'
import { AiOutlineSearch } from 'react-icons/ai'

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

    //Status for user to edit destination
    const [editDestStatus, setEditDestStatus] = useState(false);

    //Edit destination - destination inputs/outputs
    const [userDestList, setUserDestList] = useState([]);
    const [userSelectedDestDetail, setUserSelectedDestDetail] = useState();
    const [destLatLong, setDestLatLong] = useState();

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

    const handlerAddLoc = (id, item) => {
        const newLocList = [item];
        setUserLocList(newLocList)
        console.log(newLocList);
    }
    
    const handlerDeleteLoc = () => {
        setUserLocList([]);
    }
    
    const handlerConfirmLoc = () => {
        Object.entries(userLocList).map(([key,value]) => {
            setUserSelectedLocDetail(value);
            console.log([value.LATITUDE, value.LONGITUDE]);
            setUserLatLog([value.LATITUDE, value.LONGITUDE]);
            setEditLocStatus(false);
            setEditDestStatus(true);
        })   
    }

    const handlerEditLoc = () => {
        setEditLocStatus(true);
        setEditDestStatus(false);
    }

    const handlerAddDest = (id, item) => {
        const newDestList = [item];
        setUserDestList(newDestList);
        console.log(newDestList);
    }

    const handlerDeleteDest = () => {
        setUserDestList([]);
    }

    const handlerConfirmDest = () => {
        Object.entries(userDestList).map(([key,value]) => {
            setUserSelectedDestDetail(value);
            console.log([value.LATITUDE, value.LONGITUDE]);
            setDestLatLong([value.LATITUDE, value.LONGITUDE]);
            setEditDestStatus(false);
        })   
    }

    const handlerEditDest = () => {
        setEditDestStatus(true);
    }

    //functon to get device location, unused as the output from OneMap is inconsistent
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
              funcGetLocDetails(newUserLatLong, handlerConfirmLoc);
            }, () => {
                setGetGeoLocStatus('Unable to retrieve your location');
            });
          
          setSelectGeoLocStatus(true);
    }

    const handlerRoute = () => {
        //placeholder for the routing
        console.log("hello");
    }

    let locSearchBar;
    if (editLocStatus) {
        locSearchBar = 
        <div>
            <div className="search-container">
            <Input value={userLocInput} label='FROM' onChange={handlerChangeInput}/>
            {/* <Button label='Use my location' onClick={handlerGetGeoLoc} /> */}
            <Button label={<AiOutlineSearch size={20}/>} onClick={handlerSearch} />
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
            <TableUserLoc name="Starting Location" list={userLocList} handler={handlerDeleteLoc}/>
            <div className="search-container">
            <Button label='Confirm' onClick={handlerConfirmLoc}/>
            </div>
        </div>
    }
    if (editDestStatus && Object.keys(userDestList).length > 0) {
        locSelectedTable= 
        <div>
            <TableUserLoc name="Destination" list={userDestList} handler={handlerDeleteDest}/>
            <div className="search-container">
            <Button label='Confirm' onClick={handlerConfirmDest}/>
            </div>
        </div>
    }

    let locSearchResultsTable;
    if (editLocStatus && Object.keys(searchResults).length > 0){
        locSearchResultsTable = <TableSearchResults list={searchResults} handlerAdd={handlerAddLoc}/>
    }
    if (editDestStatus && Object.keys(searchResults).length > 0){
        locSearchResultsTable = <TableSearchResults list={searchResults} handlerAdd={handlerAddDest}/>
    }

    let destSearchBar;
    if (editDestStatus) {
        destSearchBar = 
        <div>
            <div className="search-container">
            <Input value={userLocInput} label='TO' onChange={handlerChangeInput}/>
            {/* <Button label='Use my location' onClick={handlerGetGeoLoc} /> */}
            <Button label={<AiOutlineSearch size={20}/>} onClick={handlerSearch} />
            </div>
        </div>
    }

    let routing;
    if (!editLocStatus && !editDestStatus) {
        routing = 
        <div className="search-container">
            <Button label="Display Route" onClick={handlerRoute}/>
        </div>
    }

    return (
        <>
            <h1>Taxi Availability App</h1>

            <div className="container">

                <div className="sideBar">
                    {!editLocStatus && <TableSelectedLoc name="Selected Starting Location" item={userSelectedLocDetail} handler={handlerEditLoc}/>}
                    {(!editLocStatus && !editDestStatus) && <TableSelectedLoc name="Selected Destination" item={userSelectedDestDetail} handler={handlerEditDest}/>}
                    {routing}
                    {locSearchBar}
                    {/* {geoLocEnabler} */}
                    {destSearchBar}
                    {locSelectedTable}
                    {locSearchResultsTable}
                    
                    
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