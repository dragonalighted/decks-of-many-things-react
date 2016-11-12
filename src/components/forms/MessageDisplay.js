import React from 'react';
import messageGroup from '../../objects/messageGroup';


export default class MessageDisplay extends React.Component {
    constructor(props){
        super(props);
        this.state = { 
            messages : this.props.messages || new messageGroup()
        }
    }

    get messages() { return this.state.messages;}
    set messages(messages = new messageGroup()) { this.setState({messages});}

    get errors() { return this.messages.errors; }
    set errors(errors = []) { this.errors = errors;  this._update();}

    get success() {return this.messages.success ; }
    set success(success = []) { this.success = success; this._update(); }

    get warnings() {return this.messages.warnings ; }
    set warnings(warnings = []) { this.warnings = warnings; this._update(); }

    get info() {return this.messages.info ; }
    set info(info = []) { this.info = info; this._update(); }

    _update(){ this.messages = this.messages ;}
    _clear() { this.messages = new messageGroup(); }

    _renderMsg(value, index) { return (<li>{value}</li>); }
    _renderMsgBox(msgs, type = 'info') {
        if(msgs && msgs.length > 0 ){
            return (
                <div className={`alert alert-${type}`}>
                    <ul>
                        {msgs.map( this._renderMsg)}                  
                    </ul>
                </div> 
            );
        }
    }
    render(){
        return(
            <div className="msg-group">
                {this._renderMsgBox(this.errors     , 'danger'  )}
                {this._renderMsgBox(this.warnings   , 'warning' )}
                {this._renderMsgBox(this.success    , 'success' )}
                {this._renderMsgBox(this.info       , 'info'    )}
            </div>
        );
    }

}