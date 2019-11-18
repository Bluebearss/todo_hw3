import React, { Component } from 'react';
import { Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import { compose } from 'redux';
import ItemsList from './ItemsList.js';
import { firestoreConnect } from 'react-redux-firebase';
import { prependList, editNameandOwner} from '../../store/actions/actionCreators';
import { Modal, Button } from 'react-materialize';
import { deleteListHandler } from '../../store/database/asynchHandler';
import { sortByTaskHandler, sortByDueDateHandler, sortByStatusHandler } from '../../store/database/asynchHandler';

const trashbin = <div className="list-trash">&#x1f5d1;</div>

class ListScreen extends Component {
    state = {
        name: this.props.todoList === undefined ? '' : this.props.todoList.name,
        owner: this.props.todoList === undefined ? '' : this.props.todoList.owner,
        sortingCriteria: '',
    }

    handleChange = (e) => {
        const { target } = e;

        this.setState(state => ({
            ...state,
            [target.id]: target.value,
        }), () => {
            this.props.editNameandOwner(this.props.todoList, this.state);
        });
    }

    handleDeleteList = (e) => {
      e.preventDefault();

      const { props, state } = this;
      const { firebase } = props;
      const todoList = this.props.todoList;

      props.deleteList(todoList, firebase);
      this.props.history.push("/");
    }

    handleTaskSort = () => {
      const { props, state } = this;
      const { firebase } = props;
      const todoList = this.props.todoList;
      var items = todoList.items;

      if (this.state.sortingCriteria === "taskIncreasing")
      {
        this.setState({sortingCriteria: "taskDecreasing"}, () => 
        {
          let sortedItems = items.sort(this.compare);
          props.sortByTask(todoList, firebase, sortedItems);
        });
      }
      else
      {
        this.setState({sortingCriteria: "taskIncreasing"}, () => 
        {
          let sortedItems = items.sort(this.compare);
          props.sortByTask(todoList, firebase, sortedItems);
        });
      }
    }

    handleDueDateSort = () => {
      const { props, state } = this;
      const { firebase } = props;
      const todoList = this.props.todoList;
      var items = todoList.items;

      if (this.state.sortingCriteria === "dueDateIncreasing")
      {
        this.setState({sortingCriteria: "dueDateDecreasing"}, () => 
        {
          let sortedItems = items.sort(this.compare);
          props.sortByDueDate(todoList, firebase, sortedItems);
        });
      }
      else
      {
        this.setState({sortingCriteria: "dueDateIncreasing"}, () => 
        {
          let sortedItems = items.sort(this.compare);
          props.sortByDueDate(todoList, firebase, sortedItems);
        });
      }
    }

    handleStatusSort = () => {
      const { props, state } = this;
      const { firebase } = props;
      const todoList = this.props.todoList;
      var items = todoList.items;

      if (this.state.sortingCriteria === "statusIncreasing")
      {
        this.setState({sortingCriteria: "statusDecreasing"}, () => 
        {
          let sortedItems = items.sort(this.compare);
          props.sortByStatus(todoList, firebase, sortedItems);
        });
      }
      else
      {
        this.setState({sortingCriteria: "statusIncreasing"}, () => 
        {
          let sortedItems = items.sort(this.compare);
          props.sortByStatus(todoList, firebase, sortedItems);
        });
      }
    }

    compare = (item1, item2) => 
    {
      let criteria = this.state.sortingCriteria;

      // IF IT'S A DECREASING CRITERIA SWAP THE ITEMS
      if ((criteria === "taskDecreasing") || (criteria === "dueDateDecreasing") || (criteria === "statusDecreasing"))
      {
        let temp = item1;
        item1 = item2;
        item2 = temp;
      }
      
      // SORT BY ITEM DESCRIPTION
      if ((criteria === "taskDecreasing") || (criteria === "taskIncreasing"))
      {
        if (item1.description < item2.description)
            return -1;
        else if (item1.description > item2.description)
            return 1;
        else
            return 0;
      }
      // SORT BY COMPLETED
      else
      {
        if ((criteria === "statusDecreasing") || (criteria === "statusIncreasing"))
        {
          if (item1.completed < item2.completed)
              return -1;
          else if (item1.completed > item2.completed)
              return 1;
          else
              return 0;
        }
        // SORT BY DUE DATE
        else
        {
          if (item1.due_date < item2.due_date)
              return -1;
          else if (item1.due_date > item2.due_date)
              return 1;
          else
              return 0;
        }
      }
    }

    componentDidMount = () =>
    {
        if (this.props.todoList)
        {
          this.props.prependList(this.props.todoList.id);
        }
        else
        {
          this.props.history.push("/");
        }
        
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
                    <Modal className = "modal_container" header="Hello User!" trigger={trashbin}>
                        Delete list?<br /><br /><br />
                        <div className= "modal_text">Are you sure you want to delete this list?</div>
                        <div>If not, click the Close Button below.</div>
                        <br /><br />
                        <button className = "modal_yes_button" onClick = {this.handleDeleteList}>
                            Yes
                        </button><br /><br />
            
                        <div>The list will not be retreivable.</div>
                    </Modal>
                </div>
                <br />
                <br />
                <br />
                <div className="input-field">
                    <label htmlFor="email" className="active">Name:</label>
                    <input type="text" name="name" id="name" onChange={this.handleChange} defaultValue={todoList.name} />
                </div>
                <div className="input-field">
                    <label htmlFor="password" className="active">Owner:</label>
                    <input type="text" name="owner" id="owner" onChange={this.handleChange} defaultValue={todoList.owner} />
                </div>
                <div id="list-items-container">
                    <div className="list_item_header_card">
                        <div className="list_item_task_header" onClick={this.handleTaskSort}>
                            Task
                        </div>
                        <div className="list_item_due_date_header" onClick={this.handleDueDateSort}>
                            Due Date
                        </div>
                        <div className="list_item_status_header" onClick={this.handleStatusSort}>
                            Status
                        </div>
                    </div>

                    <ItemsList todoList={todoList} />
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

const mapDispatchToProps = (dispatch) => ({
    deleteList: (todoList, firebase) => dispatch(deleteListHandler(todoList, firebase)),
    prependList: (id) => dispatch(prependList(id)),
    editNameandOwner: (todoList, state) => dispatch(editNameandOwner(todoList, state)),
    sortByTask: (todoList, firebase, sortedItems) => dispatch(sortByTaskHandler(todoList, firebase, sortedItems)),
    sortByDueDate: (todoList, firebase, sortedItems) => dispatch(sortByDueDateHandler(todoList, firebase, sortedItems)),
    sortByStatus: (todoList, firebase, sortedItems) => dispatch(sortByStatusHandler(todoList, firebase, sortedItems)),
});

export default compose(
  connect(mapStateToProps, mapDispatchToProps),
  firestoreConnect([
    { collection: 'todoLists' },
  ]),
)(ListScreen);