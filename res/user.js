"use strict";

class User {

    // Class Properties
    symbol;
    wins = 0;
    loss = 0;
    ties = 0;

    constructor(symbol) {
        this.symbol = symbol;
    }

    win() {
        this.wins++;
    }

    lose() {
        this.loss++;
    }

    tie() {
        this.ties++;
    }

    getWins() {
        return this.wins.toLocaleString();
    }

    getLoss() {
        return this.loss.toLocaleString();
    }

    getTies() {
        return this.ties.toLocaleString();
    }
}

export default User;