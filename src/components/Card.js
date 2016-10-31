import React from 'react'; 

export default class Card extends React.Component
{
    render(){
        return (
        <div className="card" data-value={this.props.item.id}>
            {this.props.item.name}
        </div>
        );
    }
}

  
