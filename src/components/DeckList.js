import React from 'react'; 
import List from './List';
import DeckModal from './modals/DeckModal';

import rpDeck from '../objects/rpDeck';


export default class DeckList extends React.Component {

    constructor(props){
        super(props);
        this.state = this._initialState();
        this._itemHandler = this._itemHandler.bind(this); 
    }

    _initialState(){
        return {};
    }
    _getTooltip(item) {
        return `${item.desc}
Tags: ${item.tags.join(', ')}`;
    }
    render(){
        return(
            <div>
                <List title="Decks" type="Deck"
                    items={this.props.decks}
                    itemHandler={this._itemHandler} 
                    className="obj-list decks greedy"
                    allow="edit|add|trash|new"
                    confirmDelete="true"
                    itemTooltip={ function(item) { return `${item.desc?   item.desc + '\n\n\t' :''}Tags: ${item.tags.join(', ')}`} }
                    itemName={function(item) { return `${item.name} (${item.cards ? item.cards.length :'0'})` } }
                    />


                <DeckModal 
                    ref={(ref) => this.dlgNewDeck = ref} 
                    onSave={(deck) => this._onSaveDeck(deck)}  />
            </div>
        );        
    }

    _itemHandler(command, item, id) {
        switch(command) {
            case 'new' : 
                this.dlgNewDeck.setDeck();
                this.dlgNewDeck.show(); 
                break; 
            case 'trash':
            case 'delete':
            case 'dispose':
                rpDeck.removeDeck(this.props.decks, id);
                this.props.onDecksChanged();
                break;
            case 'edit':
                this.dlgNewDeck.setDeck(rpDeck.getDeck(this.props.decks, id));
                this.dlgNewDeck.show();
                break; 
            case 'deselect' : 
            case 'add' : 
                break;
            case 'select' : 
                this.props.onDeckSelected(id);
                break; 
            default: 
                console.log(`${command}  on ${id}:${item.name}`);
                break; 
        }
    } 

    _onSaveDeck(deck){
        if(deck.id <= 0) rpDeck.addDeck(this.props.decks, deck);
        this.props.onDecksChanged();
    }


}

