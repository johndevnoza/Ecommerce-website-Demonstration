import axios from "axios";
const apiUrl: string = import.meta.env.VITE_API_BASE_URL;

export default axios.create({
  baseURL: apiUrl,
});
