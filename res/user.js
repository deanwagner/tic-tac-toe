"use strict";

/**
 * Human Player for {TicTacToe}
 * @class
 * @property {string} symbol  - x/o
 * @property {object} storage - LocalStorage
 * @property {number} wins    - User Wins
 * @property {number} loss    - User Losses
 * @property {number} ties    - User Ties
 * @author Dean Wagner <info@deanwagner.net>
 */
class User {

    // Class Properties
    symbol;
    storage;
    wins = 0;
    loss = 0;
    ties = 0;

    /**
     * Constructor
     * @constructor
     * @param {string} symbol - x/o
     */
    constructor(symbol = 'x') {
        this.symbol = symbol;

        // LocalStorage
        this.storage = window.localStorage;

        // Load History
        if (this.storage.hasOwnProperty('ttt_stats')) {
            const stats = JSON.parse(this.storage.getItem('ttt_stats'));
            this.wins = stats.wins;
            this.loss = stats.loss;
            this.ties = stats.ties;
        }
    }

    /**
     * Save Stats to LocalStorage
     */
    save() {
        const stats = {
            wins : this.wins,
            loss : this.loss,
            ties : this.ties
        }
        this.storage.setItem('ttt_stats', JSON.stringify(stats));
    }

    /**
     * User Win
     */
    win() {
        this.wins++;
        this.save();
    }

    /**
     * User Loss
     */
    lose() {
        this.loss++;
        this.save();
    }

    /**
     * Tie Game
     */
    tie() {
        this.ties++;
        this.save();
    }

    /**
     * Total Wins
     * @returns {string} - wins
     */
    getWins() {
        return this.wins.toLocaleString();
    }

    /**
     * Total Losses
     * @returns {string} - losses
     */
    getLoss() {
        return this.loss.toLocaleString();
    }

    /**
     * Total Ties
     * @returns {string} - ties
     */
    getTies() {
        return this.ties.toLocaleString();
    }
}

export default User;