"use strict";

class User {

    // Class Properties
    symbol;
    name;
    wins  = 0;
    loss  = 0;
    ties  = 0;
    depth = 0;

    constructor(symbol) {
        this.symbol = symbol;
    }
}

export default User;