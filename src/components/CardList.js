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
                    multiSelect={true}
                />

                <CardModal ref={(ref) => this.dlgAddEditCard = ref} 
                    onSave={card => this._onSaveCard(card)}/>
            </div>
        ); 

    }

    _buildCard(props) {
        return ( <Card {...props} showControls={this.props.showControls} onDoubleClick={(e) => this._itemHandler('edit', props.item, props.id)}/> );
    }
    _onSaveCard(card) {
        if(card.id <= 0) {
            this.props.deck.addCard(card);
        } else {
            this.props.deck.replaceCard(card);
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
                this.dlgAddEditCard.setCard(card, true);
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


