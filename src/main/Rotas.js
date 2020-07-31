import React from 'react'
import {Route,Switch,HashRouter,Redirect} from 'react-router-dom'
import Login from '../views/login'
import CadastroAdmin from '../views/cadastro-admin'
import ConsultaUsuario from '../views/consulta-usuario'
import CadastroUsuario from '../views/cadastro-usuario'
import { AuthConsumer } from '../main/ProvedorAutenticacao'


function RotaAutenticada({component:Component,isAdminAutenticado,...props}){
    return (
        <Route {...props} render={(componentProps)=>{
            if(isAdminAutenticado){
                return (
                    <Component {...componentProps} />
                )
            }
            else{
                return(
                    <Redirect to={{pathname:'/login',state:{from:componentProps.location}}}  />
                )
            }
        }}/>
    )
}

function Rotas(props){
    return(
        <HashRouter>
            <Switch>
                <Route path="/login" component={Login}></Route>
                <Route path="/cadastro-admin" component={CadastroAdmin}></Route>
                
                <RotaAutenticada isAdminAutenticado={props.isAdminAutenticado} path="/consulta-usuario" component={ConsultaUsuario}/>
                <RotaAutenticada isAdminAutenticado={props.isAdminAutenticado} path="/usuario/:id?" component={CadastroUsuario}/>
            </Switch>
        </HashRouter>
    )
}

export default () =>(
    <AuthConsumer>
        {
            (context) => (<Rotas isAdminAutenticado={context.isAutenticado}  />)
        }
    </AuthConsumer>
)