import "./Main.css";
import styles from "./Table.module.css";

import { React, useState, useEffect } from "react";
import { AiOutlineSearch } from "react-icons/ai";
import { TbRoute } from "react-icons/tb";
import { BiCurrentLocation } from "react-icons/bi";

// components
import LeafletMap from "./LeafletMap";
import Input from "./Input";
import Button from "./Button";
import TableSearchResults from "./TableSearchResults";
import TableUserLoc from "./TableUserLoc";
import TableSelectedLoc from "./TableSelectedLoc";
import DetectLocationButton from "./DetectLocationButton";
import TaxiAvailabilityJSON from "./TaxiAvailability.json";

// functions
import funcSearch from "./funcSearch";
import funcGetLocDetails from "./funcGetLocDetails";
import funcGetRoute from "./funcGetRoute";
import funcGetPlanningAreaStatic from "./funcGetPlanningAreaStatic";
import funcGetTaxiAvailability from "./funcGetTaxiAvailability";
// import funcGetPlanningArea from "./funcGetPlanningArea";

const initialLoc = {
    ADDRESS: "Please find and set a location"
}

const startHeader = "Starting Location";
const endHeader = "Ending Location";

function Main() {

    // Status for user to edit location
    const [editLocStatus, setEditLocStatus] = useState(true);

    // Edit location - via Search
    const [searchResults, setSearchResults] = useState({});

    // Edit location - location inputs/outputs
    const [userLocInput, setUserLocInput] = useState("");
    const [userLocList, setUserLocList] = useState({});
    const [userSelectedLocDetail, setUserSelectedLocDetail] = useState(initialLoc);
    const [userLatLong, setUserLatLong] = useState();

    // Status for user to edit destination
    const [editDestStatus, setEditDestStatus] = useState(true);

    // Edit destination - destination inputs/outputs
    const [userSelectedDestDetail, setUserSelectedDestDetail] = useState(initialLoc);
    const [destLatLong, setDestLatLong] = useState();

    // Routing
    const [showPolyLine, setShowPolyLine] = useState(false);
    const [polyLatLong, setPolyLatLong] = useState();

    // Planning Areas
    const [AreaPolygonList, setAreaPolygonList] = useState([]);
    const [polygon, setPolygon] = useState([]);
    const [center, setCenter] = useState([1.343, 103.814]);
    const [zoom, setZoom] = useState(12);

    // Taxi Availability
    const [taxiAvailabilityList, setTaxiAvailabilityList] = useState(TaxiAvailabilityJSON.value);

    // eslint-disable-next-line
    const [SelectedOption, setSelectedOption] = useState();
    const [LocationDetected, setLocationDetected] = useState(false);

    // Taxi count in radius
    const [taxiCount, setTaxiCount] = useState(0);
    const radius = 500;
    const flyToZoom = 15;

    // Position for current location
    const [position, setPosition] = useState(null);

    const handlerChangeInput = (value) => {
        setUserLocInput(value)
    }

    const handlerSearch = () => {
        console.log(typeof userLocInput)
        if (typeof userLocInput === "string") {
            setSearchResults([]);
            funcSearch(userLocInput, 1, setSearchResults);
        }
    }

    const handlerAddLoc = (id, item) => {
        const newLocList = [item];
        setUserLocList(newLocList);
    }

    const handlerDeleteLoc = () => {
        setUserLocList([]);
    }

    const handlerConfirmLoc = () => {
        setShowPolyLine(false);
        // eslint-disable-next-line
        Object.entries(userLocList).map(([key, value]) => {
            setUserSelectedLocDetail(value);
            setUserLatLong([value.LATITUDE, value.LONGITUDE]);
            setCenter([value.LATITUDE, value.LONGITUDE]);
            setZoom(flyToZoom);
        })
        setEditLocStatus(false);
        setUserLocList([]);
        setPosition(null);
    }

    const handlerEdit = (value) => {
        if (value === startHeader) {
            setUserSelectedLocDetail(initialLoc);
            setUserLatLong();
            setEditLocStatus(true);
        }
        if (value === endHeader) {
            setUserSelectedDestDetail(initialLoc);
            setDestLatLong();
            setEditDestStatus(true);
        }
        setShowPolyLine(false);
    }

    const handlerGetDetectedLoc = ([lat, long]) => {
        console.log([lat, long]);
        funcGetLocDetails([lat, long], handlerAddLoc);
    }

    const handlerGetClickedDest = (value) => {
        console.log(value);
        funcGetLocDetails([value.Latitude, value.Longitude], handlerAddLoc);
        setZoom(flyToZoom);
    }

    const handlerConfirmDest = () => {
        setShowPolyLine(false);
        // eslint-disable-next-line
        Object.entries(userLocList).map(([key, value]) => {
            setUserSelectedDestDetail(value);
            setDestLatLong([value.LATITUDE, value.LONGITUDE]);
        })
        setUserLocList([]);
        setEditDestStatus(false);
        setPosition(null);
    }

    const handlerRoute = (type) => {
        funcGetRoute(userLatLong, destLatLong, type, handlerPolyline);
    }

    const handlerPolyline = (value) => {
        let polyline = require("@mapbox/polyline");
        let newPolyLatLong = [...polyline.decode(value, 5)];
        setPolyLatLong(newPolyLatLong);
        setShowPolyLine(true);
    }

    let initialRender = true;
    useEffect(() => {
        if (initialRender) {
            // funcGetPlanningArea(setAreaPolygonList); //get area update from OneMap
            funcGetPlanningAreaStatic(setAreaPolygonList); //get area from static json
            // funcGetTaxiAvailability(setTaxiAvailabilityList); //get taxi availability from LTA
            console.log(taxiAvailabilityList);
            // eslint-disable-next-line
            initialRender = false;
        }
        const interval = setInterval(() => {
            funcGetTaxiAvailability(setTaxiAvailabilityList); //get taxi availability from LTA
        }, 600000);
        return () => clearInterval(interval);
    }, [])

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

    const locSearchBar =
        <div>
            <div className="search-container">
                <Input value={userLocInput} label="Search" onChange={handlerChangeInput} />
                <Button label={<AiOutlineSearch size={20} />} onClick={handlerSearch} />
            </div>
        </div>



    let locSelectedTable;
    if (Object.keys(userLocList).length > 0) {
        locSelectedTable =
            <div>
                <TableUserLoc name="Location" list={userLocList} handler={handlerDeleteLoc} />
                <div className="search-container set-start-end">
                    <Button label="Set as Start" onClick={handlerConfirmLoc} />
                    <Button label="Set as End" onClick={handlerConfirmDest} />
                </div>
            </div>
    }

    let locSearchResultsTable;
    if (Object.keys(searchResults).length > 0) {
        locSearchResultsTable =
            <TableSearchResults list={searchResults} handlerAdd={handlerAddLoc} />
    }


    let routing;
    if (!editLocStatus && !editDestStatus) {
        routing =
            <div className="search-container driving-walking-route">
                <Button label="Driving Route" onClick={() => {
                    handlerRoute("drive")
                }} />
                <Button label="Walking Route" onClick={() => {
                    handlerRoute("walk")
                }} />
            </div>
    }

    return (
        <>
            <div className="main-container">

                <div className="sideBar">
                    <h1 className="title">Taxi Availability App</h1>
                    <table className={styles.table} style={{ margin: "0 0 0 0" }}>
                        <thead><tr>
                            <th>{<BiCurrentLocation size={20} />}</th>
                            <th style={{ padding: "10px 10px 10px 0px" }}>Find Locations</th>
                        </tr></thead>
                    </table>
                    <div className="find-locations-container">
                        <div className="select-detect-container">
                            <select
                                value={SelectedOption}
                                onChange={(e) => {
                                    handlerSelectArea(e.target.value)
                                }}
                            >
                                <option value="" selected disabled>-- Select a region to view --</option>
                                {AreaPolygonList.map(o => (
                                    <option key={o.pln_area_n} value={o.pln_area_n}>{o.pln_area_n}</option>
                                ))}
                            </select>
                            <DetectLocationButton
                                setLocationDetected={setLocationDetected}
                                handlerGetDetectedLoc={handlerGetDetectedLoc}
                                setCenter={setCenter}
                                setZoom={setZoom}
                                setUserLatLong={setUserLatLong}
                                flyToZoom={flyToZoom}
                            />
                        </div>
                        {locSearchBar}
                    </div>
                    <div className="routing-container">
                        <table className={styles.table} style={{ margin: "0 0 0 0" }}>
                            <thead><tr>
                                <th>{<TbRoute size={20} />}</th>
                                <th style={{ padding: "10px 10px 10px 0px" }}>Routing</th>
                            </tr></thead>
                        </table>
                        <TableSelectedLoc name={startHeader} item={userSelectedLocDetail} handler={handlerEdit} editStatus={editLocStatus} setPosition={setPosition} />
                        <TableSelectedLoc name={endHeader} item={userSelectedDestDetail} handler={handlerEdit} editStatus={editDestStatus} setPosition={setPosition} />
                        {routing}
                        {locSelectedTable}
                    </div>
                    {locSearchResultsTable &&
                        <table className={styles.table} style={{ margin: "0 0 0 0" }}>
                            <thead><tr>
                                <th style={{ width: "32px" }}></th>
                                <th style={{ padding: "10px 10px 10px 0px" }}>Search Results</th>
                            </tr></thead>
                        </table>
                    }
                    <div className="search-results-container">
                        {locSearchResultsTable}
                    </div>
                </div>

                <div className="leaflet-container">
                    <LeafletMap
                        polygon={polygon}
                        LocationDetected={LocationDetected}
                        setLocationDetected={setLocationDetected}
                        center={center}
                        zoom={zoom}
                        userLatLong={userLatLong}
                        destLatLong={destLatLong}
                        showPolyLine={showPolyLine}
                        polyLatLong={polyLatLong}
                        taxiCount={taxiCount}
                        setTaxiCount={setTaxiCount}
                        radius={radius}
                        flyToZoom={flyToZoom}
                        taxiAvailabilityList={taxiAvailabilityList}
                        handlerGetClickedDest={handlerGetClickedDest}
                        position={position}
                        setPosition={setPosition}
                    />
                </div>

            </div>
        </>
    )
}

export default Main; 