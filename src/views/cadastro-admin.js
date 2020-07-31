import React from 'react'
import Card from '../componentes/card'
import FormGroup from '../componentes/form-group'
import AdminService from '../services/admin-service'
import { msgSucesso, msgErroForm } from '../componentes/toastr'
import { AuthContext } from '../main/ProvedorAutenticacao'
import { withRouter } from 'react-router-dom'
import '../css/login-estilo.css'

class CadastroAdmin extends React.Component {


    state = {
        nome: '',
        email: '',
        senha: '',
        errorCampos: []
    }

    constructor() {
        super()
        this.adminService = new AdminService()
    }

    componentDidMount(){
        if(this.context.isAutenticado){
            this.context.encerrarSessao()
        }
    }

    cadastrar = () => {

        const admin = {
            nome: this.state.nome,
            email: this.state.email,
            senha: this.state.senha
        }

        this.adminService.cadastrar(admin)
            .then(response => {
                msgSucesso('Cadastrado com sucesso !')
                this.props.history.push('/login')
            }).catch(error => {
                const camposErro = []
                const falha = error.response.data.error.errors
                if (falha) {
                    falha.map((itemError) => {
                        msgErroForm('Erro', itemError.message)
                        camposErro.push(itemError)
                        return itemError
                    })
                    this.setState({ errorCampos: camposErro })
                }
            })

    }

    voltar = () => {
        this.props.history.push('/login')
    }

    render() {

        return (
            <Card title="Cadastro de administrador">
                <div className="row">
                    <div className="col-lg-12">
                        <div className="bs-component">
                            <FormGroup id="nome" label="Nome : " htmlFor="nome">
                                <input type="text" value={this.state.nome}
                                    onChange={e => this.setState({ nome: e.target.value })}
                                    className="form-control"
                                    id="nome" name="nome"
                                    aria-describedby="nomeHelp" placeholder="Digite seu nome"></input>
                            </FormGroup>
                            <FormGroup id="email" label="Email : " htmlFor="email">
                                <input type="email" value={this.state.email}
                                    onChange={e => this.setState({ email: e.target.value })}
                                    className="form-control"
                                    id="email" name="email"
                                    aria-describedby="emailHelp" placeholder="Digite seu email"></input>
                                <small id="email" className="form-text text-muted">Não compartilhamos seu email com mais ninguém</small>
                            </FormGroup>
                            <FormGroup id="nome" label="Senha : " htmlFor="senha">
                                <input type="password" value={this.state.senha}
                                    onChange={e => this.setState({ senha: e.target.value })}
                                    className="form-control"
                                    id="senha" name="senha"
                                    aria-describedby="senhaHelp" placeholder="Digite sua senha"></input>
                            </FormGroup>
                            <button className="btn btn-success" onClick={this.cadastrar}>
                                Cadastrar
                                </button>
                            <button onClick={this.voltar} className="btn btn-danger dois-bt">
                                Voltar
                            </button>
                        </div>
                    </div>
                </div>
            </Card>
        )
    }

}

CadastroAdmin.contextType = AuthContext
export default withRouter(CadastroAdmin)