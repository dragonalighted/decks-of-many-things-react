

export default class rpCard {
    constructor({id, name} = {}){
        this._id = id || -1; 
        this.name = name || 'Un-named Card'; 

    }

    get id() { return this._id; }    


    static loadCard(jsCardObj) {
        return Object.assign(new rpCard(), jsCardObj);
    }
}