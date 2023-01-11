import axios from "axios"; 

const BASE_URL = "http://datamall2.mytransport.sg/ltaodataservice"; 
const CROSS_DOMAIN = "https://cors-anywhere.herokuapp.com"; 
const REQUEST_URL = `${CROSS_DOMAIN}/${BASE_URL}`; 

const LTAtaxiAPI = axios.create({
    baseURL: REQUEST_URL, 
    headers: {
        AccountKey: `${process.env.REACT_APP_LTA_API_KEY}`, 
        accept: "application/json", 
    }
})

export default LTAtaxiAPI; 