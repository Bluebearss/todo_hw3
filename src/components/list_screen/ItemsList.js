import React from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { compose } from 'redux';
import ItemCard from './ItemCard';
import { firestoreConnect } from 'react-redux-firebase';

class ItemsList extends React.Component {
    render() {
        const todoList = this.props.todoList;
        const items = todoList.items;
        console.log("ItemsList: todoList.id " + todoList.id);
        return (
            <div className="todo-lists section">
                {items && items.map(function(item, index) {
                    item.id = item.key;
                    return (
                        <Link to={"/itemScreen/" + todoList.id + "/" + index}>
                            <ItemCard todoList={todoList} item={item} />
                        </Link>
                    );
                })
                }
                <Link to={"/itemScreen/" + todoList.id + "/" + items.length}>
                    <div className = "list_item_add_card black-text center-align">+</div>
                </Link>
            </div>

        );
    }
}

const mapStateToProps = (state, ownProps) => {
    const todoList = ownProps.todoList;
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
)(ItemsList);