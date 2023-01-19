import OneMapAPI from "../api/OneMapAPI";

function funcGetLocDetails([lat,long], handler){
    
    const searchParams = {
        latitude: lat,
        longitude: long,
        buffer: 10,
        addressType: "All",
        token: "eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJzdWIiOjk2NzQsInVzZXJfaWQiOjk2NzQsImVtYWlsIjoibHllLnlvbmcueGluLjk2NjBAZ21haWwuY29tIiwiZm9yZXZlciI6ZmFsc2UsImlzcyI6Imh0dHA6XC9cL29tMi5kZmUub25lbWFwLnNnXC9hcGlcL3YyXC91c2VyXC9zZXNzaW9uIiwiaWF0IjoxNjczNzYzNjk0LCJleHAiOjE2NzQxOTU2OTQsIm5iZiI6MTY3Mzc2MzY5NCwianRpIjoiODRjNTA4YmE3ZjUxZjkwNTdhZjg1ODBlMDY4ZGZlMmUifQ.5eWWvN2RThAzy7TXft0tSqgIxk16fJkFcFWsvIoNWMM"
    }

    let resultList = [];

    const apiGet = async () => {

        try {
            const response = await OneMapAPI.get(`/privateapi/commonsvc/revgeocode?location=${searchParams.latitude},${searchParams.longitude}&token=${searchParams.token}&buffer=${searchParams.buffer}&addressType=${searchParams.addressType}`)

            const convertResults = {...response.data.GeocodeInfo}
            console.log(convertResults);     


            for (const [key, details] of Object.entries(convertResults)) {
                
                let result = {
                    ADDRESS: null,
                    BLOCK: null,
                    BUILDINGNAME: null,
                    ROAD: null,
                    POSTALCODE: null,
                    LATITUDE: null,
                    LONGITUDE: null
                }
                for (const[key,value] of Object.entries(details)){
                    result[key] = value
                    console.log(`${key}: ${value}`);
                }

                if (result.ADDRESS === null) {
                    
                    let address;

                    if (result.BLOCK !== null && result.BLOCK !== "null" && result.BLOCK !== "NIL") address = result.BLOCK
                    if (result.ROAD !== null && result.ROAD !== "null" && result.ROAD !== "NIL") address = address +" "+ result.ROAD
                    if (result.BUILDINGNAME !== null && result.BUILDINGNAME !== "null"&& result.BUILDINGNAME !== "NIL") address = address +" "+ result.BUILDING
                    if (result.POSTALCODE !== null && result.POSTALCODE !== "null" && result.POSTALCODE !== "NIL"&& result.POSTALCODE !== "") address = address + " SINGAPORE " + result.POSTALCODE
                    
                    address = address.replace("undefined", "")
                    address = address.replace("null", "")

                    result.ADDRESS = address;
                }

                resultList= [...resultList,result]
              }

            console.log(resultList);
            handler(0,resultList[0]);
        
        } catch (error) {
            console.log(error.message);
        }
    }

    apiGet();
}

export default funcGetLocDetails;