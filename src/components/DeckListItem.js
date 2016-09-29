import React from 'react'; 


export default class DeskListItem extends React.Component {
    constructor(props){
        super(props); 
        this._onListItemClicked = this._onListItemClicked.bind(this);
    }
    render(){
        return (
            <li  className={this.props.deck.selected ? 'selected' : ''} >
                <span onClick={this._onListItemClicked} 
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
            </li>
        );
    } 

    _onListItemClicked(e){    
        e.preventDefault();   
        this.props.onSelected(this.props.deck.key); 
    }
}
