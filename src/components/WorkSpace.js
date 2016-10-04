import React from 'react'; 
import DeckList from './DeckList';


export default class WorkSpace extends React.Component {
    constructor(props){
        super(props);
        this.state = { appObj: props.appObj }
        this._deckSelected = this._deckSelected.bind(this);
    }
    render(){
        let appObj = this.props.appObj || {}; 
        return(
            <div className="work-space">

                <div className="ws-title-bar">
                    <h1>Decks of Many Things</h1>
                </div>
                <div className="ws-left-pane">
                    <DeckList decks={appObj.decks} onDeckSelected={this._deckSelected} />
                </div>
            </div>
        );
    }

    _deckSelected(deckId){
        appObj.
        alert('deck selected');
    }
} 

