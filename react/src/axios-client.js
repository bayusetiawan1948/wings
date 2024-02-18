import axios from "axios";

const instance = axios.create({
    baseUrl: "http://locahost:8000/api",
});

export default instance;
