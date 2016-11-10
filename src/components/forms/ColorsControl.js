import React from 'react';
import {namedColors, FavoriteColors} from '../../resource/colors';
import OutlineModal from 'boron/OutlineModal';



export default class ColorsControl extends React.Component {
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
                </tr>
                <tr>
                    <td><ColorSwatch  color={this.colors.card} onClick={(color) => this._handleClick(color, 'Card Color', 'card')}  /></td>
                    <td><ColorSwatch  color={this.colors.fore} onClick={(color) => this._handleClick(color, 'Fore Color', 'fore')}  /></td>
                    <td><ColorSwatch  color={this.colors.font} onClick={(color) => this._handleClick(color, 'Font Color', 'font')}  /></td>
                </tr>
                </tbody>
                <tbody>
                <tr>
                    <th>TH Back</th>
                    <th>TH Fore</th>
                    <th>Bold</th>
                </tr>
                <tr>
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




class ColorSwatch extends React.Component {
    constructor(props){
        super(props);
    }

    get color(){ return FavoriteColors.cleanColor((this.props.color || 'White')) }
    get name(){ return this.props.color.replace('#', '') }

    render() {
        return (
                <div    className="color-control-swatch" 
                        style={{backgroundColor: this.color}} 
                        onClick={ (event) => { 
                            event.preventDefault();
                            event.stopPropagation();
                            if(this.props.onClick)
                                this.props.onClick(this.props.color);} 
                        }>
                    <span className="color-control-swatch-label">
                        {this.name}
                    </span>
                </div>
        );
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

class ColorControl extends React.Component {
    constructor(props){
        super(props); 
        this.state = { 
            title: this.props.title,
            color: FavoriteColors.cleanColor((this.props.color || 'White')),
            name: this.props.color,
            expanded : this.props.expanded || false,
            allowedStyles : this.props.styles || ['all', 'named', 'input'],
            selectedStyle: this.props.style || 'named',
        }
    }
    render(){
        return (
            <div className="color-control"> 
                <div    className="color-control-swatch" 
                        style={{backgroundColor: this.state.color}} 
                        onClick={ () => this.pickerDialog.show()}>
                    <span className="color-control-swatch-label">
                        {this.state.name.replace('#', '')}
                    </span>

                    <ColorPicker
                        enabled={this.props.hasPicker||true} 
                        ref={(ref) => this.picker = ref } 
                        onSelect={(color, name) => this.setState({color, name})}
                        />    
                </div>
            </div>

        );
    }



}


class ColorPicker extends React.Component {

    constructor(props){
        super(props); 
        this.state= {
            expanded : this.props.expanded || false,
            allowedStyles : this.props.styles || ['all', 'named', 'input'],
            selectedStyle: this.props.style || 'named',
            onSelect: this.props.onSelect || function() {},
            title: this.props.title || "Color Picker"

        }
        this.show = this.show.bind(this); 
        this.hide = this.hide.bind(this);
        this.toggle = this.toggle.bind(this);
    }

    init(title, onSelect, allowedStyles, selectedStyle) {
        this.setState({
            title, onSelect,
            allowedStyles: allowedStyles ||  ['all', 'named', 'input'],
            selectedStyle: selectedStyle || 'named'
        })
    }

    toggle() { this.setState({expanded: !this.state.expanded}); }
    show(){ this.setState({expanded: true }); }
    hide() { this.setState({expanded: false}); }


    render(){
        if(this.props.enabled) {
            return(
                <span>
                { this.state.expanded ? <div className='overlay'> </div> : ''}
                <span className={`color-control-picker ${this.props.position || 'above'} ${this.state.expanded ? 'show' : ''}`}
                    onClick={(e) => { e.preventDefault(); e.stopPropagation(); }}>
                        { FavoriteColors.Favorites().map((v, i) => {
                        return ( 
                            <div 
                                key={i}
                                className='color-picker-swatch' 
                                style={{backgroundColor:FavoriteColors.cleanColor(v)}}
                                title={v}
                                onClick={(e) => this._onSelect(e, v)}>
                            </div>
                            );
                    }) }
                </span>
                </span>
            );
        }
    }

    _onSelect(event, color) {
        event.preventDefault();
        event.stopPropagation();
        if(this.props.onSelect)
            this.props.onSelect( FavoriteColors.cleanColor(color), color.replace('#', ''));
    }

}