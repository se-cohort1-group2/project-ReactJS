import { LatLng } from "leaflet"; 

function CountTaxis({ marker, radius, setTaxiCount, taxiAvailabilityList }) {

    const taxiList = (taxiAvailabilityList); 
    const selectedLoc = new LatLng(...marker); 
    setTaxiCount(0); 

    for (let i = 0; i < taxiList.length; i++) {
        const taxiMarker = new LatLng(taxiList[i].Latitude, taxiList[i].Longitude); 
        // toDistance(): Returns the distance (in meters) to the given LatLng calculated using the Spherical Law of Cosines.
        if (selectedLoc.distanceTo(taxiMarker) < radius) {
            setTaxiCount(prevState => prevState + 1); 
        }
    }
}

export default CountTaxis; 