import axios from "axios";

const BASE_URL = 'https://cors-anywhere.herokuapp.com/http://datamall2.mytransport.sg/ltaodataservice';

// create the connection
const ConnAPI = axios.create({baseURL: BASE_URL, headers: {'AccountKey': 'uYbq9AZTR7CB+Xl/E2WRzQ=='}});

export default ConnAPI;
