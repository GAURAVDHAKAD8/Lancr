import axios from "axios";
const newRequest = axios.create({
  baseURL: "https://lancr-7cjc.onrender.com/api",
  withCredentials: true, // This allows sending cookies with requests
});

export default newRequest;