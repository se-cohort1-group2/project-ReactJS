import "./App.css";

import LTAapi from "./api/LTAapi";

import { useEffect, useState } from "react";
import OneMapLeaflet from "./components/OneMapLeaflet";
import OneMapapi from "./api/OneMapapi";
import ViewAreaNameList from "./components/ViewAreaNameList";
import Check from "./components/Check";

function App() {
    let initialise = true;

    useEffect(() => {
        if (initialise) {
            // apiGet();
            // apiGetNext();
            oneMapApiGet();
            initialise = false;
        }
    }, [])

    const [taxiList, setTaxiList] = useState([]);

    // console.log(taxiList);

    const appendTaxiList = (arr) => {
        setTaxiList(prevState => [
            ...prevState,
            ...arr,
        ])
    }

    const apiGet = async () => {
        try {
            const response = await LTAapi.get("/Taxi-Availability")
            appendTaxiList(response.data.value)
        } catch (error) {
            console.log(error.message)
        }
    }

    const apiGetNext = async () => {
        try {
            var arrlength = undefined;

            for (var i = 0; i < 10000; i += 500) {
                console.log(arrlength)
                if (arrlength === 0) {
                    console.log("End of data load"); break;
                } else {
                    console.log(`/Taxi-Availability?$skip=${i}`)
                    const response = await LTAapi.get(`/Taxi-Availability?$skip=${i}`)
                    arrlength = response.data.value.length;
                    appendTaxiList(response.data.value);
                }
            }
        } catch (error) {
            console.log(error.message)
        }
    }



    //Get planning area query

    const [areaPolygonList, setareaPolygonList] = useState([]);
    const [polygon, setPolygon] = useState([]);
    const pathOptions = { color: 'purple' };
    const [marker, setMarker] = useState([1.352076, 103.820250]); //for testing
    const [zoom, setZoom] = useState(12);

    const oneMapApiGet = async () => {
        try {
            const areaPolygonData = await OneMapapi.get("/popapi/getAllPlanningarea?token=eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJzdWIiOjk2NTksInVzZXJfaWQiOjk2NTksImVtYWlsIjoieG9uZzAwMkBnbWFpbC5jb20iLCJmb3JldmVyIjpmYWxzZSwiaXNzIjoiaHR0cDpcL1wvb20yLmRmZS5vbmVtYXAuc2dcL2FwaVwvdjJcL3VzZXJcL3Nlc3Npb24iLCJpYXQiOjE2NzMzNDQ1NjMsImV4cCI6MTY3Mzc3NjU2MywibmJmIjoxNjczMzQ0NTYzLCJqdGkiOiJjNjZiM2FmZDI5NWFlMDdhOWEwNjYzOTc3NjI1ZjgzYyJ9.15G7JePCVHYwzzsH9Ru5Oon81wnm5WXcYBGa5uENaj0")
            console.log(areaPolygonData)
            setareaPolygonList(areaPolygonData.data);
        } catch (error) {
            console.log(error.message)
        }
    }

    const handlerSelectArea = (id) => {
        const foundIndex = areaPolygonList.findIndex((item) => item.pln_area_n === id);

        let parsedGeoJson = JSON.parse(areaPolygonList[foundIndex].geojson);

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
        console.log(swapCoord[0][0][0][0][0]);
        setMarker(swapCoord[0][0][0][0][0]);
        setZoom(13);
    }

    return (
        <>
            <div className="App">
                <h1>React App</h1>
                {/* Change test button to useEffect after dev */}
                <Check marker={marker} polygon={polygon} />
                <button onClick={apiGet}>Initial load</button>
                <button onClick={apiGetNext}>Load next</button>
                <button onClick={oneMapApiGet}>Get planning area</button>
                {areaPolygonList && <ViewAreaNameList list={areaPolygonList} handlerSelectArea={handlerSelectArea} />}
                <OneMapLeaflet mapData={areaPolygonList} pathOptions={pathOptions} polygon={polygon} marker={marker} zoom={zoom} />
            </div>
        </>
    )
}

export default App; 