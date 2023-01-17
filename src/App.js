import './App.css';
// import the API connection
import ConnAPI from "./api/ConnAPI";
import CountNearby from './CountNearby';
import { useState, useEffect } from "react";

function App() {
  const [coordPairs, setCoordPairs] = useState([]);

  // function that gets the data from the API
  const apiGet = async () => {
    try {
      const response = await ConnAPI.get("/Taxi-Availability");
      setCoordPairs(response.data.value);
      // console.log(response.data.value);
    } catch (error) {
      console.log(error.message);
    }
  }

  // before the return,
  // use the useEffect hook to run apiGet when the application starts
  useEffect(() => {
    apiGet();
  }, []);

  return (
    <div className="App">
      <h1>Taxi Availability App</h1>
      <CountNearby latLon = {coordPairs} />
    </div>
  );
}

export default App;
