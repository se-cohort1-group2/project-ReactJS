import axios from "axios"; 

const BASE_URL = "https://developers.onemap.sg"; 

const OneMapAPI = axios.create({ baseURL: BASE_URL })

export default OneMapAPI; 