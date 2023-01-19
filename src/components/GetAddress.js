import "./GetAddress.css"; 

import { useState, useEffect } from "react"; 

import OneMapAPI from "../api/OneMapAPI"; 

function GetAddress({ Lat, Long }) {

    const OneMapToken = "eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJzdWIiOjk2NTYsInVzZXJfaWQiOjk2NTYsImVtYWlsIjoicGhvZWJleWtxQGdtYWlsLmNvbSIsImZvcmV2ZXIiOmZhbHNlLCJpc3MiOiJodHRwOlwvXC9vbTIuZGZlLm9uZW1hcC5zZ1wvYXBpXC92MlwvdXNlclwvc2Vzc2lvbiIsImlhdCI6MTY3NDE2NDU4MSwiZXhwIjoxNjc0NTk2NTgxLCJuYmYiOjE2NzQxNjQ1ODEsImp0aSI6IjEwM2VlYzUzNTQ3NTgwNmQ1MGI5OWQzNWY3ZTg0NmQzIn0.wy7To0TUxuy5biHrcwf2pdu9DDRLX85kKU3QxJL7-H8"
    // token expires Monday 23rd Jan 2023

    const [GeocodeInfo, setGeocodeInfo] = useState([]); 

    const apiGetAddress = async() => {
        try {
            const response = await OneMapAPI.get(`/privateapi/commonsvc/revgeocode?location=${Lat},${Long}&token=${OneMapToken}`)
            let objectJSON = JSON.parse(response.request.responseText)
            setGeocodeInfo(objectJSON.GeocodeInfo)
            console.log(response.request.responseText)
        } catch (error) {
            console.log(error.message)
        }
    }
    let newRender = true; 
    useEffect(() => {
        if (newRender) {
            apiGetAddress(); 
            // eslint-disable-next-line
            newRender = false; 
        }
    }, [])

    return (
        <>
        {GeocodeInfo.map(data => {
            return (
                <div key={data.id}>
                    <div className="popup-TaxiAvailable-GetAddress">Nearby Location: </div>
                    { (data.BUILDINGNAME === "null") ? null : (<div>{data.BUILDINGNAME}</div>) }
                    { (data.ROAD === "NIL") ? null : (<div>{data.BLOCK} {data.ROAD}</div>) }
                    {data.POSTALCODE && <div>SINGAPORE {data.POSTALCODE}</div>}
                </div>
            )
        })}
        </>
    )
}

export default GetAddress; 