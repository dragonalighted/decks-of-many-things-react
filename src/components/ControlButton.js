import React from 'react' 



export default class ControlButton extends React.Component {

    static getDefaultIcon(command) {
        switch(command) {
            case 'edit' : return 'glyphicon-pencil';
            case 'delete':
            case 'trash' : return 'glyphicon-trash';
            case 'add' :
            case 'addTo' : 
            case 'new' :
            case 'plus': return 'glyphicon-plus';
            case 'default' : 
            default: 
                return 'glyphicon-menu-hamburger';
        }
    }

    get icon() { return this.props.icon || ControlButton.getDefaultIcon(this.command) || ''}
    get tooltip() {return this.props.tooltip || ''}
    get command() {return this.props.command || 'default'}

    render(){        
        return ( 
            <span
                className={`ctrl ${this.icon.indexOf('glyphicon') >= 0 ? 'glyphicon' : ''} ${this.icon} ${this.props.className || ''} `}
                title={this.tooltip}
                onClick={ (event) => this.props.itemHandler(event, this.props.command, this.props.item, this.props.id) }
                >
            </span>
        );
    }
}
 