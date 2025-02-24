import axios from 'axios'
import { responseInterceptor } from './interceptors/responseInterceptor';
import { errorInterceptor } from './interceptors/erroInterceptor';
import { Environment } from '../../../environment/environment';

const Api = axios.create({
    baseURL: Environment.URL_BASE
});

Api.interceptors.response.use(
   (response)=>responseInterceptor(response),
   (error)=> errorInterceptor(error)
)
export {Api};