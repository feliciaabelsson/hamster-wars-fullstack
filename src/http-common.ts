import axios from "axios";

export default axios.create({
    baseURL: "http://localhost:1337/hamsters/",
    headers: {
        "Content-type": "application/json"
    }
});