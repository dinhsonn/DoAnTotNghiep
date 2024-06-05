import axios from "axios";

const httpAxios = axios.create({
    baseURL: 'http://192.168.1.6:8082/api/',
    timeout:10000,
    headers:{'X-Custom-Header':'foobar'},
   
})
export default httpAxios;