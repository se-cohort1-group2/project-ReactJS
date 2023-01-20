import LTAtaxiAPI from "../api/LTAtaxiAPI";

function funcGetTaxiAvailability(handler) {
    const taxiAPIGet = async () => {
        try {
            let arrlength = undefined;
            let taxiList = [];

            for (let i = 0; i < 10000; i += 500) {
                console.log(`/Taxi-Availability?$skip=${i}`)
                const response = await LTAtaxiAPI.get(`/Taxi-Availability?$skip=${i}`)
                arrlength = response.data.value.length;
                console.log(arrlength);

                if (arrlength !== 0) {
                    let newData = response.data.value;
                    taxiList = [...taxiList, ...newData];
                } else {
                    handler(taxiList);
                    return console.log("End of data load", taxiList);
                }
            }
        } catch (error) {
            console.log(error.message)
            alert(`Unable to retrieve taxi availability information: ${error.message}`)
        }
    }
    taxiAPIGet();
}

export default funcGetTaxiAvailability;
