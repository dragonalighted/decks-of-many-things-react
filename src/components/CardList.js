import React from 'react';
import List from './List';
import Card from './Card';

export default class CardList extends React.Component {
    constructor(props) {
        super(props); 
        this._itemHandler = this._itemHandler.bind(this);
    }    

    render(){

        return (
            <List title="Cards" type="Card"
                items={this.props.cards}
                _itemHandler={this._itemHandler}
                buildItem={(props) => <Card {...props} /> }
            />
        ); 

    }

    

    _itemHandler(command, item, id){

    }


}


