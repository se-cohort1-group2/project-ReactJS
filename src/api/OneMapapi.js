import axios from "axios";

const BASE_URL = "https://developers.onemap.sg/privateapi";
const CROSS_DOMAIN = "https://cors-anywhere.herokuapp.com";
const REQUEST_URL = `${CROSS_DOMAIN}/${BASE_URL}`;

const OneMapapi = axios.create({
    baseURL: REQUEST_URL,

    // headers: {
    //     Authorization: `Bearer ${process.env.REACT_APP_ONEMAP_API_KEY}`,
    //     accept: "application/json", 
    // },
});

export default OneMapapi; 