
import {icons} from '../resource/icons'; 

function rpIconFactory(icon = {type:'local'}) {
    switch(icon.type) {
        case 'remote' : 
            return new rpRemoteIcon(icon.url);         
        case 'local' : 
        default:
            return new rpLocalIcon(icon.category, icon.name); 
    }
}

class rpIcon {
    constructor(type) {
        this.type = type; 
    }
}

class rpLocalIcon extends rpIcon {

    constructor(category = 'default', name = 'ace') {
        super('local');
        this.category = category; 
        this.name = name; 
    }

    get url() {  
        let icon = this.icon; 
        return icon ? icon.path : ''
    }
    get icon() {        
        let icons = this.icons; 
        for(let ic of icons) {
            if(ic.name === this.name) {
                return ic; 
            }
        }
    }
    get icons() {
        for(let cat of icons){
            if(cat.name === this.category) {
                return cat.icons;         
            }
        }
    }
}

class rpRemoteIcon extends rpIcon {
    constructor(url) {
        super('remote');
        this.url = url; 
    }
}


export {rpIconFactory, rpLocalIcon, rpRemoteIcon, rpIcon}; 