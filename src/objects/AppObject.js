
import rpDeck from './rpDeck'; 
import rpCard from './rpCard';
import {guid, defaultObj} from './defaultObj';

export default class AppObject{
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

    static loadAppObject(){
        let appJson = localStorage[guid];
        let obj = !appJson ? defaultObj : JSON.parse(appJson);  

        return Object.assign({}, obj) ;  
    }

    addDeck(newDeck) {
        
    }
}