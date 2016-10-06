import React from 'react'; 
import Card from './Card';

export default class Deck extends React.Component {
    render(){
        return(
        <div className="deck">
            <h3 className="deckName">{(this.props.deckName || "Un-Named deck")}</h3>
            <Card />
            <Card />
        </div>);
    }

}
