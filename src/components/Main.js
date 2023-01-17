import './Main.css'

import { React, useState, useEffect } from "react";
import { MapContainer, TileLayer, Marker, Polyline } from "react-leaflet"; 
import markerIconPng from "leaflet/dist/images/marker-icon.png"
import {Icon} from 'leaflet'
import { AiOutlineSearch } from 'react-icons/ai'

//components
import LeafletMap from "./LeafletMap";
import Input from "./Input";
import Button from "./Button";
import TableSearchResults from "./TableSearchResults";
import TableUserLoc from "./TableUserLoc";
import TableSelectedLoc from "./TableSelectedLoc";
import DetectLocationButton from "./DetectLocationButton"; 

//functions
import OneMapAPI from "../api/OneMapAPI"; 
import funcSearch from "./funcSearch";
import funcGetLocDetails from "./funcGetLocDetails";
import funcGetRoute from "./funcGetRoute";


function Main() {

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

    //Routing
    const [showPolyLine, setShowPolyLine] = useState(false);
    const [polyLatLong, setPolyLatLong] = useState();

    //Planning areas
    const [AreaPolygonList, setAreaPolygonList] = useState([]); 
    const [polygon, setPolygon] = useState([]); 
    const [center, setCenter] = useState([1.343, 103.814]); 
    const [zoom, setZoom] = useState(12); 

    // eslint-disable-next-line
    const [SelectedOption, setSelectedOption] = useState(); 
    const [LocationDetected, setLocationDetected] = useState(false); 

    

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
    }
    
    const handlerDeleteLoc = () => {
        setUserLocList([]);
    }
    
    const handlerConfirmLoc = () => {
        Object.entries(userLocList).map(([key,value]) => {
            setUserSelectedLocDetail(value);
            setUserLatLog([value.LATITUDE, value.LONGITUDE]);
            setEditLocStatus(false);
            setEditDestStatus(true);
        })   
    }

    const handlerEditLoc = () => {
        setEditLocStatus(true);
        setEditDestStatus(false);
        setShowPolyLine(false);
    }

    const handlerAddDest = (id, item) => {
        const newDestList = [item];
        setUserDestList(newDestList);
    }

    const handlerDeleteDest = () => {
        setUserDestList([]);
    }

    const handlerConfirmDest = () => {
        Object.entries(userDestList).map(([key,value]) => {
            setUserSelectedDestDetail(value);
            setDestLatLong([value.LATITUDE, value.LONGITUDE]);
            setEditDestStatus(false);
        })   
    }

    const handlerEditDest = () => {
        setEditDestStatus(true);
        setShowPolyLine(false);
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
              funcGetLocDetails(newUserLatLong, handlerConfirmLoc);
            }, () => {
                setGetGeoLocStatus('Unable to retrieve your location');
            });
          
          setSelectGeoLocStatus(true);
    }

    const handlerRoute = (type) => {
        funcGetRoute(userLatLong,destLatLong,type, handlerPolyline);
    }

    const handlerPolyline = (value) => {
        let polyline = require('@mapbox/polyline');
        let newPolyLatLong = [...polyline.decode(value,5)]
        setPolyLatLong(newPolyLatLong);
        setShowPolyLine(true);
    }

    let initialRender = true; 
    useEffect(() => {
        if (initialRender) {
            apiGetPlanningArea(); 
            // eslint-disable-next-line
            initialRender = false; 
        }
    }, [])

    const OneMapToken = "eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJzdWIiOjk2NTYsInVzZXJfaWQiOjk2NTYsImVtYWlsIjoicGhvZWJleWtxQGdtYWlsLmNvbSIsImZvcmV2ZXIiOmZhbHNlLCJpc3MiOiJodHRwOlwvXC9vbTIuZGZlLm9uZW1hcC5zZ1wvYXBpXC92MlwvdXNlclwvc2Vzc2lvbiIsImlhdCI6MTY3Mzg2Mjg2NSwiZXhwIjoxNjc0Mjk0ODY1LCJuYmYiOjE2NzM4NjI4NjUsImp0aSI6ImIyMTc1YmJjZTE0N2FiMmZjOTJkZmEyZGNiZjczMzBmIn0.F5hSL5YmIbkY2isTnyaSOPZHRKPjeR7vjnwPwyWWbfM"
    // token expires Thursday 19th Jan 2023

    const apiGetPlanningArea = async() => {
        try {
            const AreaPolygonData = await OneMapAPI.get(`/privateapi/popapi/getAllPlanningarea?token=${OneMapToken}`)
            AreaPolygonData.data.sort((a, b) => a.pln_area_n.localeCompare(b.pln_area_n))
            const removedOTHERS = AreaPolygonData.data.filter(area => area.pln_area_n !== "OTHERS")
            setAreaPolygonList(removedOTHERS)
            console.log(AreaPolygonData.data)
        } catch (error) {
            console.log(error.message)
        }
    }

    const handlerSelectArea = (id) => {
        const foundIndex = AreaPolygonList.findIndex((item) => item.pln_area_n === id); 
        const parsedGeoJson = JSON.parse(AreaPolygonList[foundIndex].geojson); 
        let swapCoord = parsedGeoJson.coordinates.map((coordSet1) => {
            let swapCoordSet1 = coordSet1.map((coordSet2) => {
                let swapCoordSet2 = coordSet2.map((coord) => {
                    return [coord[1], coord[0]]; 
                })
                return [swapCoordSet2]; 
            })
            return [swapCoordSet1]; 
        })
        setPolygon(swapCoord); 
        setCenter(swapCoord[0][0][0][0][0]); 
        setZoom(13.5); 
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
            <Button label="Driving Route" onClick={ () => {
                handlerRoute("drive")
            }}/>
            <Button label="Walking Route" onClick={ () => {
                handlerRoute("walk")
            }}/>
        </div>
    }

    return (
        <>
            <h1>Taxi Availability App</h1>

            <div className="container">

                <div className="sideBar">
                    <select
                        style={{margin: "2vh 10px 0 2%"}}
                        value={SelectedOption}
                        onChange={(e) => {
                            handlerSelectArea(e.target.value)
                        }}
                    >
                        <option value="" selected disabled>-- Select Area --</option>
                        {AreaPolygonList.map(o => (
                            <option key={o.pln_area_n} value={o.pln_area_n}>{o.pln_area_n}</option>
                        ))}
                    </select>
                    <DetectLocationButton setLocationDetected={setLocationDetected}/>
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
                    <LeafletMap polygon={polygon}
                        LocationDetected={LocationDetected} 
                        setLocationDetected={setLocationDetected}
                        center={center} 
                        zoom={zoom}
                        userLatLong={userLatLong}
                        destLatLong={destLatLong}
                        showPolyLine={showPolyLine}
                        polyLatLong={polyLatLong}
                    />
                </div>

            </div>
        </>
    )
}

export default Main; 