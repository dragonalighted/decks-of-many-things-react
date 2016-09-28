var React = require('react'); 
var DeckList = require('./DeckList');


module.exports = React.createClass({
    render : function(){
        let appObj = this.props.appObj || {}; 

        return(
            <div className="work-space">

                <div className="ws-title-bar">
                    <h1>Decks of Many Things</h1>
                </div>
                <div className="ws-left-pane">
                    <DeckList decks={appObj.decks} />
                </div>
            </div>
        );
    }
});