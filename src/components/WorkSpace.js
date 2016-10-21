import React from 'react'; 
import DeckList from './DeckList';
import rpDeck from '../objects/rpDeck';
import AppObject from '../objects/AppObject';
import ItemList from './ItemList';

export default class WorkSpace extends React.Component {
    constructor(props){
        super(props);
        this.state = { 
            appObj :props.appObj,
            items : [
                {id: 1, name:"test"} ,
                {id: 2, name:"oh no"}
            ]
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
                        <div className="col-lg-9 col-md-9 col-sm-9">
                            <ItemList 
                                items={this.state.items}
                                title="Test List"
                                itemTypeName="Junk"
                                getTooltip={(item) => item.name}
                                onDeleteItem={() => alert('onDeleteItem Called')}
                                onEditItem={() => alert('onEditItem called')}
                                onAddToItem={() => alert('onAddToItem Called')}
                                onSelectItem={() => alert('onSelectItem called')}
                                onAddItem={() => alert('onAddItem Called')}
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

    _deckSelected(deckId){
        //rpDeck.selectDeck(this.state.appObj.decks, deckId);
        this.setState({appObj : this.state.appObj});
    }
} 

