"use strict";

// Import Modules
import Board  from './board.js';

/**
 * AI Player for {TicTacToe} utilizing Minimax Algorithm
 *
 * - This class was adapted from Part 3 of an article
 *   titled "Tic-Tac-Toe with Javascript ES2015:
 *   AI Player with Minimax Algorithm" by Ali Alaa.
 * - https://medium.com/@alialaa/tic-tac-toe-with-javascript-es2015-ai-player-with-minimax-algorithm-59f069f46efa
 *
 * @class
 * @property {string} symbol   - x/o
 * @property {number} maxDepth - AI Max Calculation Depth
 * @property {string} nodesMap - Calculation Nodes
 * @author Dean Wagner <info@deanwagner.net>
 */
class Ai {

    // Class Properties
    symbol;
    maxDepth;
    nodesMap;

    /**
     * Constructor
     * @constructor
     * @param {string} symbol   - x/o
     * @param {number} maxDepth - AI Max Calculation Depth
     */
    constructor(symbol, maxDepth = -1) {
        this.symbol   = symbol;
        this.maxDepth = maxDepth;
        this.nodesMap = new Map();
    }

    /**
     * AI Calculate Best Move
     * @param   {Board}    board      - Board Object
     * @param   {boolean}  maximizing - T = Max / F = Min
     * @param   {function} callback   - Callback Function
     * @param   {number}   depth      - AI Calculation Depth
     * @returns {number}              - Index of AI Move
     */
    getBestMove(board, maximizing = true, callback = () => {}, depth = 0) {

        if(depth === 0) {
            this.nodesMap.clear();
        }

        if(board.checkBoard() || depth === this.maxDepth ) {
            switch (true) {
                case (board.checkBoard()['symbol'] === 'x'):
                    return 100 - depth;
                case (board.checkBoard()['symbol'] === 'o'):
                    return -100 + depth;
                default:
                    return 0;
            }
        }

        let best;
        let insert;
        let newMax;

        if (maximizing) {
            best   = -100;
            insert = 'x';
            newMax = false;
        } else {
            best   = 100;
            insert = 'o';
            newMax = true;
        }

        board.getAvailableMoves().forEach(index => {
            let child = new Board(board.board.slice());
            child.insert(insert, index);
            let nodeValue = this.getBestMove(child, newMax, callback, depth + 1);
            best = (maximizing) ? Math.max(best, nodeValue) : Math.min(best, nodeValue);
            if(depth === 0) {
                let moves = this.nodesMap.has(nodeValue) ? this.nodesMap.get(nodeValue) + ',' + index : index;
                this.nodesMap.set(nodeValue, moves);
            }
        });

        if(depth === 0) {
            let ret;
            if(typeof this.nodesMap.get(best) == 'string') {
                let arr = this.nodesMap.get(best).split(',');
                let rand = Math.floor(Math.random() * arr.length);
                ret = arr[rand];
            } else {
                ret = this.nodesMap.get(best);
            }
            callback(ret);
            return ret;
        } else {
            return best;
        }
    }

    /**
     * Select a Random Starting Position
     * @returns {number}
     */
    randomStart() {
        // Preferred Starting Positions
        const moves = [0, 2, 4, 6, 8];

        // Random Pick
        return moves[Math.floor(Math.random() * moves.length)];
    }
}

export default Ai;