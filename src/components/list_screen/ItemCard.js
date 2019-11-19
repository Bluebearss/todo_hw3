import React from 'react';
import { connect } from 'react-redux';
import { compose } from 'redux';
import {Button, Icon} from 'react-materialize';
import { relative } from 'path';
import { firestoreConnect } from 'react-redux-firebase';

class ItemCard extends React.Component {
    state = {
        item: this.props.item,
        todoList: this.props.todoList,
        index: this.props.index,
    }

    render() {
        const { item, todoList, index } = this.props; 
        const status = item.completed ? "Completed" : "Pending";
        const color = item.completed ? {color: 'green'} : {color: 'red'};

        const button_style = 
        {
            position: 'absolute',
            left: '91.2%',
            top: '10%'
        };
        
        const hover_button = 
        <Button style = {button_style}
        floating
        fab={{direction: 'left'}}
        className="amber darken-2"
        large
        >
        <Button onClick = {this.props.handleMoveUp.bind(this, index)}
        floating icon={<Icon children = 'arrow_upward' />} className="blue" />
        <Button onClick = {this.props.handleMoveDown.bind(this, index)}
        floating icon={<Icon children = 'arrow_downward' />} className="pink darken-4" />
        <Button onClick = {this.props.handleDeleteItem.bind(this, index)}
        floating icon={<Icon children = 'close' />} className="red" />
        </Button>;

        return (
            <div className="card z-depth-0 list_item_card">
                <div className="card-content grey-text text-darken-3">
                    <div className="list_item_card_description">{item.description}</div>
                    <div className='list_item_card_assigned_to'>
                    Assigned To: <strong className='assigned_to'>{item.assigned_to}</strong>
                    </div>
                    <div className='list_item_card_due_date'>
                        {item.due_date}
                    </div>
                    <div className='list_item_card_completed' style={color}>{status}</div>
                    {hover_button}
                </div>
            </div>
        );
    }
}
export default ItemCard;