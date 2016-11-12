
import React from 'react';


export default class CardContentsControl extends React.Component {

    constructor(props) {
        super(props);
    }



    render(){
        return (
            <div className="card-contents-control">
                <textarea 
                    className="form-control"
                    ref={(ref) => this.txtContents = ref} 
                    defaultValue={this.props.contents}
                    onChange={(e) => this._handleChange(e)}
                    rows="20">
                </textarea>
            </div>
        );
    }


    get contents(){ return (this.props.contents || '').trim();    }
    get inputContents() { return this.txtContents.value.trim(); }
    _handleChange(e) {
        e.preventDefault();
        e.stopPropagation(); 

        if(this.props.onContentsChanged){           
            // if( this.inputContents != this.contents) {
                this.props.onContentsChanged(this.inputContents);
            // } 
        }
    }
}


class CardContentsToolStrip extends React.Component {

    render() {
        <div className="card-contents-toolstrip">
            
        </div>
    }
}



