import "./GetAddress.css"; 

import { useState, useEffect } from "react"; 

import OneMapAPI from "../api/OneMapAPI"; 

function GetAddress({ Lat, Long }) {

    const OneMapToken = "eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJzdWIiOjk2NTYsInVzZXJfaWQiOjk2NTYsImVtYWlsIjoicGhvZWJleWtxQGdtYWlsLmNvbSIsImZvcmV2ZXIiOmZhbHNlLCJpc3MiOiJodHRwOlwvXC9vbTIuZGZlLm9uZW1hcC5zZ1wvYXBpXC92MlwvdXNlclwvc2Vzc2lvbiIsImlhdCI6MTY3Mzg2Mjg2NSwiZXhwIjoxNjc0Mjk0ODY1LCJuYmYiOjE2NzM4NjI4NjUsImp0aSI6ImIyMTc1YmJjZTE0N2FiMmZjOTJkZmEyZGNiZjczMzBmIn0.F5hSL5YmIbkY2isTnyaSOPZHRKPjeR7vjnwPwyWWbfM"
    // token expires Thursday 19th Jan 2023

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
                    <div>{data.BUILDINGNAME}</div>
                    <div>{data.BLOCK} {data.ROAD}</div>
                    {data.POSTALCODE && <div>SINGAPORE {data.POSTALCODE}</div>}
                </div>
            )
        })}
        </>
    )
}

export default GetAddress; 