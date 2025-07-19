import axios from "axios";
const newRequest = axios.create({
  baseURL: "http://localhost:8800/api",
  withCredentials: true, // This allows sending cookies with requests
});

export default newRequest;