function DetectLocationButton({ setLocationDetected }) {

    const handleClick = () => {
        navigator.geolocation.getCurrentPosition((p) => {
            console.log("CLICKED", { lat: p.coords.latitude, lng: p.coords.longitude }, "LOCATED")
            setLocationDetected(true); 
        })
    }

    return (
        <>
            <button onClick={handleClick}>Detect Location</button>
        </>
    )
}

export default DetectLocationButton; 