import React from 'react';
import FadeModal from 'boron/FadeModal';



export default class ConfirmationModal extends React.Component {

    constructor(props){
        super(props);
        this.state = {key : -1, item : null, command: 'trash'};
        this.show = this.show.bind(this); 
        this.hide = this.hide.bind(this);
    }

    render(){
        return (
            <FadeModal ref={(modal) => this.modal = modal} 
                closeOnClick={false}
                onShow={() => this.btnCancel.focus()}>
                <div className="modal-container row">
                    <span style={{color:"red", fontSize:"25pt"}} 
                        className="text-danger glyphicon glyphicon-warning-sign pull-left">
                    </span>

                    <h3 style={{verticalAlign:"middle"}}>{this.props.title || "Are you sure?"}</h3>
                    <p> {this.props.action || "Are you sure?"}</p>
                    <div className="pull-right" style={{marginRight: '2em', marginTop: '1em'}}>
                        <button type="button" className="btn btn-default" onClick={() =>  this._onNo() }
                            ref={(ref) => this.btnCancel = ref}>No</button>
                        <button type="submit" className="btn btn-default" onClick={() => this._onYes()}>Yes</button>
                    </div>
                </div>
            </FadeModal>
        );

    }
    show(){ this.modal.show(); }
    hide(){ this.modal.hide(); }
    _onYes(){
        if(this.props.onYes)
            this.props.onYes(this.state.command, this.state.item, this.state.key);
        this.hide();
    }

    _onNo(){
        if(this.props.onNo)
            this.props.onNo(this.state.command, this.state.item, this.state.key);
        this.hide();

    }
} 
