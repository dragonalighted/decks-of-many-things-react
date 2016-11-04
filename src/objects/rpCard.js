

import {rpIconFactory} from './rpIcon'; 

export default class rpCard {
    constructor( {id, name, icons, colors, size } = {}, components = [] ){
        this._id = id || -1; 
        this.name = name || ''; 
        this._icons = icons || rpCard._defaultIcons()
        this._colors = colors || rpCard._defaultColors(); 
        this._size = size || "poker"; 
        this._components = components; 
    }

    get components() { return this._components;}
    set components(value = []) {this.components = value || [];}

    get size() { return this._size || "poker"}
    set size(value = "poker") {this._size = value}
    get colors() { return this._colors }
    set colors(value = {}) { this._colors = rpCard._defaultColors(value); }

    get icons() { return this._icons }
    set icons(value = {}) { this._icons = rpCard._defaultIcons(value);}

    get id() { return this._id; }    


    static loadCard(jsCardObj) {
        let card = Object.assign(new rpCard(), jsCardObj);
        card.icons = card.icons; 
        card.colors = card.colors; 
        return card; 
    }

    static _defaultColors(colors){
        colors = colors || {}; 
        colors.card = colors.card || 'black';
        colors.fore = colors.fore || 'white';  
        colors.font = colors.font || 'black'; 
        colors.bold = colors.bold || colors.card;
        colors.thBack = colors.thBack || colors.card; 
        colors.thFore = colors.thFore || colors.fore;
        return colors; 
    }

    static _defaultIcons(icons){
        icons = icons || {};
        icons.title = rpIconFactory( icons.title );
        icons.back = rpIconFactory(icons.back);   
        return icons; 
    }

}