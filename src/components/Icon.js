

import React from 'react'; 
import { rpIconFactory, rpLocalIcon, rpRemoteIcon, rpIcon} from '../objects/rpIcon';

export default class Icon extends React.Component {

    render() {
        return (
            <img className="icon" src={ this.props.icon.url } style={this.props.style || {}}/> 
        ); 
    }
}