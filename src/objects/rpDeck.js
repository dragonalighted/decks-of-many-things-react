

import rpCard from './rpCard'; 


export default class rpDeck {
    constructor(id = -1, {name, desc, selected, tags, cards} = {}){
        let defaults = { name :"Un-Named Deck", desc : "", selected: false , tags : [], cards: []}; 
        let options = {name, desc, selected, tags, cards}; 
        let settings = Object.assign({}, defaults, options);

        this._id = id; 
        this._name = settings.name; 
        this._desc = settings.desc;
        this._selected = settings.selected;  
        this._tags = settings.tags; 
        this._cards = settings.cards;
        this._created = new Date();
        this._modified = this.created;   
        this._normalizeCardIds();      
    }

    
    get name() {return this._name;}
    set name(value = "Un-Named Deck") { this._name = value;}

    get desc() {return this._desc;}
    set desc(value = "") { this._desc = value;}

    get selected() {return this._selected; }
    set selected(value = false) { this._selected = value;}

    get tags() { return this._tags;}
    set tags(value = []) { this._tags = value; }
    
    get cards() {return this._cards; }

    get modified() {return this._modified;}
    get created() {return this._created;}
      
    addCard(card){
        let max = 0; 
        for(let value of this._cards){
            if(value.id > max)
                max = value.id; 
        }
        this._cards.push(Object.assign({}, new rpCard(max), card, { _id : max})); 
    }

    removeCard(card){
        let targetId = typeof card === 'number' ? card : card.id;
        let ret = [];   
        for(let cardIndex = 0; cardIndex < this._cards.length; cardIndex++) {
            let value = this._cards[cardIndex]; 
            if(value.id === targetId){
                ret = this._cards.splice(cardIndex, 1);
                break; 
            }
        }
        return ret; 
    }

    merge(rpDeck){
        return Object.assign(this, rpDeck);
    }

    _normalizeCardIds(){
        let id = 1; 
        for(let value of this._cards){
            value._id = id; 
            id++;
        }
    }
}


