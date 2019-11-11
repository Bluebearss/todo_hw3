import React, { Component } from 'react';
import { Redirect } from 'react-router-dom'
import { connect } from 'react-redux';
import { compose } from 'redux';
import ItemsList from './ItemsList.js'
import { firestoreConnect } from 'react-redux-firebase';

class ListScreen extends Component {
    state = {
        name: '',
        owner: '',
    }

    handleChange = (e) => {
        const { target } = e;

        this.setState(state => ({
            ...state,
            [target.id]: target.value,
        }));
    }

    render() {
        const auth = this.props.auth;
        const todoList = this.props.todoList;
        if (!auth.uid) {
            return <Redirect to="/" />;
        }

        if(!todoList)
        {
            return <React.Fragment />
        }

        return (
            <div className="container todo-list">
                <br />
                <div className="list-heading-container">
                    <h5 className="grey-text text-darken-3 list-heading">Todo List</h5>
                    <div className="list-trash">&#x1f5d1;</div>
                </div>
                <br />
                <br />
                <br />
                <div className="input-field">
                    <label htmlFor="email">Name:</label>
                    <input className="active" type="text" name="name" id="name" onChange={this.handleChange} value={todoList.name} />
                </div>
                <div className="input-field">
                    <label htmlFor="password">Owner:</label>
                    <input className="active" type="text" name="owner" id="owner" onChange={this.handleChange} value={todoList.owner} />
                </div>
                <div id="list-items-container">
                    <div className="list_item_header_card">
                        <div className="list_item_task_header">
                            Task
                        </div>
                        <div className="list_item_due_date_header">
                            Due Date
                        </div>
                        <div className="list_item_status_header">
                            Status
                        </div>
                    </div>

                    <ItemsList todoList={todoList} />
                    <div className = "list_item_add_card center-align">
                        +
                    </div>

                </div> 
            </div>
        );
    }
}

const mapStateToProps = (state, ownProps) => {
  const { id } = ownProps.match.params;
  const { todoLists } = state.firestore.data;
  const todoList = todoLists ? todoLists[id] : null;

  if(todoList)
  {
    todoList.id = id;
  }

  return {
    todoList,
    auth: state.firebase.auth,
  };
};

export default compose(
  connect(mapStateToProps),
  firestoreConnect([
    { collection: 'todoLists' },
  ]),
)(ListScreen);