import React from 'react';
import FormGroup from './FormGroup';

export default class Form extends React.Component {

    render(){
        return (
            <form className={`${this.props.horizontal?'form-horizontal':''} ${this.props.className||''}`} style={this.props.style || {}}>
                {
                    React.Children.map(this.props.children, (child) =>{
                        if(child.type === FormGroup){
                            return React.cloneElement(child, {
                                labelSize: child.props.labelSize || this.props.labelSize || 'col-md-3', 
                                controlSize: child.props.controlSize || this.props.controlSize || 'col-md-8',
                                horizontal:this.horizontal
                            })
                        }
                        
                        return child ;
                    })

                }
            </form>
        );       
    }

}