

import rpCard from './rpCard'; 


export default class rpDeck {
    constructor(id = -1, {name, desc, selected, tags, cards} = {}){
        this._id = id; 
        this.name = name; 
        this.desc = desc;
        this.selected = selected;   
        this.tags = tags; 
        this._cards = cards || [];
        this._created = new Date();
        this._modified = this.created;   
        this._normalizeCardIds();      
    }

    get id() {return this._id;}
    
    get name() {return this._name;}
    set name(value = "") { this._name = value;}

    get desc() {return this._desc;}
    set desc(value = "") { this._desc = value;}

    get selected() {return this._selected; }
    set selected(value = false) { this._selected = value;}

    get tags() { return this._tags;}
    set tags(value = []) { 
        this._tags = value;
        this.cleanTags();
    }
    

    get cards() {return this._cards; }

    get modified() {return this._modified;}
    get created() {return this._created;}

    cleanTags(val = ""){
       for (var i = 0; i <this._tags.length; i++) {
            if (this._tags[i].trim() === val) {         
                this._tags.splice(i, 1);
                i--;
            }
        }
    }  

    addCard(card){
        let max = 0; 
        for(let value of this._cards){
            if(value.id > max)
                max = value.id; 
        }
        max++;
        this._cards.push(Object.assign( new rpCard(max), card, { _id : max})); 
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

    replaceCard(card) {
        for(let cardIndex = 0; cardIndex < this._cards.length; cardIndex++) {
            let value = this._cards[cardIndex]; 
            if(value.id === card.id) {
                this._cards[cardIndex] = card;
                return;  
            }
        }
        this.addCard(card);
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

    static removeDeck(decks, deckId){
        let l = decks.length; 
        for(let i = 0; i < l; i++){
            if(decks[i].id === deckId) {
                decks.splice(i,1);
                return decks; 
            }
        }
    }

    static addDeck(decks, newDeck) {
        newDeck._id = rpDeck._getNextId(decks); 
        decks.push(newDeck); 
        return decks;         
    }
    static _getNextId(decks){
        let nextId = 0; 
        for(let deck of decks){
            if( deck.id > nextId )
            { 
                nextId = deck.id; 
            } 
        }
        nextId++; 
        return nextId; 
    }

    static selectDeck(decks, deckId, multiSelect = false) {        
        for(let deck of decks)
        {
            if(deck.id === deckId){
                deck.selected = true;
            }
            else if(!multiSelect) {
                deck.selected = false; 
            }
        }
    }


    static loadDeck(jsDeckObj) {
        let deck = Object.assign(new rpDeck(), jsDeckObj);

        for(let ci = 0; ci < deck.cards.length; ci++){
            deck._cards[ci] = rpCard.loadCard(deck._cards[ci]);
        }
        return deck;
    }

    static getDeck(decks, deckId){
        for(let deck of decks)
        {
            if(deck.id === deckId){
                return deck;
            }
        }
        return null;
    }
}


