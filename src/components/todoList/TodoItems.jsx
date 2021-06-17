import React, { Component } from 'react';

export default class TodoItems extends Component {
    constructor(props) {
        super(props)
        this.state = {

        }
    }
    
    render() {
        const {item,index} = this.props
        return (
            <>
                <div  style={{display:'flex',justifyContent:'space-between'}}>
                         <li className="text-left" style={{cursor:'pointer'}} >{item.item} </li>  
                         <div style={{display:'flex',justifyContent:'space-between'}}>
                             <button className="btn-danger" onClick={() => this.props.handleDeleted(item.id,index)}>Delete</button>
                              <button className="btn-success" onClick={() => this.props.handleEdit(item)}>Edit</button> </div>
                </div>
            </>
        )
    }
}