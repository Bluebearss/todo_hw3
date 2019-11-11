import React from 'react';

class ItemCard extends React.Component {
    render() {
        const { item } = this.props;  
        return (
            <div className="card z-depth-0 list_item_card">
                <div className="card-content grey-text text-darken-3">
                    <span className="card-title">{item.description}</span>
                </div>
            </div>
        );
    }
}
export default ItemCard;