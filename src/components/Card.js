import React from 'react'; 
import rpCard from '../objects/rpCard';
import rpIcons from '../objects/rpIcon';
import Icon from './Icon';
import CardComponent from './CardComponent';
import marked from 'marked';
import ControlButton from './ControlButton'; 


let renderer = new marked.Renderer();


export default class Card extends React.Component{
    constructor(props){
        super(props);
        this.state = { 
            card : this.props.item ,
            front: this.props.front || true, 
            back: this.props.back || false, 
            showControls: this.props.showControls } 
    }
    get cardProp() {return this.props.item;}
    get card() { return this.state.card; }
    set card(card = new rpCard()) { this.setState({card}); }
    setCard(card) { this.card = card;}

    render(){
        return( 
            <div data-value={this.card.id}>
                { this._renderFront()}
                { this._renderBack() }            
            </div>
        );
    }

    _renderFront(){
        if(this.state.front){
            return (
                <div className={`card ${this.card.size}`} 
                    style={ { backgroundColor: this.card.colors.card, color: this.card.colors.font, borderColor:this.card.colors.card } }
                    >
                    <div className="card-head" style={{color:this.card.colors.fore}}>
                        <h1>
                            {this.card.name}
                            <Icon icon={this.card.icons.title} />
                            { this._renderControls()}
                        </h1>
                        
                    </div>
                    <CardBody contents={this.card.components} />
                    
                </div>
            );
        }
    }
    _renderControls(){
        if(this.state.showControls) {
            return (
                 <CardControls itemHandler={this.props.itemHandler} card={this.card}/>
            );
        }
    }
    _renderBack(){
        if(this.state.back){
            return (
                <div className={`card card-back ${this.card.size}` }
                    style={ { 
                        backgroundColor: this.card.colors.card,
                        color: this.card.colors.font,
                        borderColor:this.card.colors.card, 
                        position:'relative' 
                    } }
                    >
                        <Icon icon={this.card.icons.back} style={{width:'15%', height:'auto'}}/>
                </div>
            );
        }
    }
}

class CardBody extends React.Component {
    render(){
        return(
            <div 
                className="card-body" 
                dangerouslySetInnerHTML={{ __html: marked(this.props.contents, {sanitize:true, renderer})} }>
            </div>
        );
    }
}


class CardControls extends React.Component {

    get card() {return this.props.card;}
    render() {
        return (
            <div className="card-controls">
                 <ControlButton command="edit" 
                    tooltip="Edit Card" 
                    item={this.card}
                    id={this.card.id}
                    itemHandler={this.props.itemHandler}  
                    />
                 <ControlButton command="trash"
                    tooltip="Delete Card"
                    item={this.card}
                    id={this.card.id}
                    itemHandler={this.props.itemHandler}  
                     />
            </div>
        )
    }

}