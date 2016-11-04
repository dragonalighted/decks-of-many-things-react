import React from 'react';
import OutlineModal from 'boron/OutlineModal';
import rpCard from '../../objects/rpCard';

import Form from '../forms/Form';
import FormGroup from '../forms/FormGroup';
import IconControl from '../forms/IconControl';
import ColorsControl from '../forms/ColorsControl'; 

export default class CardModal extends React.Component{
    constructor(props){
        super(props);
        this.state = this.initialState();
        this.show = this.show.bind(this); 
        this.hide = this.hide.bind(this);
        this.setCard = this.setCard.bind(this);

        this._onCancel = this._onCancel.bind(this);
        this._onSave = this._onSave.bind(this);
    }    
    setCard(card = new rpCard()) { this.setState({card}); }
    show(){ this.modal.show(); }
    hide(){ this.modal.hide(); }

    initialState(){
        return {
            card : new rpCard(),
            errors: [],
            warnings: [],
            info: [],
        };
    }

    get card(){return this.state.card }
    render(){      
        return(
            <OutlineModal ref={(modal) => this.modal = modal} 
                onShow={() => this._onShow()}
                closeOnClick={false}
                modalStyle= {{width: '80%', minWidth:'800px'}}
                >                
                <div className="modal-container row">
                    <div className="col-md-12">
                        <h2 >{this.card.id <= 0 ? "New Card" : 'Edit Card'}</h2>
                    </div>
                    <div className="col-md-12">
                    {this._getErrors()}
                    </div>
                    <div className="col-md-4">
                        <Form   horizontal={true} 
                                labelSize="col-md-3"
                                controlSize="col-md-8">                            
                            <FormGroup name="name" required="true" label="Card Name">
                                <input  type="text" placeholder="Card Name" 
                                        defaultValue={this.card.name} ref={(input) => this.cardName = input} 
                                        data-prop="name"/>                            
                            </FormGroup>
                            <FormGroup name="size" required="true" label="Card Size">
                                <select  ref={(input) => this.cardSize = input} data-prop="size"
                                        value={this.card.size}
                                        onChange={(e)=> this.onSizeChange(e)}>
                                    <option value='poker'       >Poker     (2.5"  x 3.5")</option>
                                    <option value='bridge'      >Bridge    (2.25" x 3.5")</option>
                                    <option value='index-sm'    >Small Index (5"    x 3")</option>
                                    <option value='index-md'    >Medium Index (6"    x 4")</option>
                                    <option value='index-lg'    >Large Index (8"    x 5")</option>
                                </select>                            
                            </FormGroup>
                            <FormGroup name="front-icon" label="Title" >
                                <IconControl
                                    ref={(ref) => this.cardTitleIcon = ref} 
                                    icon={this.card.icons.title} 
                                    color={this.card.colors.card}/>
                            </FormGroup>
                            <FormGroup name="front-icon" label="Back" >
                                <IconControl
                                    ref={(ref) => this.cardBackIcon = ref}  
                                    icon={this.card.icons.back}  
                                    color={this.card.colors.card} />
                            </FormGroup>
                            <FormGroup name="colors" label="Colors">
                                <ColorsControl
                                    ref={(ref) => this.cardColors = ref} 
                                    colors={this.card.colors}/>
                            </FormGroup>
                            <div className="pull-right" style={{marginRight: '2em', marginTop: '1em'}}>
                                <button type="button" className="btn btn-default" onClick={this._onCancel}>Cancel</button>
                                <button type="submit" className="btn btn-success" onClick={this._onSave}>Save</button>
                            </div>
                        </Form>
                    </div>
                    <div className="col-md-4">
                    </div>
                    <div className="col-md-4">
                    </div>
                </div> 
            </OutlineModal>
        );
    }

    _onSizeChange(event) {

    }
    _onShow(){ this.cardName.focus(); }

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

    _onCancel(event){
        event.preventDefault();
        if(this.props.onCancel) this.props.onCancel();
        this.hide(); 
    }

    _onSave(event){
        event.preventDefault();
        let errors = []; 
        if(!this.cardName.value || this.cardName.value.trim() === "")
        {   
            errors.push('A Card name must be provided!');
        }

        this.setState({errors});
        if(errors.length <= 0){
            if(this.props.onSave) {  
                this.card.name = this.cardName.value;
                this.card.size = this.cardSize.value;
                this.card.icons.title = this.cardTitleIcon.value;
                this.card.icons.back = this.cardBackIcon.value; 
                this.props.onSave(this.card);
            }
            this.hide()
        }
    }
}