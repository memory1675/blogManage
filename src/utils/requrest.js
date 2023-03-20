import axios from "axios";
import nProgress from 'nprogress';
import 'nprogress/nprogress.css'
const request = axios.create({
    baseURL:'/api',
    timeout:4000
})


request.interceptors.request.use(config => {
    nProgress.start()
    return config
},err => {
    return Promise.reject(err)
})

request.interceptors.response.use(res => {
    nProgress.done()
    if(res.status == 200){
        return res.data
    }
},err => {
    return Promise.reject(err)
})

export default request