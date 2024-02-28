import Axios from "axios";

const axios = Axios.create({
  baseURL: "http://localhost:8003/api", //local
});

export default axios;
