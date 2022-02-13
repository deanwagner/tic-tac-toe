"use strict";

import Board  from './board.js';

class Ai {

    symbol;

    constructor(symbol, max_depth = -1) {
        this.symbol = symbol;
        this.max_depth = max_depth;
        this.nodes_map = new Map();
    }

    getBestMove(board, maximizing = true, callback = () => {}, depth = 0) {

        if(depth === 0) {
            this.nodes_map.clear();
        }

        if(board.checkBoard() || depth === this.max_depth ) {
            switch (true) {
                case (board.checkBoard().symbol === 'x'):
                    return 100 - depth;
                case (board.checkBoard().symbol === 'o'):
                    return -100 + depth;
                default:
                    return 0;
            }
        }

        // Current player is maximizing
        if(maximizing) {

            // Initialize best to the lowest possible value
            let best = -100;

            // Loop through all empty cells
            board.getAvailableMoves().forEach(index => {

                // Initialize a new board with the current state (slice() is
                // used to create a new array and not modify the original)
                let child = new Board(board.board.slice());

                // Create a child node by inserting the maximizing symbol x into the current empty cell
                child.insert('x', index);

                // Recursively calling getBestMove this time with the new
                // board and minimizing turn and incrementing the depth
                let node_value = this.getBestMove(child, false, callback, depth + 1);

                // Updating best value
                best = Math.max(best, node_value);

                // If it's the main function call, not a recursive one,
                // map each heuristic value with its moves indices
                if(depth === 0) {
                    //Comma seperated indices if multiple moves have the same heuristic value
                    let moves = this.nodes_map.has(node_value) ? `${this.nodes_map.get(node_value)},${index}` : index;
                    this.nodes_map.set(node_value, moves);
                }
            });

            // If it's the main call, return the index of the best move
            // or a random index if multiple indices have the same value
            if(depth === 0) {
                // run a callback after calculation and return the index
                let ret = this.mainCall(best);
                callback(ret);
                return ret;
            } else {
                // If not main call (recursive) return the heuristic value for next calculation
                return best;
            }
        }

        if(!maximizing) {

            // Initialize best to the highest possible value
            let best = 100;

            // Loop through all empty cells
            board.getAvailableMoves().forEach(index => {

                // Initialize a new board with the current state (slice() is
                // used to create a new array and not modify the original)
                let child = new Board(board.board.slice());

                // Create a child node by inserting the minimizing symbol o into the current empty cell
                child.insert('o', index);

                // Recursively calling getBestMove this time with the new
                // board and maximizing turn and incrementing the depth
                let node_value = this.getBestMove(child, true, callback, depth + 1);

                // Updating best value
                best = Math.min(best, node_value);

                // If it's the main function call, not a recursive one,
                // map each heuristic value with its moves indices
                if(depth === 0) {
                    // Comma seperated indices if multiple moves have the same heuristic value
                    let moves = this.nodes_map.has(node_value) ? this.nodes_map.get(node_value) + ',' + index : index;
                    this.nodes_map.set(node_value, moves);
                }
            });

            // If it's the main call, return the index of the best move
            // or a random index if multiple indices have the same value
            if(depth === 0) {
                // run a callback after calculation and return the index
                let ret = this.mainCall(best);
                callback(ret);
                return ret;
            } else {
                // If not main call (recursive) return the heuristic value for next calculation
                return best;
            }
        }
    }

    mainCall(best) {
        let ret;
        if(typeof this.nodes_map.get(best) == 'string') {
            let arr = this.nodes_map.get(best).split(',');
            let rand = Math.floor(Math.random() * arr.length);
            ret = arr[rand];
        } else {
            ret = this.nodes_map.get(best);
        }
        return ret;
    }
}

export default Ai;