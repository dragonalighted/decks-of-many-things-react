

import React from 'react';
import { rpIconFactory, rpLocalIcon, rpRemoteIcon, rpIcon} from '../../objects/rpIcon';
import {icons} from '../../resource/icons';
import {namedColors, FavoriteColors} from '../../resource/colors';
import OutlineModal from 'boron/OutlineModal';

export default class InputBase extends React.Component {
    constructor(props) { 
        super(props);
        this._onChange = this._onChange.bind(this); 
    }

    _onChange(e, ref, propSetter) {
        e.preventDefault(); 
        e.stopPropagation(); 

        if(this.props.onChange) {
            this.props.onChange(ref, propSetter);
        } 

    }
}



class TextBox extends InputBase {
    render(){
        return(
            <input  
                type="text" 
                className={this.props.className}
                style={this.props.style}
                placeholder={this.props.placeholder} 
                defaultValue={this.props.defaultValue}
                value={this.props.value} 
                ref={(textBox) => this.textBox = textBox} 
                onChange={(e) => this._onChange(e, this.textBox, this.props.propSetter)} />
        )  
    }
}
TextBox.defaultProps = {
    className:'',
    style:{},
    placeholder: '',
    defaultValue:'',
    value:undefined
};

class DropDown extends InputBase {
    render() {
        return (
            <select 
                ref={(dd) => this.dropDown = dd} 
                className={this.props.className}
                style={this.props.style}
                defaultValue={this.props.style}
                onChange={(e)=> this._onChange(e, this.dropDown, this.props.propSetter)}>
                {this.props.children}    
            </select>
        );
    }
}
DropDown.defaultProps= {
    className: '', style: {}
}

class Icon extends React.Component {
    get icon() {return this.props.icon ; }
    render() {
        return (
            <img className="icon" src={ this.icon.url } style={this.props.style || {}}/> 
        ); 
    }
}

class IconInput extends InputBase {
    constructor(props) {
        super(props);
        this.state = { icon: this.props.icon }
        this._localOnChange = this._localOnChange.bind(this);
    }
    get icon() { return this.state.icon; }
    set icon(icon) {
        this.iconType.value !== this.props.icon.type ? rpIconFactory( {type:this.iconType.value}) : this.props.icon ;
        this.setState({icon})
    }

    get value() {return this.icon; }

    _localOnChange(ref, propSetter) {
        if(propSetter) { propSetter(this.icon, ref.value) }
        this.setState({icon : this.icon});
        if(this.props.onChange)
            this.props.onChange({value: this.icon},  this.props.propSetter);
    }
    render() {
        return (
            <div className={`icon-control`} style={this.props.style || {}}>
                <Icon icon={this.icon} style={{backgroundColor: this.props.color}}/>
                <div className='icon-control-grp' style={{display:'inline-block'}}>
                    <DropDown
                        className="form-control icon-control-type"
                        defaultvalue={this.icon.type}
                        onChange={this._localOnChange}
                        propSetter={(icon, type)=> { icon = type !== icon.type ? rpIconFactory({type}) : icon; }}
                    >
                        <option value="local">Local</option>
                        <option value="remote">Remote (URL)</option>
                    </DropDown>
                    {this._renderRemote()}
                    {this._renderLocal()}
                </div>
            </div>
        );
    }
    _renderRemote(){
        if(this.icon.type === 'remote') {
            return ( 
                <div className="icon-control-remote">
                    <Input 
                        className="form-control" 
                        name="iconUrl" 
                        placeholder="http://"
                        onChange={this._localOnChange}
                        propSetter={(icon, url) => icon.url = url.trim()} 
                    />
                </div>
             );
        }
    }
    _renderLocal() {
        if(this.icon.type === 'local') {
            return(
                <div className="icon-control-local">
                    <DropDown 
                        className="form-control" 
                        defaultValue={this.icon.category}
                        propSetter={(icon, cat) => { icon.category = cat; icon.name = icon.icons[0].name; }}
                        onChange={this._localOnChange}>
                        {
                            icons.map((category) => {
                                return (
                                    <option value={category.name} 
                                            key={category.name}>
                                            {category.name}
                                    </option>
                                );
                            })
                        } 
                    </DropDown>
                    <DropDown 
                        className="form-control" 
                        defaultValue={this.icon.name}
                        propSetter={(icon, name) => { icon.name = name; }}
                        onChange={this._localOnChange}>
                        {
                            this.icon.icons.map((icon) => {
                                return (
                                    <option value={icon.name}
                                            key={`${this.icon.category}\\${icon.name}`} >
                                            {icon.name}
                                    </option>
                                );
                            })
                        }
                    </DropDown>                    
                </div>
            );
        }
    }

}
IconInput.defaultProps = { color: 'black' };

class ColorPicker extends React.Component {
    constructor(props) {
        super(props)
        this.show = this.show.bind(this);
    }
    show(x,y, onChange) {

    }

    render(){
        return (
            <div className='color-picker' style={{backgroundColor:'yellow'}}>
                COLOR PICKER
            </div>
        );
    }
}

