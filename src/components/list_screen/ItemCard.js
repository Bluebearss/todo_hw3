import React from 'react';
import {Button, Icon} from 'react-materialize';

const hover_button = 
    <Button
    floating
    fab={{direction: 'left'}}
    className="red"
    large
    >
    <Button floating icon={<Icon />} className="red" />
    <Button floating icon={<Icon />} className="yellow darken-1" />
    <Button floating icon={<Icon />} className="green" />
    <Button floating icon={<Icon />} className="blue" />
    </Button>;

class ItemCard extends React.Component {

    render() {
        const { item } = this.props; 
        const status = item.completed ? "Completed" : "Pending";
        const color = item.completed ? {color: 'green'} : {color: 'red'};
        
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