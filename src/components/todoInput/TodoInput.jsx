import React, { Component } from 'react';

class TodoInput extends Component {
    constructor(props) {
        super(props)
        this.state = {
            
        }
    }

    render() {
        const {listItem} = this.props
        return (
            <>
                <form onSubmit={this.props.handleAddItem}>
                    <div style={{ display: 'flex', justifyContent: 'flex-start' }}><label htmlFor="">Type:</label></div>
                    <input type="text" className="form-control" value={listItem && listItem.item} onChange={this.props.handleChangeValue} placeholder="Tpype..." />
                    
                    <div style={{ textAlign: 'left', fontSize: '1rem' }}>
                        {this.props.itemError ?
                            <p style={{ color: 'red' }}>{this.props.itemError}</p>
                            : null
                        }
                    </div>
                    <button type="submit" className="btn btn-primary btn-block btn-flat " style={{ margin: '20px 0' }}>Add Item</button>
                </form>
            </>
        )
    }
}



export default TodoInput 