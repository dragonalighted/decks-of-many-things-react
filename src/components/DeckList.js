import React from 'react'; 
import DeckListItem from './DeckListItem';  
import OutlineModal from 'boron/OutlineModal';
import NewDeck from './NewDeck';
import rpDeck from '../objects/rpDeck';

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
    }

    render(){
        return(
            <div >                
                <button 
                    className="btn btn-md btn-success pull-right margin-right-10 margin-top-10" 
                    onClick={() => this.refs['NewDeckModal'].toggle()}>
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
                            /> 
                        );      
                    }, this)
                }
                </ul>

                <OutlineModal ref="NewDeckModal">
                    <NewDeck 
                        onSave={this._onSaveDeck}
                        onCancel={() => this.refs.NewDeckModal.hide()}
                    />
                </OutlineModal>
            </div>
        );        
    }

    _onDeckSelected(deckId){
        this.props.onDeckSelected(deckId) 
    }

    _onSaveDeck(name = null, desc = "", tags = {}){
        if(!name )
        {        
            alert('Name must be provided!');
        }

        let newDeck = new rpDeck( null , {name, desc, tags});
        this.props.decks.        
    }
    _onDeckDeleteClicked(event){
        alert('Delete Deck Clicked!');
    }
    _onAddCardClicked(event){
        alert('Add Card Clicked!');
    }

}



