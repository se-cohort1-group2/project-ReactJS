import Button from "./Button"; 

function DetectLocationButton({ setLocationDetected, handlerGetDetectedLoc, setCenter, setZoom, setUserLatLong, flyToZoom }) {

    const handleClick = () => {
        navigator.geolocation.getCurrentPosition((p) => {
            console.log("CLICKED", { lat: p.coords.latitude, lng: p.coords.longitude }, "LOCATED")
            handlerGetDetectedLoc([p.coords.latitude,p.coords.longitude]); 
            setLocationDetected(true); 
            setUserLatLong([p.coords.latitude,p.coords.longitude]); 
            setCenter([p.coords.latitude,p.coords.longitude]); 
            setZoom(flyToZoom); 
        })
    }

    return (
        <>
            <Button label="Detect Location" onClick={handleClick} />
        </>
    )
}

export default DetectLocationButton; 