import React from 'react';


export default class FormLabel extends React.Component{

    render(){
        return(
            <label htmlFor={this.props.name}
                className={`control-label ${this.props.size}`}> 
                {this.props.label} 
            </label>
        );

    }

}