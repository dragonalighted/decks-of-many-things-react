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
        return {
            decks : this.props.decks,
        }
    }
    _getTooltip(item) {
        return `${item.desc}
Tags: ${item.tags.join(', ')}`;
    }
    render(){
        return(
            <div>
                <List
                    items={this.state.decks}
                    title="Decks"
                    itemHandler={this._itemHandler} 
                    type="Deck"
                    className="deck-list greedy"
                    allow="edit|add|trash|new"
                    confirmDelete="true"
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
                rpDeck.removeDeck(this.props.decks, id);
                this.props.onDecksChanged();
                break;
            case 'edit':
                this.dlgNewDeck.setDeck(rpDeck.getDeck(this.state.decks, id));
                this.dlgNewDeck.show();
                break; 
            case 'add' : 
                break;
            default: 
                console.log(`${command}  on ${id}:${item.name}`);
                break; 
        }
    } 

    _onSelectItem(deckId){
        rpDeck.selectDeck(this.props.decks, deckId);
        this.props.onDeckSelected(deckId);
    }

    _onSaveDeck(deck){
        if(deck.id <= 0) rpDeck.addDeck(this.props.decks, deck);
        this.props.onDecksChanged();
    }


}

// export default class DeckList extends React.Component {

//     constructor(props){
//         super(props);
//         this.state = this._initialState();
//         this._getTooltip = this._getTooltip.bind(this);
//     }

//     _initialState(){
//     }
//     _getTooltip(item) {
//         return `${item.desc}
// Tags: ${item.tags.join(', ')}`;
//     }
//     render(){
//         return(
//             <div>
//                 <ItemList 
//                     items={this.props.decks}
//                     title="Decks"
//                     itemTypeName="Deck"
//                     getTooltip={(item) => this._getTooltip(item)}
//                     getName={(item)=> `${item.name} (${item.cards.length})`}
//                     onAddItem={()=> this._onAddItem()}
//                     onEditItem={(deckId)=> this._onEditItem(deckId)}
//                     onDeleteItem={(deckId)=> this._onDeleteItem(deckId)}
//                     onAddToItem={(deckId)=> alert('addToItem clicked (deck list)')}
//                     onSelectItem={(deckId)=> this._onSelectItem(deckId) }
//                 />

//                 <DeckModal 
//                     ref={(ref) => this.dlgNewDeck = ref} 
//                     onSave={(deck) => this._onSaveDeck(deck)}  />
//             </div>
//         );        
//     }

//     _onAddItem(){
//         this.dlgNewDeck.setDeck();
//         this.dlgNewDeck.show(); 
//     }
//     _onDeleteItem(deckId){
//         rpDeck.removeDeck(this.props.decks, deckId);
//         this.props.onDecksChanged();
//     }
//     _onEditItem(deckId) {
//         this.dlgNewDeck.setDeck(rpDeck.getDeck(this.props.decks, deckId));
//         this.dlgNewDeck.show();
//     }

//     _onSelectItem(deckId){
//         rpDeck.selectDeck(this.props.decks, deckId);
//         this.props.onDeckSelected(deckId);
//     }

//     _onSaveDeck(deck){
//         if(deck.id <= 0) rpDeck.addDeck(this.props.decks, deck);
//         this.props.onDecksChanged();
//     }


// }

