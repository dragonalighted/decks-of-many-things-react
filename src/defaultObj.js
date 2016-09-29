
import rpDeck from './objects/rpDeck'; 
import rpCard from './objects/rpCard'; 

const guid = '9e39253c-b1f8-4d0a-822f-6a386757ba43';
const defaultObj = {     
    decks: [
        new rpDeck(1, {name:'Example Deck', selected:true, tags:['example', 'demo'], cards:[
            new rpCard({name:'Poison Spray'}),
            new rpCard({name:'Lots of Gold'}),
            new rpCard({name:'Wish'})
        ]}), 
        new rpDeck(2, {name:'Demo Deck', selected:false, tags:['example', 'demo'], cards:[
            new rpCard({name:'Burning Hands'}),
            new rpCard({name:'Shield'})
        ]} ),         
    ]
};



export {guid, defaultObj}; 
