import React from 'react';
import OutlineModal from 'boron/OutlineModal';
import rpCard from '../../objects/rpCard';

import Form from '../forms/Form';
import FormGroup from '../forms/FormGroup';
import IconControl from '../forms/IconControl';
import ColorsControl from '../forms/ColorsControl'; 
import CardContentsControl from '../forms/CardContentsControl';
import Card from '../Card';

// For todays date;
Date.prototype.today = function () { 
    return ((this.getDate() < 10)?"0":"") + this.getDate() +"/"+(((this.getMonth()+1) < 10)?"0":"") + (this.getMonth()+1) +"/"+ this.getFullYear();
}

// For the time now
Date.prototype.timeNow = function () {
     return ((this.getHours() < 10)?"0":"") + this.getHours() +":"+ ((this.getMinutes() < 10)?"0":"") + this.getMinutes() +":"+ ((this.getSeconds() < 10)?"0":"") + this.getSeconds();
}

export default class CardModal extends React.Component{
    constructor(props){
        super(props);
        this.state = this.initialState();
        this.show = this.show.bind(this); 
        this.hide = this.hide.bind(this);
        this.setCard = this.setCard.bind(this);

        this._onCancel = this._onCancel.bind(this);
        this._onSave = this._onSave.bind(this);
        this._onCardContentsChanged = this._onCardContentsChanged.bind(this);
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
            success: []
        };
    }

    get card(){return this.state.card }
    set card(card = new rpCard()) { this.setCard(card) ;}
    render(){      
        return(
            <OutlineModal ref={(modal) => this.modal = modal} 
                onShow={() => this._onShow()}
                closeOnClick={false}
                modalStyle= {{width: '100%', minWidth:'800px', height:"600px;"}}
                >                
                <div className="modal-container row">
                    <div className="col-md-12">
                        <h2 >{this.card.id <= 0 ? "New Card" : 'Edit Card'}</h2>
                    </div>
                    <div className="col-md-12">
                    {this._getErrors()}
                    {this._getSuccess()}
                    </div>
                    <div className="col-md-3">
                        <Form   horizontal={true} 
                                labelSize="col-md-2"
                                controlSize="col-md-10">                            
                            <FormGroup name="name" required="true" label="Name">
                                <input  type="text" placeholder="Card Name" 
                                        defaultValue={this.card.name} ref={(input) => this.cardName = input} 
                                        data-prop="name"/>                            
                            </FormGroup>
                            <FormGroup name="size" required="true" label="Size">
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
                        </Form>
                    </div>
                    <div className="col-md-3">
                        <Form   horizontal={true}
                                labelSize="col-md-2"
                                controlSize="col-md-10">
                            <FormGroup name="contents" label="Contents">
                                <CardContentsControl 
                                    ref={(ref) => this.CardContents = ref}
                                    contents={this.card.components} 
                                    onContentsChanged={this._onCardContentsChanged}/>
                            </FormGroup> 
                        </Form>
                    </div>
                    <div className="col-md-6" style={{overflow:'auto', minHeight:'150px',  maxHeight:"600px"}}>                        
                        <Card item={this.card} ref={(ref) => this.CardPreview = ref} back={false}/>
                    </div>                    
                </div> 
                <div className="row" style={{paddingBottom:'25px', borderTop: '1px solid navy', width:'90%', marginLeft: '5%'}}>
                    <div className="pull-right" style={{marginRight: '37%', marginTop: '1em'}}>
                        <button type="button" className="btn btn-md btn-default" onClick={this._onCancel}>Cancel</button>
                        <button type="submit" className="btn btn-md btn-success" onClick={this._onSave}>Save</button>
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

    _getSuccess() {
        if(this.state.success != null && this.state.success.length > 0  ) {
            return (
                <div className="alert alert-success">
                    <ul>
                        {this.state.success.map(function(value, index){return (<li>{value}</li>)})}                  
                    </ul>
                </div>
            );
        }
    }

    _onCardContentsChanged(contents) {
        console.log(`contents: ${contents}`);
        let card = Object.assign(new rpCard(), this.card);
        card.components = contents;
        this.CardPreview.setCard(card);
        //this.card = card; 

    }
    _onCancel(event){
        event.preventDefault();
        event.stopPropagation(); 
        if(this.props.onCancel) this.props.onCancel();
        this.hide(); 
    }

    _onSave(event){
        event.preventDefault();
        event.stopPropagation(); 
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
                this.card.components = this.CardContents.inputContents;
                if(this.props.onSave(this.card)){
                    this.setState({success: [`Successfully saved card! ${new Date().today()} @ ${new Date().timeNow()}`]})
                }
                
            }

        }
    }
}