class ColorSwatch extends React.Component {
    constructor(props){
        super(props);
        this.state = { expanded : false, x:0,y:0}
    }

    get color(){ return FavoriteColors.cleanColor((this.props.color || 'White')) }
    get name(){ return this.props.color.replace('#', '') }

    render() {
        return (
            <div  className="color-control-swatch" 
                    style={{backgroundColor: this.color}} 
                    onClick={ (e) =>  this._handleClick(e) } >
                <span className="color-control-swatch-label">
                    {this.name}
                </span>
                {this._renderSwatch()}
            </div>
        );
    }

    _handleClick(e) {
        debugger;
        e.preventDefault();
        e.stopPropagation();
        this.setState({
            expanded : !this.state.expanded,
            x: e.clientX,
            y: e.clientY
        })
        console.log(event);

    }

    _renderSwatch(){
        if(this.state.expanded) {
            return (
                <ColorPicker coords={{X:this.state.x, Y:this.state.y}}/>
            );
        }
    }
}


class ColorPickerModal extends React.Component {
    constructor(props) {
        super(props); 
        this.state = {
            color: this.props.color || 'White',
            title: this.props.title || 'Color Picker',
            onYes: this.props.onYes || function() {}
        }
        this.show = this.show.bind(this);
        this.hide = this.hide.bind(this);
        this.toggle = this.toggle.bind(this);
        this.init = this.init.bind(this);        
    }
    show(){ this.dialog.show(); }
    hide(){ this.dialog.hide(); }
    toggle(){ this.dialog.toggle(); }
    init(color, title, onYes, show) {
        this.setState({color, title: title || this.state.title, onYes: onYes || this.state.onYes});
        if(show) this.show();
    }
    render() {
        return (
            <OutlineModal ref={(ref) => this.dialog = ref} >
                <div className="modal-container row">
                    <h4 style={{borderBottom:'1px navy solid'}}>{this.state.title || 'Color Picker'}</h4>
                    <div className="col-md-2"> 
                        <ColorSwatch color={this.state.color} ref={(ref)=> this.swatch = ref } />
                    </div>
                    <div className="col-md-10">
                        { 
                            FavoriteColors.Favorites().map((v, i) => {
                                return ( 
                                <div 
                                    key={i}
                                    className='color-picker-swatch' 
                                    style={{backgroundColor:FavoriteColors.cleanColor(v)}}
                                    title={v} 
                                    onClick={(e) => this._onClick(e, v)}>
                                </div>
                                );
                            }) 
                        }
                    </div>
                    <div className="col-md-12">
                        <div className="pull-right">
                            <button className='btn btn-default' onClick={(e) =>{ this._onNo(e)}}>Cancel</button>
                            <button className='btn btn-success' onClick={(e) => this._onYes(e)}>Select</button>
                        </div>
                    </div>
                </div>
            </OutlineModal>
        );
    }

    _onNo(e){
        e.preventDefault();
        e.stopPropagation(); 
        this.hide()
    }
    _onYes(e) {
        e.preventDefault();
        e.stopPropagation();
        this.hide()
        this.state.onYes(this.state.color); 
    }
    _onClick(e, color) {
        e.stopPropagation();
        e.preventDefault(); 
        this.setState({color});
    }
}

class ColorSelector extends React.Component {
    constructor(props){
        super(props);
        this.state = { colors: Object.assign({}, this.props.colors)}
    }
    get value() {return this.colors ;}
    get colors(){ return this.state.colors; }
    render(){
        return (
        <div className="colors-control">
            <ColorPickerModal ref={(ref)=> this.picker = ref}/>
            <table>
                <tbody>
                <tr>
                    <th>Card</th>
                    <th>Fore</th>
                    <th>Font</th>
                    <th>TH Back</th>
                    <th>TH Fore</th>
                    <th>Bold</th>
                </tr>
                <tr>
                    <td><ColorSwatch  color={this.colors.card} onClick={(color) => this._handleClick(color, 'Card Color', 'card')}  /></td>
                    <td><ColorSwatch  color={this.colors.fore} onClick={(color) => this._handleClick(color, 'Fore Color', 'fore')}  /></td>
                    <td><ColorSwatch  color={this.colors.font} onClick={(color) => this._handleClick(color, 'Font Color', 'font')}  /></td>
                    <td><ColorSwatch  color={this.colors.bold} onClick={(color) => this._handleClick(color, 'Bold Color', 'bold')}  /></td>
                    <td><ColorSwatch  color={this.colors.thBack} onClick={(color) => this._handleClick(color, 'Header Back', 'thBack')}  /></td>
                    <td><ColorSwatch  color={this.colors.thFore} onClick={(color) => this._handleClick(color, 'Header Fore', 'thFore')}  /></td>
                </tr>
                </tbody>
            </table>
        </div> 
        );
    }

    _handleClick(color, title, propertyName){
        this.picker.init(color, title, (c) => {
            this.colors[propertyName] = c
            this.setState({colors: this.colors})
            this.props.onChange(null)
        } , true );
    }

} 

export {TextBox, Icon, IconInput, DropDown, ColorSelector, ColorSwatch} 