import Axios from "axios";

const axios = Axios.create({
  // baseURL: "http://localhost:8003/api", //LOCAL
  baseURL: "https://avijit-samanta-class12-api.vercel.app/api", //PROD
});

export default axios;
