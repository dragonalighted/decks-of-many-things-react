var React = require('react'); 

module.exports = React.createClass({
    render :function(){
        return (
            <li  className={this.props.selected ? 'selected' : ''} >
                <span onClick={this.props.onSelected} 
                    title="Select this deck"
                    className="ctrl padding-right-10">
                    {this.props.deck.name} ({ (this.props.deck.cards || [] ).length})
                </span>
                <div className="inline-block pull-right padding-right-10">
                    <span className="ctrl glyphicon glyphicon-plus margin-right-10"
                        title="Add New Card"
                        onClick={this.props.onAddCard}></span>
                    <span className="ctrl glyphicon glyphicon-trash" 
                        title="Delete Deck"
                        onClick={this.props.onDeleteDeck}></span>
                </div>
            </li>);
    }


});
