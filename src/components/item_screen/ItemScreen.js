import React, { Component } from 'react';
import { Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import { compose } from 'redux';
import { firestoreConnect } from 'react-redux-firebase';
import { addItemHandler } from '../../store/database/asynchHandler';

class ItemScreen extends Component {
    state = {
        key: this.props.todoItem.key,
        description: this.props.todoItem.description,
        due_date: this.props.todoItem.due_date,
        assigned_to: this.props.todoItem.assigned_to,
        completed: this.props.todoItem.completed
    }

    cancelItemChanges = () => {
        const todoList = this.props.todoList;
        this.props.history.push("/todoList/" + todoList.id);
    }

    handleChange = (e) => {
        const { target } = e;

        this.setState(state => ({
            ...state,
            [target.id]: target.value,
        }));
    }

    handleCheckBoxChange = (e) => {
        const { target } = e;

        this.setState(state => ({
            ...state,
            [target.id]: target.checked,
        }));
    }

    handleSubmitItemChanges = (e) => {
        e.preventDefault();

        const { props, state } = this;
        const { firebase, itemid } = props;
        var todoList = this.props.todoList;
        const changedItem = { ...state };

        if (itemid === todoList.length)
        {
            todoList.items.push(changedItem);
            props.addNewItem(todoList, firebase);
        }
        else
        {
            todoList.items[itemid] = changedItem;
            props.addNewItem(todoList, firebase);
        }
        this.props.history.push("/todoList/" + todoList.id);
    }

    getItemStateFieldValue = (stateName) =>
    {
        switch(stateName) {
            case "description":
                return this.state.description;
            case "assigned_to":
                return this.state.assigned_to;
            case "due_date":
                return this.state.due_date;
            case "completed":
                if (this.state.completed)
                {
                    return true;
                }
                else
                {
                    return false;
                }
            default:
                return "";
        }
    }

    render() {
        const { auth } = this.props;
        if (!auth.uid)
        {
            return <Redirect to="/" />;
        }
        return (
            <div className="container todo-item">
                <form onSubmit={this.handleSubmitItemChanges}>
                    <h5 className="grey-text text-darken-3">Item Screen</h5>
                    <div className="input-field">
                        <label className="active" htmlFor="description">Description</label>
                        <input type="text" name="description" id="description" 
                        defaultValue = {this.getItemStateFieldValue("description")} 
                        onChange={this.handleChange} />
                    </div>
                    <div className="input-field">
                        <label className="active" htmlFor="assigned_to">Assigned To</label>
                        <input type="text" name="assigned_to" id="assigned_to" 
                        defaultValue = {this.getItemStateFieldValue("assigned_to")} 
                        onChange={this.handleChange} />
                    </div>
                    <div className="input-field">
                        <label className="active" htmlFor="due_date">Due Date</label>
                        <input type="date" name="due_date" id="due_date" 
                        defaultValue = {this.getItemStateFieldValue("due_date")} 
                        onChange={this.handleChange} />
                    </div>
                    <div className="input-field">
                        <p>
                            <label>
                                <input type="checkbox" id="completed" 
                                checked = {this.getItemStateFieldValue("completed")} 
                                onChange={this.handleCheckBoxChange} />
                                <span>Completed</span>
                            </label>
                        </p>
                    </div>
                    <div className="input-field">
                        <button type="submit" className="btn z-depth-0 item_form_submit_button">
                            Submit
                        </button>
                        <button className="btn z-depth-0 item_form_cancel_button" onClick={this.cancelItemChanges}>
                            Cancel
                        </button>
                    </div>
                </form>
            </div>
        );
    }
}

const mapStateToProps = (state, ownProps) => {
    const { listid, itemid } = ownProps.match.params;
    const { todoLists } = state.firestore.data;
    const todoList = todoLists ? todoLists[listid] : null;
  
    if(todoList)
    {
      todoList.id = listid;
      var todoItem;
      if (Number(itemid) === todoList.items.length)
      {
          todoItem = 
          {
            key: 512,
            description: '',
            due_date: 'EMPTY',
            assigned_to: '',
            completed: false
          };
      }
      else
      {
          todoItem = todoList.items[itemid];
      }
    }
  
    return {
      todoList,
      itemid,
      todoItem,
      auth: state.firebase.auth,
    };
  };

const mapDispatchToProps = (dispatch) => ({
    addNewItem: (todoList, firebase) => dispatch(addItemHandler(todoList, firebase)),
});

export default compose(
    connect(mapStateToProps, mapDispatchToProps),
    firestoreConnect([
        { collection: 'todoLists' },
    ]),
)(ItemScreen);