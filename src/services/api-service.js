import axios from 'axios'
import LocalStorageService from './local-storage-service'

const httpCliente = axios.create({
    baseURL:'http://localhost:8080'
})

httpCliente.interceptors.request.use(async config =>{
    const token = LocalStorageService.obterItem('_admin_logado')
    if(token){
        config.headers.Authorization = `Bearer ${token.token}`
    }
    return config
})



class ApiService {

    constructor(apiUrl){
        this.apiUrl = apiUrl
    }

    post(url,obj){
        const requestUrl = `${this.apiUrl}${url}`
        return httpCliente.post(requestUrl,obj)
    }

    put(url,obj){
        const requestUrl = `${this.apiUrl}${url}`
        return httpCliente.put(requestUrl,obj)
    }

    delete(url){
        const requestUrl = `${this.apiUrl}${url}`
        return httpCliente.delete(requestUrl)
    }

    get(url){
        const requestUrl = `${this.apiUrl}${url}`
        return httpCliente.get(requestUrl)
    }
}

export default ApiService