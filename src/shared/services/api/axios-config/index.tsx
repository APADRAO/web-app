import axios from 'axios'
import { responseInterceptor } from './interceptors/responseInterceptor';
import { errorInterceptor } from './interceptors/erroInterceptor';
import { Environment } from '../../../environment/environment';

const Api = axios.create({
    baseURL: Environment.URL_BASE
    /*,
    headers: {
        Authorization: `Bearer ${JSON.parse(sessionStorage.getItem('APP_ACCESS_TOKEN')||'')}`
    }*/
});

Api.interceptors.response.use(
   (response)=>responseInterceptor(response),
   (error)=> errorInterceptor(error)
)
export {Api};