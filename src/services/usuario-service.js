import ApiService from './api-service'

class UsuarioService extends ApiService{

    constructor(){
        super('')
    }

    cadastrar(credenciais){
        return this.post('/usuarios/inserir',credenciais)
    }
    
    atualizar(credenciais){
        return this.put(`/usuarios/${credenciais.id}`,credenciais)
    }

    obterId(id){
        return this.get(`/usuarios/${id}`)
    }

    lista(){
        return this.get('/usuarios')
    }

    consultar(usuario){
        return this.post(`/usuarios?funcao=${usuario.funcao}`)
    }

    deletar(id){
        return this.delete(`/usuarios/${id}`)
    }

}

export default UsuarioService