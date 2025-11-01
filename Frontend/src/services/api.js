import axios from "axios"; // Importing the axios library to handle HTTP requests


export default axios.create({ // Creating an axios instance 
  baseURL: "http://localhost:7800", // backnd running
  headers: { "Content-Type": "application/json" } // for JSON data exchange
});
