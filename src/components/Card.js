import React from 'react'; 
import rpCard from '../objects/rpCard';
import rpIcons from '../objects/rpIcon';
import Icon from './Icon';
import CardComponent from './CardComponent';

export default class Card extends React.Component
{
    constructor(props){
        super(props);
    }
    get card() { return this.props.item; }

    render(){
        return( 
            <div className={`card ${this.card.size}`} 
                data-value={this.card.id}
                style={ { backgroundColor: this.card.colors.card, color: this.card.colors.font, borderColor:this.card.colors.card } }
                >
                <div className="card-head" style={{color:this.card.colors.fore}}>
                    {this.card.name}
                    <Icon icon={this.card.icons.title} />
                </div>
                <div className="card-body"
                    style={{backgroundColor:this.card.colors.fore}}>
                    {
                        this.card.components.map((component, index) => {
                            return <CardComponent key={index} 
                                        component={component}  
                                        colors={this.card.colors}
                                        icons={this.card.icons} />
                        })
                    }
                </div>
            </div>
        );
    }

}


