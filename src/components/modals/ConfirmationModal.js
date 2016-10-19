import React from 'react';
import FadeModal from 'boron/FadeModal';



export default class ConfirmationModal extends React.Component {

    constructor(props){
        super(props);
        this.state = {key : -1};
        this.show = this.show.bind(this); 
        this.hide = this.hide.bind(this);
    }

    render(){
        return (
            <FadeModal ref={(modal) => this.modal = modal} >
                <div className="modal-container row">
                    <h3>Are you sure?</h3>
                    <p> {this.props.action || "Are you sure?"}</p>
                    <div className="pull-right" style={{marginRight: '2em', marginTop: '1em'}}>
                        <button type="button" className="btn btn-default" onClick={() =>  this._onNo() }>No</button>
                        <button type="submit" className="btn btn-default" onClick={() => this._onYes()}>Yes</button>
                    </div>
                </div>
            </FadeModal>
        );

    }

    show(){
        this.modal.show();
    }
    hide(){
        this.modal.hide();
    }
    _onYes(){
        if(this.props.onYes)
            this.props.onYes(this.state.key);
        this.hide();
    }

    _onNo(){
        if(this.props.onNo)
            this.props.onNo(this.state.key);
        this.hide();

    }
} 
