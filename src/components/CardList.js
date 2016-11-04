import React from 'react';
import List from './List';
import Card from './Card';
import CardModal from './modals/CardModal';


import rpDeck from '../objects/rpDeck';

export default class CardList extends React.Component {
    constructor(props) {
        super(props); 
        this._itemHandler = this._itemHandler.bind(this);
    }    

    render(){

        return (
            <div>
                <button id="card-button" onClick={()=> { this.dlgAddEditCard.setCard(this.props.cards[0]); this.dlgAddEditCard.show();}}> Card Dialog</button>
                <List title="Cards" type="Card" className="obj-list obj-list-block cards greedy"
                    items={this.props.cards}
                    _itemHandler={this._itemHandler}
                    buildItem={(props) => <Card {...props} /> }
                />

                <CardModal ref={(ref) => this.dlgAddEditCard = ref} 
                    onSave={card => this._onSaveCard(card)}/>
            </div>
        ); 

    }

    _onSaveCard(card) {
        if(card.id <= 0) {
            this.props.deck.addCard(card);
       }
       this.props.onCardsChanged(); 
    }

    _itemHandler(command, item, id){

    }


}


