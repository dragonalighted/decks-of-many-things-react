

import React from 'react';
import OutlineModal from 'boron/OutlineModal';
import rpDeck from '../../objects/rpDeck';

export default class DeckModal extends React.Component{
    constructor(props){
        super(props);
        this.state = this.initialState();
        this.show = this.show.bind(this); 
        this.hide = this.hide.bind(this);
        this.setDeck = this.setDeck.bind(this);

        this._onCancel = this._onCancel.bind(this);
        this._onSave = this._onSave.bind(this);
    }    
    setDeck(deck = new rpDeck()) {
        this.setState({deck});
    }
    show(){
        this.modal.show();
    }
    hide(){
        this.modal.hide(); 
    }
    initialState(){
        return {
            deck : new rpDeck(),
            errors: [],
            warnings: [],
            info: [],
        };
    }
    render(){      
        return(
            <OutlineModal ref={(modal) => this.modal = modal} 
                onShow={() => this._onShow()}
                closeOnClick={false}
                >
                <div className="modal-container row">
                    {this._getErrors()}
                    <h2 >{this._getHeaderText()}</h2>
                    <form className="form-horizontal">
                        <div className="form-group required">
                            <label htmlFor="name" className="control-label col-md-3"> Name </label>
                            <div className="col-md-8">
                                <input type="text" 
                                    className="form-control col-md-6" 
                                    name="name" 
                                    placeholder="Deck Name"
                                    defaultValue={this._getDeckName()}
                                    ref={(input) => this.name = input}/>
                            </div>
                        </div>
                        <div className="form-group">
                            <label htmlFor="desc" className="control-label col-md-3" >Description </label>
                            <div className="col-md-8">
                                <textarea 
                                    name="desc" 
                                    className="form-control col-md-6"  
                                    placeholder="(Optional)"
                                    defaultValue={this._getDeckDesc()}
                                    ref={(input) => this.desc = input} ></textarea>
                            </div>
                        </div>
                        <div className="form-group">
                            <label htmlFor="tags"  className="control-label col-md-3">Tags </label>
                            <div className="col-md-8">
                                <input type="text" 
                                    className="form-control"  
                                    name="tags" 
                                    placeholder="(Optional) separated by commas" 
                                    defaultValue={this._getDeckTags()}
                                    ref={(input) => this.tags = input}/>
                            </div>
                        </div>
                        <div className="pull-right" style={{marginRight: '2em', marginTop: '1em'}}>
                            <button type="button" className="btn btn-default" onClick={this._onCancel}>Cancel</button>
                            <button type="submit" className="btn btn-success" onClick={this._onSave}>Save</button>
                        </div>
                    </form>
                </div> 
            </OutlineModal>
        );
    }
    _onShow(){
        this.name.focus();
    }

    _getDeckName(){
        return  this.state.deck.name; 
    }
    _getDeckDesc() {
        return this.state.deck.desc;         
    }
    _getDeckTags(){
        return this.state.deck.tags.join(', ');
    }
    _getHeaderText(){
        return this.state.deck.id > 0 ? "Edit Deck" : "New Deck";
    }
    _getErrors(){

        if(this.state.errors != null && this.state.errors.length > 0) {
            return (
                <div className="alert alert-danger">
                    <ul>
                    {this.state.errors.map(function(value, index){return (<li>{value}</li>)})}                  
                    </ul>
                </div>
            );
        }        
    }
    _getDeckId(){
        return this.state.deck ? this.state.deck.id : -1; 
    }
    _onCancel(event){
        event.preventDefault();
        if(this.props.onCancel) this.props.onCancel();
        this.hide(); 
    }

    _onSave(event){
        event.preventDefault();
        let errors = []; 
        if(!this.name.value || this.name.value.trim() === "")
        {   
            errors.push('A Deck name must be provided!');
        }

        this.setState({errors});
        if(errors.length <= 0){
            if(this.props.onSave) {  
                this.state.deck.name = this.name.value;
                this.state.deck.desc = this.desc.value; 
                this.state.deck.tags = this.tags.value.split(',').map(function(value, index) {
                    return value.trim();
                })            
                this.props.onSave(this.state.deck);
            }
            this.hide()
        }
    }
}