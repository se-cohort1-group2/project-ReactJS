import { LatLng } from "leaflet";
import TaxiAvailabilityJSON from "./TaxiAvailability.json";


function CountTaxis({ marker, radius, setTaxiCount }) {

    const taxiList = (TaxiAvailabilityJSON);
    const selectedLoc = new LatLng(...marker);
    setTaxiCount(0);

    for (let i = 0; i < taxiList.value.length; i++) {
        const taxiMarker = new LatLng(taxiList.value[i].Latitude, taxiList.value[i].Longitude);
        //toDistance(): Returns the distance (in meters) to the given LatLng calculated using the Spherical Law of Cosines.
        if (selectedLoc.distanceTo(taxiMarker) < radius) {
            setTaxiCount(prevState => prevState + 1);
        }
    }
}

export default CountTaxis;