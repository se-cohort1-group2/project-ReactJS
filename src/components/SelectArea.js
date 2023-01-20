import { useState, useEffect } from "react"; 

import OneMapAPI from "../api/OneMapAPI"; 

import DetectLocationButton from "./DetectLocationButton"; 
import LeafletMap from "./LeafletMap"; 

function SelectArea() {

    let initialRender = true; 
    useEffect(() => {
        if (initialRender) {
            apiGetPlanningArea(); 
            // eslint-disable-next-line
            initialRender = false; 
        }
    }, [])

    const OneMapToken = "eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJzdWIiOjk2NTYsInVzZXJfaWQiOjk2NTYsImVtYWlsIjoicGhvZWJleWtxQGdtYWlsLmNvbSIsImZvcmV2ZXIiOmZhbHNlLCJpc3MiOiJodHRwOlwvXC9vbTIuZGZlLm9uZW1hcC5zZ1wvYXBpXC92MlwvdXNlclwvc2Vzc2lvbiIsImlhdCI6MTY3NDE2NDU4MSwiZXhwIjoxNjc0NTk2NTgxLCJuYmYiOjE2NzQxNjQ1ODEsImp0aSI6IjEwM2VlYzUzNTQ3NTgwNmQ1MGI5OWQzNWY3ZTg0NmQzIn0.wy7To0TUxuy5biHrcwf2pdu9DDRLX85kKU3QxJL7-H8"
    // token expires Monday 23rd Jan 2023

    const [AreaPolygonList, setAreaPolygonList] = useState([]); 

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

    const [polygon, setPolygon] = useState([]); 
    const [center, setCenter] = useState([1.343, 103.814]); 
    const [zoom, setZoom] = useState(12); 

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

    // eslint-disable-next-line
    const [SelectedOption, setSelectedOption] = useState(); 

    const [LocationDetected, setLocationDetected] = useState(false); 

    return (
        <>
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
            <LeafletMap
                polygon={polygon}
                LocationDetected={LocationDetected} setLocationDetected={setLocationDetected}
                center={center} zoom={zoom}
            />
        </>
    )
}

export default SelectArea; 