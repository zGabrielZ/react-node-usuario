import React from 'react'
import Card from '../componentes/card'
import FormGroup from '../componentes/form-group'
import { withRouter } from 'react-router-dom'
import AdminService from '../services/admin-service'
import { AuthContext } from '../main/ProvedorAutenticacao'
import {msgErro} from '../componentes/toastr'
import '../css/login-estilo.css'

class Login extends React.Component {


    constructor() {
        super()
        this.adminService = new AdminService()
    }


    state = {
        email: '',
        senha: '',
        errorCampos: []
    }


    componentDidMount(){
        if(this.context.isAutenticado){
            this.props.history.push('/consulta-usuario')
        }
    }


    entrar = () => {
        this.adminService.autenticar({
            email: this.state.email,
            senha: this.state.senha
        }).then(response => {
            this.context.iniciarSessao(response.data)
            this.props.history.push('/consulta-usuario')
        }).catch(error => {
            console.log(error.response)
            msgErro(error.response.data.error)
        })
    }

    cadastrar = () => {
        this.props.history.push('/cadastro-admin')
    }


    render() {
        return (
            <div className="row">
                <div className="col-md-12">
                    <div className="bs-docs-section">
                        <Card title="Login">
                            <div className="row">
                                <div className="col-lg-12">
                                    <div className="bs-component">
                                        <fieldset>
                                            <FormGroup label="Email : " htmlFor="email">
                                                <input type="email" value={this.state.email}
                                                    onChange={e => this.setState({ email: e.target.value })}
                                                    className="form-control"
                                                    id="email" name="email"
                                                    aria-describedby="emailHelp" placeholder="Digite seu email"></input>
                                                <small id="email" className="form-text text-white">Não compartilhamos seu email com mais ninguém</small>
                                            </FormGroup>
                                            <FormGroup label="Senha : " htmlFor="senha">
                                                <input type="password" value={this.state.senha}
                                                    onChange={e => this.setState({ senha: e.target.value })}
                                                    className="form-control"
                                                    id="senha" name="senha"
                                                    aria-describedby="senhaHelp" placeholder="Digite sua senha"></input>
                                            </FormGroup>

                                            <button className="btn btn-success" onClick={this.entrar}>
                                                Entrar
                                                </button>
                                            <button onClick={this.cadastrar} className="btn btn-danger dois-bt">
                                                Cadastrar
                                                </button>
                                        </fieldset>
                                    </div>
                                </div>
                            </div>
                        </Card>
                    </div>
                </div>
            </div>
        )
    }

}

Login.contextType = AuthContext

export default withRouter(Login)