


function rpIconFactory(icon = {type:'local'}) {
    switch(icon.type) {
        case 'remote' : 
            return new rpRemoteIcon(icon.url);         
        case 'local' : 
        default:
            return new rpLocalIcon(icon.category, icon.name); 
    }
}



class rpLocalIcon {

    constructor(category = '', type = 'ace') {
        this.category = category; 
        this.type = type; 
    }
}

class rpRemoteIcon {
    constructor(url) {
        this.url = url; 
    }
}


export {rpIconFactory, rpLocalIcon, rpRemoteIcon}; 