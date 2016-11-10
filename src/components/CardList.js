import React from 'react';
import List from './List';
import Card from './Card';
import CardModal from './modals/CardModal';


import rpDeck from '../objects/rpDeck';
import rpCard from '../objects/rpCard';

export default class CardList extends React.Component {
    constructor(props) {
        super(props); 
        this._itemHandler = this._itemHandler.bind(this);
    }    

    render(){

        return (
            <div>
                <List title="Cards" type="Card" className="obj-list obj-list-block cards greedy"
                    items={this.props.cards}
                    itemHandler={this._itemHandler}
                    buildItem={ (props) => this._buildCard(props)}
                />

                <CardModal ref={(ref) => this.dlgAddEditCard = ref} 
                    onSave={card => this._onSaveCard(card)}/>
            </div>
        ); 

    }

    _buildCard(props) {
        return ( <Card {...props} showControls={this.props.showControls} /> );
    }
    _onSaveCard(card) {
        if(card.id <= 0) {
            this.props.deck.addCard(card);
       }
       this.props.onCardsChanged(); 
       return true;
    }

    _onDeleteCard(card) {
        this.props.deck.removeCard(card);
        this.props.onCardsChanged(); 
        return true; 
    }

    _itemHandler(command, item, id){
        switch(command) {
            case 'edit' : 
                let card = Object.assign(new rpCard(), item);          
                this.dlgAddEditCard.setCard(item);
                this.dlgAddEditCard.show(); 
                break; 
            case 'delete' :
            case 'trash' : 
                this._onDeleteCard(item);
                break; 
            default: 
                console.log(`${command} ${id} ${item}`);
                break; 
        }
    }


}


