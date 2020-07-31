import ApiService from './api-service'

class AdminService extends ApiService{

    constructor(){
        super('')
    }

    cadastrar(credenciais){
        return this.post('/admins/inserir',credenciais)
    }

    autenticar(credenciais){
        return this.post('/admins/autenticar',credenciais)
    }

    obterId(id){
        return this.get(`/admins/${id}`)
    }

    lista(){
        return this.get('/admins')
    }

}

export default AdminService