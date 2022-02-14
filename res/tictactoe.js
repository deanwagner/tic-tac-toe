"use strict";

import Board  from './board.js';
import User   from './user.js';
import Ai     from './ai.js';

class TicTacToe {

    // Class Properties
    user;
    ai;
    board;
    size = 9;
    locked = true;

    // SVG Templates
    x = '<svg viewBox="0 0 512 512"><path d="M307.8316,255.7281,501.22,62.5451a36.631,36.631,0,0,0-51.8315-51.7765L256,204.3867,62.6117,10.7687A36.631,36.631,0,1,0,10.78,62.5452L204.1685,255.7281,10.78,449.3461a36.4751,36.4751,0,0,0,0,51.7765A37.103,37.103,0,0,0,36.4781,512a35.3033,35.3033,0,0,0,25.698-10.8774L255.5644,307.94l193.3884,193.183A37.1032,37.1032,0,0,0,474.6507,512a35.3031,35.3031,0,0,0,25.698-10.8774,36.4751,36.4751,0,0,0,0-51.7765Z"/></svg>';
    o = '<svg viewBox="0 0 512 512"><path d="M256,0C114.8371,0,0,114.8371,0,256S114.8371,512,256,512,512,397.1629,512,256,397.163,0,256,0Zm0,438.8565c-100.8288,0-182.8565-82.032-182.8565-182.8565S155.1712,73.1435,256,73.1435,438.8566,155.1756,438.8566,256,356.8288,438.8565,256,438.8565Z"/></svg>';

    constructor() {
        this.main  = document.getElementsByTagName('main')[0];
        this.buildGrid();
        this.board = new Board();

        document.querySelectorAll('#modal_start a').forEach(a => {
            a.addEventListener('click', this.newGame.bind(this), {once:true});
        });

        document.getElementById('play_again').addEventListener('click', (e) => {
            location.reload();
        });
    }

    userGo() {
        this.unlock();
    }

    userMove(e) {
        if (!this.locked) {
            this.lock();

            const index = parseInt(e.target.id.replace('box_', ''));
            this.board.insert(this.user.symbol, index);

            e.target.innerHTML = this.mark(this.user.symbol);
            e.target.classList.add('played');

            const result = this.board.checkBoard();

            if (result) {
                this.gameOver(result);
            } else {
                this.aiMove();
            }

            this.board.plays++;
        }
    }

    aiMove() {
        const move = this.ai.getBestMove(this.board, (this.ai.symbol === 'x'));

        //TODO this is ugly

        const sleep = (ms) => {
            return new Promise(resolve => setTimeout(resolve, ms));
        }

        (async () => {
            await sleep(500);
            this.board.insert(this.ai.symbol, move);

            const div = document.getElementById('box_' + move.toString());
            div.innerHTML = this.mark(this.ai.symbol);
            div.classList.add('played');

            const result = this.board.checkBoard();

            if (result) {
                this.gameOver(result);
            } else {
                this.userGo();
            }
        })();

        //^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^//

        this.board.plays++;
    }

    newGame(e) {
        e.preventDefault();

        const depth = parseInt(document.getElementById('ai_depth').value);

        if (e.currentTarget.id === 'select_x') {
            this.user = new User('x');
            this.ai   = new Ai('o', depth);
            this.userGo();
        } else {
            this.user = new User('o');
            this.ai   = new Ai('x', depth);
            this.aiMove();
        }

        this.closeModal('modal_start');
    }

    gameOver(result) {
        if (result.symbol === 't') {
            // Handle Tie
            this.user.tie();
        } else {

            let cls;
            let sub;
            if (result.symbol === this.user.symbol) {
                this.user.win();
                cls = 'win';
                sub = 'You Won';
            } else {
                this.user.lose();
                cls = 'loss';
                sub = 'You Lost';
            }

            document.querySelector('#modal_end h4').innerText = sub;
            document.getElementById('user_wins').innerText = this.user.getWins();
            document.getElementById('user_loss').innerText = this.user.getLoss();
            document.getElementById('user_ties').innerText = this.user.getTies();

            const divs = this.main.getElementsByTagName('div');
            for (let i = 0; i < divs.length; i++) {
                const ids = divs[i].id.replace('box_', '');
                if (result.streak.includes(ids)) {
                    divs[i].classList.add(cls);
                } else {
                    divs[i].classList.add('hide');
                }
            }
        }


        //TODO this is ugly

        const sleep = (ms) => {
            return new Promise(resolve => setTimeout(resolve, ms));
        }

        (async () => {
            await sleep(500);
            this.openModal('modal_end');
        })();

        //^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^//

    }

    buildGrid() {
        for (let i = 0; i < this.size; i++) {
            const div = document.createElement('div');
            div.id = 'box_' + i;
            div.addEventListener('click', this.userMove.bind(this), {once:true});
            this.main.appendChild(div);
        }
    }

    lock() {
        this.locked = true;
    }

    unlock() {
        this.locked = false;
    }

    mark(symbol) {
        return (symbol === 'x') ? this.x : this.o;
    }

    /**
     * Open Modal
     * @param {string} id - Modal ID
     */
    openModal(id) {
        const mask  = document.getElementById('modal');
        const modal = document.getElementById(id);
        modal.style.display = 'block';
        mask.style.display  = 'flex';
        mask.style.opacity  = '1';
    }

    /**
     * Close Modal
     * @param {string} id - Modal ID
     */
    closeModal(id) {
        const mask  = document.getElementById('modal');
        const modal = document.getElementById(id);
        mask.style.opacity  = '0';
        mask.style.display  = 'none';
        modal.style.display = 'none';
    }
}

export default TicTacToe;