


const defaultObj = {     
    decks: [
        {
            key: "1",
            name: "Example Deck",
            tags: ["example", "demo"],
            created:new Date(), 
            modified:null,
            cards: [
                {
                    key: "1",
                    name: "Burning Hands"                    
                }, 
                {
                    key: "2",
                    name: "Shield"
                }
            ]  
        },
        {
            key: "2",
            name : "Example Deck 2",
            tags: ["example", "Demo"],
            created:new Date(), 
            modified:null,
            cards: [
                {
                    key: "2-1",
                    name: "Burning Hands"                    
                }, 
                {
                    key: "2-2",
                    name: "Shield"
                }
            ]
        }
    ]
};



module.exports = defaultObj; 