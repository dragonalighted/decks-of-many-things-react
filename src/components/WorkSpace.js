import React from 'react'; 
import DeckList from './DeckList';
import rpDeck from '../objects/rpDeck';
import AppObject from '../objects/AppObject';

export default class WorkSpace extends React.Component {
    constructor(props){
        super(props);
        this.state = { 
            appObj :props.appObj
            }
        this._deckSelected = this._deckSelected.bind(this);
        this._decksChanged = this._decksChanged.bind(this);
    }
    render(){
        let appObj = this.props.appObj || {};
        return(
            <div className="work-space">

                <div className="ws-title-bar">
                    <h1>Decks of Many Things</h1>
                </div>
                <div className="ws-content">
                    <div className="ws-left-pane">
                        <DeckList decks={appObj.decks} 
                            onDeckSelected={this._deckSelected}
                            onDecksChanged={this._decksChanged} />
                    </div>
                    <div className="ws_right-pane">
                    </div>
                </div>
            </div>
        );
    }
    _decksChanged(){
        AppObject.saveAppObject(this.state.appObj);       
        this.setState({appObj : this.state.appObj});
    }

    _deckSelected(deckId){
        //rpDeck.selectDeck(this.state.appObj.decks, deckId);
        this.setState({appObj : this.state.appObj});
    }
} 

