

import React from 'react'; 

// Objects 
import rpCard from '../../objects/rpCard';
import messageGroup from '../../objects/messageGroup';

// Controls 
import Form from '../forms/Form';
import FormGroup from '../forms/FormGroup';

import MessageDisplay from '../forms/MessageDisplay';

import Button from '../controls/Button'; 
import {TextBox, Icon, IconInput, DropDown, ColorSelector} from '../controls/Input'; 
import {CardSizeSelector} from '../controls/CardInput';
import Card from './Card';

// Card Specific Controls 
import CardContentsEditor from './CardContentsEditor' ;

export default class CardEditor extends React.Component {
    constructor(props){
        super(props);
        this.state = { card : this.props.card  }
        this._onChange = this._onChange.bind(this);
    }
    render(){
        return (
            <div className="card-editor">
                <div className="row">
                    <h2 >{this.card.id <= 0 ? "New Card" : 'Edit Card'}</h2>
                    <MessageDisplay messages={this.messages} />
                </div>
                <div className="row">
                    <Form 
                        horizontal={true} 
                        className="col-md-6" 
                        labelSize="col-md-2" 
                        controlSize="col-md-10">
                        <FormGroup name="name" required="true" label="Name">
                            <TextBox 
                                placeholder="Card Name"
                                defaultValue={this.card.name}
                                onChange={this._onChange} 
                                propSetter={(card, value) => card.name = value }/>
                        </FormGroup>     
                        <FormGroup name="size" required="true" label="Size">
                            <CardSizeSelector
                                defaultValue={this.card.size}
                                onChange={this._onChange}/>
                        </FormGroup>     
                        <FormGroup name="icon" label="Front / Back Icons" >
                            <IconInput
                                style={{display:'inline'}}
                                icon={this.card.icons.title} 
                                color={this.card.colors.card}
                                onChange={this._onChange}
                                propSetter={(card, icon) => card.icons.title = icon}
                            />
                            <IconInput
                                icon={this.card.icons.back} 
                                color={this.card.colors.card}
                                onChange={this._onChange}
                                propSetter={(card, icon) => card.icons.back = icon}
                            />
                        </FormGroup>
                        <FormGroup name="colors" label="Colors">
                            <ColorSelector
                                colors={this.card.colors}
                                onChange={this._onChange}
                                propSetter={(card, colors) => this.card.colors = colors}
                                />
                        </FormGroup>
                    </Form>
                    <Form 
                        horizontal={true} 
                        className="col-md-6" 
                        labelSize="col-md-2" 
                        controlSize="col-md-10">
                        <FormGroup name="contents" required="false" label="Contents">
                            <CardContentsEditor 
                                ref={(ref) => this.contentsEditor = ref}
                                contents={this.card.components} 
                                onContentsChanged={(contents) => { this.card.components = contents; this._updateCard();}}/>
                        </FormGroup>                    
                    </Form>
                </div>
                <div className="row margin-10" style={{height:'80px', borderBottom:'1px solid navy'}}>
                    {Button.ExitSave((e) => this._onExit(e), (e) => this._onSave(e))}
                </div>
                <div className="row">
                    <Card item={this.card} ref={(ref) => this.CardPreview = ref} back={false}/>
                </div>

            </div>
        );

    }

    get card() { return this.state.card; }
    set card(card = new rpCard()) { this.setState({card});}

    get messages() { return this.state.messages; }
    set messages(messages = new messageGroup()) { this.setState({messages}); }


    _updateCard() { this.CardPreview.setCard(this.card); }
    _onChange(ref, propSetter) {
        if(propSetter) {
            propSetter(this.card, ref.value);
            this.CardPreview.setCard(this.card);
        }
    }
    _onExit(event){
        event.preventDefault();
        event.stopPropagation();         
        if(this.props.onExit) {this.props.onExit();}
    }
    _onSave(event) {
        event.preventDefault();
        event.stopPropagation(); 
        
    }
}

CardEditor.defaultProps = {
    card : new rpCard(),
    messages : new messageGroup()
}


class CardIconsEditor extends React.Component {

    render() {
        return (
            <span> 
                <FormGroup name="front-icon" label="Title" >
                    <IconControl
                        ref={(ref) => this.cardTitleIcon = ref} 
                        icon={this.card.icons.title} 
                        color={this.card.colors.card}
                        onChange={(e) => this._onChange(e, this.cardTitleIcon, (item, value) => item.icons.title = value) }
                    />
                </FormGroup>
                <FormGroup name="front-icon" label="Back" >
                    <IconControl
                        ref={(ref) => this.cardBackIcon = ref}  
                        icon={this.card.icons.back}  
                        color={this.card.colors.card} 
                        onChange={(e) => this._onChange(e, this.cardTitleIcon, (item, value) => item.icons.title = value) }
                    />                               
                </FormGroup>
            </span>
        );

    }

} 

