import React from 'react'; 
import DeckListItem from './DeckListItem';  
import OutlineModal from 'boron/OutlineModal';
import NewDeck from './NewDeck';
import rpDeck from '../objects/rpDeck';
import ConfirmationModal from './modals/ConfirmationModal';
import DeckModal from './modals/DeckModal';


export default class DeckList extends React.Component {

    constructor(props){
        super(props);
        this.state = { 
            collapsed: false
        }; 

        this._onDeckSelected = this._onDeckSelected.bind(this);
        this._onSaveDeck = this._onSaveDeck.bind(this);
        this._onDeckDeleteClicked = this._onDeckDeleteClicked.bind(this);
        this._onAddCardClicked = this._onAddCardClicked.bind(this); 
        this._onEditDeckClicked = this._onEditDeckClicked.bind(this);
        this._deleteDeck = this._deleteDeck.bind(this);
    }

    render(){
        return(
            <div >                
                <button 
                    className="btn btn-md btn-success pull-right margin-right-10 margin-top-10" 
                    onClick={() => {
                        this.newDeck.setDeck();
                        this.newDeck.show();
                        //this.NewDeckModal.toggle();
                    } }>
                    Add Deck
                </button>
                <h3 className="margin-0 padding-10">Decks</h3>
                <ul className="deck-list greedy">
                { 
                    this.props.decks.map(function(deck){
                        return(
                            <DeckListItem 
                                key={deck.id}
                                deck={deck}
                                onDeleteDeck={this._onDeckDeleteClicked}
                                onAddCard={this._onAddCardClicked}
                                onSelected={this._onDeckSelected}
                                onEditDeck={this._onEditDeckClicked}
                            /> 
                        );      
                    }, this)
                }
                </ul>

                <OutlineModal ref={(ref) => this.NewDeckModal = ref}>
                    <NewDeck 
                        onSave={this._onSaveDeck}
                        onCancel={() => this.NewDeckModal.hide()}
                    />
                </OutlineModal>

                <DeckModal 
                    ref={(ref) => this.newDeck = ref} 
                    onSave={this._onSaveDeck}  />

                <ConfirmationModal ref={(ref) => this.confirmation = ref}
                    key="0"
                    action="Are you sure you want to delete this Deck"
                    onYes={this._deleteDeck}
                 />
            </div>
        );        
    }



    _onEditDeckClicked(deckId) {
        this.newDeck.setDeck(rpDeck.getDeck(this.props.decks, deckId));
        this.newDeck.show();
    }

    _onDeckSelected(deckId){
        rpDeck.selectDeck(this.props.decks, deckId);
        this.props.onDeckSelected(deckId);
    }

    _onSaveDeck(deck){
        if(deck.id <= 0) rpDeck.addDeck(this.props.decks, deck);
        this.props.onDecksChanged();
        this.NewDeckModal.hide();    
    }
    _onDeckDeleteClicked(deckId){
        this.confirmation.setState({key : deckId});
        this.confirmation.show();       
    }

    _deleteDeck(deckId){
        rpDeck.removeDeck(this.props.decks, deckId);
        this.props.onDecksChanged();
    }

    _onAddCardClicked(event){
        alert('Add Card Clicked!');
    }

}



