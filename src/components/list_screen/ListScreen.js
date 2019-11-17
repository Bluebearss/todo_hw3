import React, { Component } from 'react';
import { Redirect } from 'react-router-dom'
import { connect } from 'react-redux';
import { compose } from 'redux';
import ItemsList from './ItemsList.js'
import { firestoreConnect } from 'react-redux-firebase';
import { prependList, editNameandOwner} from '../../store/actions/actionCreators';
import { Modal, Button } from 'react-materialize';
import { deleteListHandler } from '../../store/database/asynchHandler';

class Toggle extends React.Component {
    constructor(props) {
      super(props);
      this.state = {
        isChecked: props.isChecked || false,
      };
      
      this.handleChange = this.handleChange.bind(this);
    }
    handleChange() {
      this.setState({ isChecked: !this.state.isChecked })
    }
    render () {
      return (
        <label className="switch">
          <input type="checkbox" value={this.state.isChecked} onChange={this.handleChange} />
          <div className="slider"></div>
        </label>
      );
    }
}

const trashbin = <div className="list-trash">&#x1f5d1;</div>

class ListScreen extends Component {
    state = {
        name: this.props.todoList.name,
        owner: this.props.todoList.owner,
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

    componentDidMount = () =>
    {
        this.props.prependList(this.props.todoList.id);
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

                    <Toggle isChecked />
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
});

export default compose(
  connect(mapStateToProps, mapDispatchToProps),
  firestoreConnect([
    { collection: 'todoLists' },
  ]),
)(ListScreen);