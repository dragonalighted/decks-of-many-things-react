
import rpDeck from './rpDeck'; 
import rpCard from './rpCard';
import {guid, defaultObj} from './defaultObj';

export default class AppObject{
    constructor({decks} = {}){
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
        let appObj = Object.assign(new AppObject(), !appJson ? defaultObj : JSON.parse(appJson));

        for(let di = 0; di < appObj.decks.length; di++){
            appObj.decks[di] = rpDeck.loadDeck(appObj.decks[di]);
        }

        return appObj;
    }

    static saveAppObject(appObj){
        try{
            let objString = JSON.stringify(appObj);
            localStorage[guid] = objString;
            return null;
        }
        catch(err) {
            return err; 
        }
    }
}