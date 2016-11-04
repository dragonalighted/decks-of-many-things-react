


import React from 'react';
import FormLabel from './FormLabel';


export default class FormGroup extends React.Component{

    render(){
        return(
            <div className={`form-group ${this.props.required ? 'required':''}`}>
                <label  className={`control-label ${this.props.labelSize}`} 
                        name={this.props.name} > 
                    {this.props.label}
                </label>
                <div className={this.props.controlSize}>
                    {
                        React.Children.map(this.props.children, (child) => {
                            let props = {
                                className : `form-control ${child.props.className ||''} ${child.props.size || this.props.controlSize}`, 
                                name : child.props.name || this.props.name 
                            }
                            
                            return React.cloneElement(child, props); 
                        })
                    }
                </div>
            </div>

        );

    }

}