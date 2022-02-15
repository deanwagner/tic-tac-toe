"use strict";

/**
 * Game Board for {TicTacToe}
 * @property {number} size  - Board Size
 * @property {number} plays - Number of Plays
 * @property {array}  board - Board Array
 * @author Dean Wagner <info@deanwagner.net>
 */
class Board {

    // Class Properties
    size  = 9;
    plays = 0;
    board = [];

    /**
     * Constructor
     * @constructor
     * @param {array} board - Board Array
     */
    constructor(board = ['', '', '', '', '', '', '', '', '']) {
        this.board = board;
    }

    /**
     * Check Board Status
     * @returns {object|null} - Result Object
     */
    checkBoard() {
        switch (true) {
            // Row 1
            case ((this.board[0] !== '') && (this.board[0] === this.board[1]) && (this.board[1] === this.board[2])):
                return {symbol: this.board[0], streak: ['0', '1', '2']};
            // Row 2
            case ((this.board[3] !== '') && (this.board[3] === this.board[4]) && (this.board[4] === this.board[5])):
                return {symbol: this.board[3], streak: ['3', '4', '5']};
            // Row 3
            case ((this.board[6] !== '') && (this.board[6] === this.board[7]) && (this.board[7] === this.board[8])):
                return {symbol: this.board[6], streak: ['6', '7', '8']};

            // Column 1
            case ((this.board[0] !== '') && (this.board[0] === this.board[3]) && (this.board[3] === this.board[6])):
                return {symbol: this.board[0], streak: ['0', '3', '6']};
            // Column 2
            case ((this.board[1] !== '') && (this.board[1] === this.board[4]) && (this.board[4] === this.board[7])):
                return {symbol: this.board[1], streak: ['1', '4', '7']};
            // Column 3
            case ((this.board[2] !== '') && (this.board[2] === this.board[5]) && (this.board[5] === this.board[8])):
                return {symbol: this.board[2], streak: ['2', '5', '8']};

            // Diagonal top-left to bottom-right
            case ((this.board[0] !== '') && (this.board[0] === this.board[4]) && (this.board[4] === this.board[8])):
                return {symbol: this.board[0], streak: ['0', '4', '8']};
            // Diagonal top-right to bottom-left
            case ((this.board[2] !== '') && (this.board[2] === this.board[4]) && (this.board[4] === this.board[6])):
                return {symbol: this.board[2], streak: ['2', '4', '6']};

            // No more moves; tie game
            case (this.plays === this.size):
                return {symbol: 't', streak: []};

            // No Winner
            default:
                return null;
        }
    }

    /**
     * Insert a new symbol (x/o) into Board
     * @param {string} symbol - x/o
     * @param {number} index - Slot Position
     * @return {boolean} - success/fail
     */
    insert(symbol, index) {
        if(index >= this.size || this.board[index] !== '') {
            return false;
        } else {
            this.board[index] = symbol;
            return true;
        }
    }

    /**
     * Returns an array of available moves
     * @returns {array}
     */
    getAvailableMoves() {
        const moves = [];
        for (let i = 0; i < this.size; i++) {
            if(this.board[i] === '') {
                moves.push(i);
            }
        }
        return moves;
    }

    /**
     * Display Board in Console
     */
    logBoard() {
        let a = [];
        let b = 0;
        for (let i = 0; i < 3; i++) {
            for (let ii = 0; ii < 3; ii++) {
                if (typeof a[i] === 'undefined') { a[i] = []; }
                a[i][ii] = this.board[b];
                b++;
            }
        }
        console.table(a);
    }
}

export default Board;