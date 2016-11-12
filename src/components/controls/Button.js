

import React from 'react';


class ButtonGroup extends React.Component {
    render(){
        return (
            <div className="pull-right margin-right-10" style={{ marginRight:'1em', marginTop: '1em'}}>
                {this.props.children}
            </div> 
        );
    }
}
export default class Button extends React.Component {


    render() {
        return (
            <button 
                type={`${this.props.isSubmit ? 'submit' : 'button'}`}
                className={`btn btn-md btn-${this.props.type}`} 
                onClick={this.props.onClick}>
                    {this.props.text || this.props.value}
                </button>
        );           
    }

    static _renderButtonGroup(){

    }
    static CancelSubmit(onCancel, onSubmit, cancelText = 'Cancel', submitText = 'Submit'){
        return (
            <ButtonGroup>
                <Button text={cancelText} onClick={onCancel} />
                <Button text={submitText} onClick={onSubmit} isSubmit={true} type='success'/>
            </ButtonGroup>
        );
    }
    static ExitSave(onExit, onSave) { return Button.CancelSubmit(onExit, onSave, 'Exit', 'Save')}
    static ExitSubmit(onExit, onSubmit) { return Button.CancelSubmit(onExit, onSubmit, 'Exit'); }

    static YesNoCancel(onYes, onNo, onCancel) {
        return (
            <ButtonGroup>
                { onCancel ? (<Button text="Cancel" onClick={onCancel}/>) : {} }
                <Button text="No" onClick={onNo} />
                <Button text="Yes" onClick={onYes} type='success'/>
            </ButtonGroup>
        ); 
    }
}

Button.defaultProps = {
    type : 'default', 
    isSubmit : 'false',
    text : 'Button', 
    value : 'Button'
}