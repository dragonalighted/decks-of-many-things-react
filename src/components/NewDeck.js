

import React from 'react';

export default class NewDeck extends React.Component{
    constructor(props){
        super(props);
        this.state = {
            errors: [],
            warnings: [],
            info: [],
        };
        this._onCancelClicked = this._onCancelClicked.bind(this);
        this._onSaveClicked = this._onSaveClicked.bind(this);
    }    
    render(){

        
        return(
            <div className="modal-container row">
                {this._getErrors()}
                <h2 >New Deck</h2>
                <form className="form-horizontal">
                    <div className="form-group required">
                        <label htmlFor="name" className="control-label col-md-3"> Name </label>
                        <div className="col-md-8">
                            <input type="text" 
                                className="form-control col-md-6" 
                                name="name" 
                                placeholder="Deck Name" 
                                ref={(input) => this._name = input}/>
                        </div>
                    </div>
                    <div className="form-group">
                        <label htmlFor="desc" className="control-label col-md-3" >Description </label>
                        <div className="col-md-8">
                            <textarea 
                                name="desc" 
                                className="form-control col-md-6"  
                                placeholder="(Optional)"
                                ref={(input) => this._desc = input} ></textarea>
                        </div>
                    </div>
                    <div className="form-group">
                        <label htmlFor="tags"  className="control-label col-md-3">Tags </label>
                        <div className="col-md-8">
                            <input type="text" 
                                className="form-control"  
                                name="tags" 
                                placeholder="(Optional) separated by commas" 
                                ref={(input) => this._tags = input}/>
                        </div>
                    </div>
                    <div className="pull-right" style={{marginRight: '2em', marginTop: '1em'}}>
                        <button type="button" className="btn btn-default" onClick={this._onCancelClicked}>Cancel</button>
                        <button type="submit" className="btn btn-success" onClick={this._onSaveClicked}>Save</button>
                    </div>
                </form>
            </div> 
        );
    }

    _getErrors(){
        if(this.state.errors.length > 0) {
            return (
                <div className="alert alert-danger">
                    <ul>
                    {this.state.errors.map(function(value, index){return (<li>{value}</li>)})}                  
                    </ul>
                </div>
            );
        }        
    }
    _onCancelClicked(event){
        event.preventDefault();
        this.props.onCancel(); 
    }

    _onSaveClicked(event){
        event.preventDefault();
        let errors = []; 
        if(!this._name.value || this._name.value.trim() === "")
        {   
            errors.push('A Deck name must be provided!');
        }

        if(errors.length <= 0 )
            this.props.onSave(this._name.value, this._desc.value, this._tags.value);
        this.setState({errors}); 
    }
}