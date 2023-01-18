import React, { useState, useEffect } from 'react';

const CurCoord = (props) => {
  const [lat, setLat] = useState(null);
  const [lng, setLng] = useState(null);
  const [status, setStatus] = useState(null);

  const getLocation = () => {
    if (!navigator.geolocation) {
      setStatus('Geolocation is not supported by your browser');
    } else {
      setStatus('Locating...');
      navigator.geolocation.getCurrentPosition((position) => {
        setStatus(null);
        setLat(position.coords.latitude);
        setLng(position.coords.longitude);
      }, () => {
        setStatus('Unable to retrieve your location');
      });
      props.onCurrentCoord(lat, lng);
    }
  }

  useEffect(() => {
    getLocation();
  }, [lat, lng])

  return (
    <div className="App">
      <button onClick={getLocation}>Get Location</button>
      <h1>Present Coordinates</h1>
      <p>{status}</p>
      {lat && <p>Latitude: {lat}</p>}
      {lng && <p>Longitude: {lng}</p>}
    </div>
  );
}

export default CurCoord;
