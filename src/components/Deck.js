var React = require('react'); 
var Card = require('./Card');

module.exports = React.createClass({
    render : function(){
        return(
        <div className="deck">
            <h3 className="deckName">{(this.props.deckName || "Un-Named deck")}</h3>
            <Card />
            <Card />
        </div>);
    }

});