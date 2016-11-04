import React from 'react'; 
import DeckList from './DeckList';
import CardList from './CardList';
import rpDeck from '../objects/rpDeck';
import AppObject from '../objects/AppObject';

export default class WorkSpace extends React.Component {
    constructor(props){
        super(props);
        this.state = { 
            appObj :props.appObj,
            selectedDeck: null,
            selectedCard: null
            }
        this._deckSelected = this._deckSelected.bind(this);
        this._decksChanged = this._decksChanged.bind(this);
    }
    render(){
        let appObj = this.props.appObj || {};
        return(
            <div className="work-space">
                <div className="container-fluid ws-title-bar">
                    <div className="row">
                        <h1>Decks of Many Things</h1>
                    </div>
                </div>
                <div className="container-fluid ws-content">
                    <div className="row">
                        <div className="col-lg-3 col-md-3 col-sm-3">
                            <DeckList decks={appObj.decks} 
                                onDeckSelected={this._deckSelected}
                                onDecksChanged={this._decksChanged} />
                        </div>                        
                        <div className="col-lg-9 col-md-9 col-sm-9" ref>
                            <CardList 
                                cards={this.state.selectedDeck ? this.state.selectedDeck.cards : null}
                                deck={this.state.selectedDeck}
                                onCardsChanged={()=>this._cardsChanged()}
                            />
                        </div>
                    </div>
                </div>
            </div>
        );
    }
    _decksChanged(){
        AppObject.saveAppObject(this.state.appObj);              
        this.setState({appObj : this.state.appObj});
   
    }

    _cardsChanged(){
        this._decksChanged();
    }
    _deckSelected(deckId){
        let deck = rpDeck.getDeck(this.state.appObj.decks, deckId);
        this.setState({            
            selectedDeck: deck,
            selectedCard: null
        });
    }
} 

