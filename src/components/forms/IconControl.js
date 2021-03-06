import React from 'react';
import {icons} from '../../resource/icons';
import {rpIconFactory, rpLocalIcon, rpRemoteIcon, rpIcon} from '../../objects/rpIcon';

export default class IconControl extends React.Component {
    constructor(props) {
        super(props)
        this.state= {
            icon : this.props.icon
        };
    }

    get value(){
        return this.state.icon;
    }

    render(){
        return (
            <div className={`icon-control`}>
                <img src={this._getSource()} style={{backgroundColor: this.props.color}}/>
                <div className="icon-control-grp" style={{display:'inline-block'}}>
                    <select ref={(ref) => this.iconType = ref } 
                            className="form-control icon-control-type"
                            value={this.state.icon.type}
                            onChange={(event)=> this._onTypeChange(event)}>
                        <option value="local">Local</option>
                        <option value="remote">Remote (URL)</option>
                    </select>

                    {this._renderIconFields()}
                </div>
            </div>
        );       
    }



    _updateIcon(event, icon) {
        this.setState({icon: icon || this.state.icon}); 
        if(this.props.onChange) this.props.onChange(event);
    }

    _onTypeChange(event){
        this._updateIcon(event,this.iconType.value !== this.props.icon.type ? rpIconFactory( {type:this.iconType.value}) : this.props.icon );
    }

    _getSource(){
        return this.state.icon.url || '';
    }
    _onIconCatChange(event) {
        this.state.icon.category = this.iconCategory.value; 
        this.state.icon.name = this.state.icon.icons[0].name; 
        this._updateIcon(event);

    }
    _onIconUrlChange(event) {
        this.state.icon.url = this.iconUrl.value.trim();
        this._updateIcon(event); 
    }
    _onIconNameChange(event) {
        this.state.icon.name = this.iconName.value
        this._updateIcon(event);
    }
    _renderIconFields(){
        if(this.state.icon.type === 'remote'){
            return ( 
                <div className="icon-control-remote">
                <input  ref={(ref) => this.iconUrl = ref}
                        className="form-control"
                        name="iconUrl"
                        type="text" 
                        placeholder="http://"
                        onChange={(e) => this._onIconUrlChange(e)} />
                </div>
             )
        } else {                     
            return(
                <div className="icon-control-local">
                    <select ref={(ref)=> this.iconCategory = ref} 
                            className="form-control"
                            value={this.state.icon.category}
                            onChange={(e) => this._onIconCatChange(e) }>
                        {icons.map((category) => {
                            return (
                                <option value={category.name} 
                                        key={category.name}>
                                        {category.name}
                                </option>
                            );
                        })} 
                    </select>
                    <select ref={(ref) => this.iconName = ref} 
                            className="form-control"
                            value={this.state.icon.name}
                            onChange={(e) => this._onIconNameChange(e)} >
                        {
                            this.state.icon.icons.map((icon) => {
                                return (
                                    <option value={icon.name}
                                            key={`${this.state.icon.category}\\${icon.name}`} >
                                            {icon.name}
                                    </option>
                                );
                            })
                        }
                    </select>
                </div>
            );
        }
    }

    _getIcon(cat, name){
        
    }
}