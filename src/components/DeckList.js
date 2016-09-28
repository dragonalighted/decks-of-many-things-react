

var React = require('react'); 

module.exports = React.createClass({
    render : function(){
        return(
            <div >                
                <button 
                    className="btn btn-md btn-success pull-right margin-right-10 margin-top-10" 
                    onClick={this._onAddDeckClicked}>
                    Add Deck
                </button>
                <h3 className="margin-0 padding-10">Decks</h3>
                <ul className="deck-list">
                { 
                    this.props.decks.map(function(deck){
                        return( 
                            <li>
                                <span onClick={this._onDeckSelected} >{deck.name}</span>
                                <button onClick={this._onDeckDeleteClicked}
                                    className="btn btn-sm btn-error">
                                    <span className="glyphicon glyphicon-trash"></span>
                                </button>
                            </li>);    
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
    __onDeckDeleteClicked: function(){
        alert('Delete Deck Clicked!');
    }
    
});