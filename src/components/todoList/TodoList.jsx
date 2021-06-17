import React, { Component } from 'react';
import TodoItems from './TodoItems';
import TodoInput from '../todoInput/TodoInput';
import { Redirect } from 'react-router-dom'
import fire from '../../config';
import { connect } from 'react-redux';
import { EditAction } from '../../redux/Actions'
class TodoList extends Component {
    constructor(props) {
        super(props)
        const token = localStorage.getItem("key")
        let loggedIn = true
        if (token == null) {
            loggedIn = false
        }
        this.state = {
            item: '',
            itemError: '',
            loggedIn,
            items: [],

        }
        this.handleDeleted = this.handleDeleted.bind(this)
    }
    componentDidMount() {
        var data
        var db = fire.database()
        db.ref('todo-list/').on('value', (snap) => {
            data = []
            console.log(snap.val())
            snap.forEach((e) => {
                var obj = {
                    ...e.val(),
                    id: e.key
                }
                data.push(obj)
            })
            this.setState({ items: data })
        })
    }
    
    handleAddItem = e => {
        e.preventDefault();
        const { ite } = this.props
        const { item } = this.state
        console.log(ite, 'todo item.....')
        console.log(item, 'valueeeeee')

        if (item == '') { this.setState({ itemError: "Type Something..." }); }
        else {

            if (ite.id) {
                fire.database().ref('todo-list/' + ite.id).set({
                    item: item
                })
                this.props.editItem({})
                
            } else {
                fire.database().ref('todo-list/').push({ item: item })
            }
        }
        this.setState({ item: '' })
    }
    handleChangeValue = (event) => {
        this.setState({ item: event.target.value, itemError: '' })
    }
    handleDeleted = (e, i) => {
        console.log(i)
        let data = [...this.state.items]
        data.splice(i, 1)
        this.setState({ items: data })
        fire.database().ref(`todo-list/${e}`).remove();
    }
    handleEdit = (item) => {
        this.props.editItem(item)
        setTimeout(() => {
            const { ite } = this.props
            this.setState({ item: ite })
        }, 500)

    }
   
    render() {
        const { items, item, itemError } = this.state
        var token = localStorage.getItem('key');
        if (!token) {
            return <Redirect to="/" />
        }
        return (
            <>
                <div className="row">
                    <div className="col-lg-4"></div>
                    <div className="col-lg-4">
                        <h1>Todo List</h1>
                        <TodoInput listItem={item} itemError={itemError} handleChangeValue={this.handleChangeValue} handleAddItem={this.handleAddItem} />

                    </div>
                    <div className="col-lg-4"></div>
                </div>
                <div className="container">
                    <div className="row">
                        <div className="col-lg-4"></div>
                        <div className="col-lg-4">
                            {items.map((itm, idx) => {
                                return (
                                    <ul key={idx}>
                                        <TodoItems item={itm} index={idx} handleDeleted={this.handleDeleted} handleEdit={this.handleEdit} />
                                    </ul>
                                )
                            })}

                        </div>
                        <div className="col-lg-4"></div>
                    </div>

                </div>
            </>
        )
    }
}
const mapStateToProps = (state) => {
    return {
        ite: state.item
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        editItem: (item) => { dispatch(EditAction(item)) },
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(TodoList)