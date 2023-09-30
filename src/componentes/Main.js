import React, { Component } from "react";
import './Main.css';

//icones do formulário
import { FaPlus } from 'react-icons/fa'

//icones da lista de tarefas
import { FaEdit, FaWindowClose } from 'react-icons/fa'


export default class Main extends Component {

    state = {
        novaTarefa: '', //nova tarefa a ser acrescentada no array
        tarefas: [], //array de tarefas

    };

componentDidMount(){
        let tarefas = JSON.parse(localStorage.getItem('tarefas'));
        if(!tarefas) return;
        this.setState({tarefas});
    }
    componentDidUpdate(prevProps,prevState){
        let {tarefas} = this.state;
        if (tarefas === prevState.tarefas) return;
        localStorage.setItem('tarefas',JSON.stringify(tarefas))
    }

    handleSubmit = (e) => {
        e.preventDefault()
        const { tarefas, index } = this.state; //variável de estado
        let { novaTarefa } = this.state; //valor q vem do form
        novaTarefa = novaTarefa.trim();//atribui o que vem do input sem espaços

        if (tarefas.indexOf(novaTarefa) !== -1) return; //verifica se a tarefa já 
        //existe para não repetir

        const novasTarefas = [...tarefas] //variável recebe o array de tarefas(...copia) 
        //pq não ppde mudar o estado diretamente

        if (index === -1) { //então é uma nova tarefa CRIAR
            this.setState({
                tarefas: [...novasTarefas, novaTarefa], //estado recebe nova tarefa
                novaTarefa: '', //limpa o input
            })
        } else {//então é uma tarefa já existente EDITAR
            novasTarefas[index] = novaTarefa //muda o valor da tarefa nesse índice

            this.setState({
                tarefas: [...novasTarefas], //estado recebe a cópia das tarefas atualizadas
                index: -1,//aponta q já editou e atualiza para -1
            })

        }

    }

    handleChange = (e) => {
        this.setState({
            novaTarefa: e.target.value,
        });
    }
    handleEdit = (e, index) => {
        const { tarefas } = this.state;
        this.setState({
            index,
            novaTarefa: tarefas[index]
        })
    }
    handleDelete = (e, index) => {
        const { tarefas } = this.state;
        const novasTarefas = [...tarefas];
        novasTarefas.slice(index, 1);
        this.setState({
            tarefas: [...novasTarefas]
        })
    }

    render() {
        const { novaTarefa, tarefas } = this.state;
        return (
            <div className="main">

                <form onSubmit={this.handleSubmit} action="#" className="form">
                    <div className="h1-input">
                        <h1>CRUD - Lista de tarefas com React </h1>
                        <input
                            onChange={this.handleChange}
                            type="text"
                            value={novaTarefa}>
                        </input>
                        <button type="submit"><FaPlus /></button>
                    </div>
                    <ul className="listaTarefas">
                        {tarefas.map((tarefa, index) => {
                            return <li key={tarefa}>
                                {tarefa}
                                <div className="item-lista">
                                    <FaEdit
                                        onClick={(e) => this.handleEdit(e, index)}
                                        className="edit" />
                                    <FaWindowClose
                                        onClick={(e) => this.handleDelete(e, index)}
                                        className="close" />
                                </div>
                            </li>
                        })}
                    </ul>
                </form>
            </div>
        )
    }
}
