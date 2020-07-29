import React from 'react'
import { Route, Switch, HashRouter } from 'react-router-dom'
import CadastroUsuario from '../views/cadastro-usuario'
import ConsultaUsuario from '../views/consulta-usuario'
import Login from '../views/login'

class Rota extends React.Component {
    render() {
        return (
            <HashRouter>
                <Switch>
                    <Route path="/consulta-usuario" component={ConsultaUsuario}></Route>
                    <Route path="/usuario/:id?" component={CadastroUsuario}></Route>                                    
                    <Route path="/" component={Login}></Route> 
                </Switch>
            </HashRouter>
        )
    }
}

export default Rota