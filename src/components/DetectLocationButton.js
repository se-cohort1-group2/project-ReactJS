import Button from "./Button";
function DetectLocationButton({ setLocationDetected }) {

    const handleClick = () => {
        navigator.geolocation.getCurrentPosition((p) => {
            console.log("CLICKED", { lat: p.coords.latitude, lng: p.coords.longitude }, "LOCATED")
            setLocationDetected(true); 
        })
    }

    return (
        <>
            <Button label="Detect Location" onClick={handleClick}/>
        </>
    )
}

export default DetectLocationButton; 