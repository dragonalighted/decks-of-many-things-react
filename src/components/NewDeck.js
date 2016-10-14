

import React from 'react';

export default class NewDeck extends React.Component{
    constructor(props){
        super(props);
        this._onCancelClicked = this._onCancelClicked.bind(this);
        this._onSaveClicked = this._onSaveClicked.bind(this);
    }
    render(){
        return(
            <div className="modal-container row">
                <h2 >New Deck</h2>
                <form className="form-horizontal">
                    <div className="form-group required">
                        <label htmlFor="name" className="control-label col-md-3"> Name </label>
                        <div className="col-md-8">
                            <input type="text" className="form-control col-md-6" name="name" placeholder="Deck Name" refs={(input) => this._name = input}/>
                        </div>
                    </div>
                    <div className="form-group">
                        <label htmlFor="desc" className="control-label col-md-3" >Description </label>
                        <div className="col-md-8">
                            <textarea 
                                name="desc" 
                                className="form-control col-md-6"  
                                placeholder="(Optional)"
                                refs={(input) => this._desc = input} ></textarea>
                        </div>
                    </div>
                    <div className="form-group">
                        <label htmlFor="tags"  className="control-label col-md-3">Tags </label>
                        <div className="col-md-8">
                            <input type="text" 
                                className="form-control"  
                                name="tags" 
                                placeholder="(Optional) separated by commas" 
                                refs={(input) => this._tags = input}/>
                        </div>
                    </div>
                    <div className="pull-right" style={{marginRight: '2em', marginTop: '1em'}}>
                        <button type="button" className="btn btn-default" onClick={this._onCancelClicked}>Cancel</button>
                        <button type="button" className="btn btn-success" onClick={this._onSaveClicked}>Save</button>
                    </div>
                </form>
            </div> 
        );
    }

    _onCancelClicked(event){
        event.preventDefault();
        this.props.onCancel(); 
    }

    _onSaveClicked(event){
        event.preventDefault();
        this.props.onSave(this.name.value, this.desc.value, this.tags.value);
    }
}