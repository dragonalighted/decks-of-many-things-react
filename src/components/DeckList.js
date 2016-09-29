

var React = require('react'); 
var DeckListItem = require('./DeckListItem') 


module.exports = React.createClass({
    getInitialState : function(){
        return { 
            collapsed: false,
            selectedDeck: "1"
        }; 
    },
    render : function(){
        return(
            <div >                
                <button 
                    className="btn btn-md btn-success pull-right margin-right-10 margin-top-10" 
                    onClick={this._onAddDeckClicked}>
                    Add Deck
                </button>
                <h3 className="margin-0 padding-10">Decks</h3>
                <ul className="deck-list greedy">
                { 
                    this.props.decks.map(function(deck){
                        return(
                            <DeckListItem deck={deck}
                                onDeleteDeck={this._onDeckDeleteClicked}
                                onAddCard={this._onAddCardClicked}
                                onSelected={this._onDeckSelected}
                                selected={(this.state.selectedDeck == deck.key)}
                            /> 
                        );      
                    }, this)
                }
                </ul>
            </div>
        );
    },
    _onDeckSelected: function(){
        alert('Deck Selected');
    },

    _onAddDeckClicked: function(){
        alert('Add Deck Clicked!');
    },
    _onDeckDeleteClicked: function(){
        alert('Delete Deck Clicked!');
    },
    _onAddCardClicked: function() {
        alert('Add Card Clicked!');
    }
    

});

