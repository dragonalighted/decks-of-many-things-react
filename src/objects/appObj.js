
import rpDeck from './rpDeck'; 
import rpCard from './rpCard';


export default class appObj{
    constructor({decks}){
        this.decks = decks || []; 
    }

    getDeck(id){
        for(let value of this.decks){
            if(value.id === id)
                return value; 
        }
        return null; 
    }

    static loadAppObj(appGuid {defaultIfNone}){
        let appJson = localStorage[appGuid];

        if(!appJson) 
            appObj = Object.assign({}, ne defaultObj) ;
  
    return appObj; 
        return appJson; 
    }
}