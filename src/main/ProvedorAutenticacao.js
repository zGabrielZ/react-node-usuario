import React from 'react'
import AuthService from '../services/auth-service'
import { msgSucesso } from '../componentes/toastr'
import LocalStorageService from '../services/local-storage-service'

export const AuthContext = React.createContext()
export const AuthConsumer = AuthContext.Consumer
const AuthProvider = AuthContext.Provider

class ProvedorAutenticacao extends React.Component{
    
    state = {
        adminAutenticado:null,
        isAutenticado:false
    }
    
    iniciarSessao = (admin) =>{
        AuthService.logar(JSON.stringify(admin))
        this.setState({isAutenticado:true,adminAutenticado:admin})
        msgSucesso('Logado com sucesso !')
        
    }

    encerrarSessao = () =>{
        AuthService.removerAdminAutenticado()
        this.setState({isAutenticado:false,adminAutenticado:null})
        msgSucesso('Deslogado com sucesso !')
        
    }

    componentDidMount(){
        const admin = LocalStorageService.obterItem('_admin_logado')
        if(admin){
            this.setState({isAutenticado : true})
        }
     }

    render(){

        const context = {
            adminAutenticado:this.state.adminAutenticado,
            isAutenticado:this.state.isAutenticado,
            iniciarSessao:this.iniciarSessao,
            encerrarSessao:this.encerrarSessao
        }

        return(
            <AuthProvider value={context}>
                {this.props.children}
            </AuthProvider>
        )
    }
}

export default ProvedorAutenticacao