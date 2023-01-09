import "./App.css"; 

import LTAapi from "./api/LTAapi"; 

import { useEffect } from "react"; 

function App() {

    const apiGet = async() => {
        try {
            const response = await LTAapi.get("/Taxi-Availability")
            console.log(response.data.value)
        } catch (error) {
            console.log(error.message)
        }
    }

    useEffect(() => {
        apiGet(); 
    }, [])

    return (
        <>
        <div className="App">
            <h1>React App</h1>
        </div>
        </>
    )
}

export default App; 