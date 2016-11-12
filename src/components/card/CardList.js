import React from 'react';
import List from '../List';
import Card from './Card';
import CardModal from '../modals/CardModal';
import CardEditor from './CardEditor';

import rpDeck from '../../objects/rpDeck';
import rpCard from '../../objects/rpCard';

export default class CardList extends React.Component {
    constructor(props) {
        super(props); 
        this.state = { 
            editCard : null 
        }
        this._itemHandler = this._itemHandler.bind(this);
    }    

    render(){

        return (
            <div>
                { this._renderList() }
                { this._renderEditor() }
                { this._renderModal()}
            </div>
        ); 

    }

    _renderModal(){

    }
    _renderEditor(){
        if( this.state.editCard !== null)
            return (<CardEditor ref={(ref) => this.cardEditor = ref} card={this.state.editCard} />);
    } 
    _renderList(){
        if( this.state.editCard === null)
            return ( 
                <List title="Cards" type="Card" className="obj-list obj-list-block cards greedy"
                    items={this.props.cards}
                    itemHandler={this._itemHandler}
                    buildItem={ (props) => this._buildCard(props)}
                    multiSelect={true}
                />
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
                this.setState({editCard: card});       
                // this.dlgAddEditCard.setCard(card, true);
                // this.dlgAddEditCard.show(); 
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


