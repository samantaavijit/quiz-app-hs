import Axios from "axios";

const axios = Axios.create({
  baseURL: "http://localhost:8003/api", //local
  // baseURL: "http://44.208.45.69/api", //PROD
});

export default axios;
