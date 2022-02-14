"use strict";

class User {

    // Class Properties
    symbol;
    storage;
    wins = 0;
    loss = 0;
    ties = 0;

    constructor(symbol) {
        this.symbol  = symbol;
        this.storage = window.localStorage;

        if (this.storage.hasOwnProperty('stats')) {
            const stats = JSON.parse(this.storage.getItem('stats'));
            this.wins = stats.wins;
            this.loss = stats.loss;
            this.ties = stats.ties;
        }
    }

    save() {
        const stats = {
            wins : this.wins,
            loss : this.loss,
            ties : this.ties
        }
        this.storage.setItem('stats', JSON.stringify(stats));
    }

    win() {
        this.wins++;
        this.save();
    }

    lose() {
        this.loss++;
        this.save();
    }

    tie() {
        this.ties++;
        this.save();
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