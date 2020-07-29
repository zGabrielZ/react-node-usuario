import React from 'react'
import Card from '../componentes/card'
import FormGroup from '../componentes/form-group'
import UsuarioService from '../services/usuario-service'
import { msgErro,msgSucesso, msgErroForm } from '../componentes/toastr'


class CadastroUsuario extends React.Component {

    constructor() {
        super()
        this.usuarioService = new UsuarioService()
    }

    state = {
        id: null,
        nome: '',
        sobrenome: '',
        funcao:'',
        salario:'',
        errorCampos: [],
        atualizando: false
    }

    componentDidMount() {
        const params = this.props.match.params
        if (params.id) {
            this.usuarioService.obterId(params.id)
                .then(response => {
                    this.setState({...response.data, atualizando: true })
                }).catch(error => {
                    msgErro(error.response.data.messagem)
                })
        }
    }

    cadastrar = () => {

        const usuario = {
            nome: this.state.nome,
            sobrenome: this.state.sobrenome,
            funcao: this.state.funcao,
            salario:parseFloat(this.state.salario)
        }

        this.usuarioService.cadastrar(usuario)
            .then(response => {     
                msgSucesso('Cadastrado com sucesso !')
                this.props.history.push('/consulta-usuario')
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

    atualizar = () => {

        const usuario = {
            id: this.state.id,
            nome: this.state.nome,
            sobrenome: this.state.sobrenome,
            funcao: this.state.funcao,
            salario:parseFloat(this.state.salario)
        }

        this.usuarioService.atualizar(usuario)
            .then(response => {
                msgSucesso('Atualizado com sucesso !')
                this.props.history.push('/consulta-usuario')
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
        this.props.history.push('/consulta-usuario')
    }
    
    render() {
        return (
            <Card title={this.state.atualizando ? 'Atualização de usuário' : 'Cadastro de usuário'}>
                <div className="row">
                    <div className="col-md-6">
                        <FormGroup id="nome" label="Nome : ">
                            <input type="text"
                                className="form-control" value={this.state.nome}
                                onChange={e => this.setState({ nome: e.target.value })}
                                id="nome" name="nome"
                                aria-describedby="nomeHelp"></input>
                        </FormGroup>
                    </div>
                    <div className="col-md-6">
                        <FormGroup id="sobrenome" label="Sobrenome : " htmlFor="sobrenome">
                            <input type="text"
                                className="form-control" value={this.state.sobrenome}
                                onChange={e => this.setState({ sobrenome: e.target.value })}
                                id="sobrenome" name="sobrenome"
                                aria-describedby="sobrenomeHelp"></input>
                        </FormGroup>
                    </div>
                    <div className="col-md-6">
                        <FormGroup id="funcao" label="Função : " htmlFor="funcao">
                            <input type="text"
                                className="form-control" value={this.state.funcao}
                                onChange={e => this.setState({ funcao: e.target.value })}
                                id="funcao" name="funcao"
                                aria-describedby="funcaoHelp"></input>
                        </FormGroup>
                    </div>
                    <div className="col-md-6">
                        <FormGroup id="salario" label="Salário : " htmlFor="salario">
                            <input type="text"
                                className="form-control" value={this.state.salario}
                                onChange={e => this.setState({ salario: e.target.value })}
                                id="salario" name="salario"
                                aria-describedby="salarioHelp"></input>
                        </FormGroup>
                    </div>
                    <div className="col-md-6">
                        {
                            this.state.atualizando ? (
                                <button className="btn btn-success" onClick={this.atualizar}>
                                    Atualizar
                                </button>
                            ) :
                                <button className="btn btn-success" onClick={this.cadastrar}>
                                    Cadastrar
                                </button>
                        }
                        <button onClick={this.voltar} className="btn btn-danger">
                            Voltar
                        </button>
                    </div>
                </div>
            </Card>
        )
    }

}

export default CadastroUsuario