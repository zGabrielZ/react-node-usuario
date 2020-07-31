import React from 'react'
import UsuarioService from '../services/usuario-service'
import Card from '../componentes/card'
import FormGroup from '../componentes/form-group'
import currencyFormatter from 'currency-formatter'
import { msgErro, msgAlerta, msgSucesso } from '../componentes/toastr'
import { AuthContext } from '../main/ProvedorAutenticacao'
import AdminService from '../services/admin-service'
import LocalStorageService from '../services/local-storage-service'
import '../css/consulta-usuario-estilo.css'

class ConsultaUsuario extends React.Component {


    constructor() {
        super()
        this.usuarioService = new UsuarioService()
        this.adminService = new AdminService()
    }

    state = {
        nome: '',
        funcao: '',
        usuarios: []
    }

    componentDidMount() {
        this.usuarioService.lista()
            .then(response => {
                this.setState({ usuarios: response.data })
            }).catch(erro => {
                msgErro(erro.response.data.messagem)
            })
        const adminLogado = LocalStorageService.obterItem('_admin_logado')

        this.adminService.obterId(adminLogado.id
            ).then(response => {
                this.setState({ nome: response.data.nome })
            }).catch(error => {
                msgErro('Nome não encontrado')
            })
    }

    cadastrar = () => {
        this.props.history.push('/usuario')
    }

    buscar = () => {
        if (!this.state.funcao) {
            msgAlerta('O campo função não pode ser vazio')
            this.componentDidMount()
            return false
        }

        this.usuarioService.consultar({
            funcao: this.state.funcao
        }).then(response => {
            if (response.data.length < 1) {
                msgAlerta('Nenhum resultado encontrado')
            }
            this.setState({ usuarios: response.data })
        }).catch(erro => {
            msgErro(erro.response.data.messagem)
        })
    }

    deletar = (id) => {
        this.usuarioService.deletar(id)
            .then(response => {
                if (response.data != null) {
                    msgSucesso('Usuário removido com sucesso !!')
                    this.setState({
                        usuarios: this.state.usuarios
                            .filter(usuario => usuario.id !== id)
                    })
                }
            }).catch(erro => {
                msgErro(erro.response.data.messagem)
            })
    }

    edicao = (id) => {
        this.props.history.push(`/usuario/${id}`)
    }

    render() {
        const { usuarios } = this.state
        return (

            <Card title="Bem vindo">
                <Card>
                <div className="jumbotron">
                    <h1 style={{color:'black'}} className="display-3">Bem vindo, {this.state.nome}</h1>
                    <p style={{color:'black'}} className="lead">Este é um CRUD de usuários, pode usar a qualquer momento!!</p>
                    <p className="lead">
                        { <button onClick={this.context.encerrarSessao} className="btn btn-danger">
                            Deslogar
                        </button> }
                    </p>
                </div> 
            </Card>
                <div className="row">
                    <div className="col-lg-12">
                        <div className="bs-component">
                            <FormGroup id="buscar" label="Buscar função : " htmlFor="buscar">
                                <input type="text"
                                    className="form-control"
                                    value={this.state.funcao}
                                    onChange={(e) => this.setState({ funcao: e.target.value })}
                                    id="buscar" name="buscar"
                                    aria-describedby="buscarHelp" placeholder="Digite sua busca"></input>
                            </FormGroup>
                            <div>
                                <button
                                    className="btn btn-success um-bt" onClick={this.buscar}>
                                    Procurar
                            </button>
                                <button className="btn btn-primary dois-bt" onClick={this.cadastrar}>
                                    Cadastrar
                            </button>
                            </div>
                        </div>
                    </div>
                </div>
                <br />
                <div className="row">
                    <div className="col-md-12">
                        <div className="bs-component">
                            <table className="table table-primary">
                                <thead>
                                    <tr className="table-danger">
                                        <th scope="col">Código</th>
                                        <th scope="col">Nome</th>
                                        <th scope="col">Sobrenome</th>
                                        <th scope="col">Função</th>
                                        <th scope="col">Salário</th>
                                        <th scope="col">Excluir</th>
                                        <th scope="col">Editar</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {
                                        usuarios.length ?
                                            usuarios.map(usuario => {
                                                return (
                                                    <tr key={usuario.id}>
                                                        <td>{usuario.id}</td>
                                                        <td>{usuario.nome}</td>
                                                        <td>{usuario.sobrenome}</td>
                                                        <td>{usuario.funcao}</td>
                                                        <td>{currencyFormatter.format(usuario.salario, { locale: 'pt-BR' })}</td>
                                                        <td><button title="Deletar"
                                                            className="btn btn-warning"
                                                            onClick={() =>
                                                                window.confirm(`Deseja excluir este usuário : ${usuario.nome} ${usuario.sobrenome} ?`) &&
                                                                this.deletar(usuario.id)
                                                            }
                                                        >
                                                            <i className="pi pi-trash"></i>
                                                        </button></td>
                                                        <td><button title="Editar"
                                                            className="btn btn-secondary"
                                                            onClick={this.edicao.bind(this, usuario.id)}>
                                                            <i className="pi pi-pencil"></i>
                                                        </button></td>
                                                    </tr>
                                                )
                                            }) : null
                                    }
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>
            </Card>
        )
    }

}

ConsultaUsuario.contextType = AuthContext
export default ConsultaUsuario