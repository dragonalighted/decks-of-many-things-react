

export default class messageGroup {
    constructor({errors , warnings , success , info } = {}){
        this._errors = errors || [];
        this._warnings = warnings || []; 
        this._success = success || [] ; 
        this._info = info || []; 
    }

    get errors() { return this._errors ;}
    set errors(errors = []) { this._errors = errors || []; }

    get warnings() { return this._warnings ;}
    set warnings(warnings = []) { this._warnings = warnings || []; }

    get success() { return this._success ;}
    set success(success = []) { this._success = success || []; }

    get info() { return this._info ;}
    set info(info = []) { this._info = info || []; }

}