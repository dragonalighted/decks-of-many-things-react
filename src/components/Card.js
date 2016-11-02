import React from 'react'; 
import rpCard from '../objects/rpCard';
import rpIcons from '../objects/rpIcon';

export default class Card extends React.Component
{
    constructor(props){
        super(props);
    }
    get card() { return this.props.item; }

    render(){
        return this.props.edit ? this._renderEdit() : this._renderRead(); 
    }

    _renderRead(){
        return (
            <div className="card" data-value={this.card.id}>
                {this.card.name}
            </div>
        );
    }

    _renderEdit(){
        return (
            <div className="card" data-value={this.card.id}>
                {this.card.name}
            </div>
        );
    }
}


