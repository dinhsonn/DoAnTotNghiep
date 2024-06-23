import axios from "axios";

const httpAxios = axios.create({
    baseURL: 'http://10.17.8.164:8082/api/',
    timeout:10000,
    headers:{'X-Custom-Header':'foobar'},
   
})
export default httpAxios;