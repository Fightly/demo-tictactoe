(function (module) {
"use strict";

const Game = {
    name: 'Game',
    state: {
        players: [],
        activePlayer: 0,
        state: 'waiting',
        winner: null,
    }
}

const Board = {
    name: 'Board',
    state: {
        board: [
            [null, null, null ],
            [null, null, null ],
            [null, null, null ],
        ],
    }
};

module.exports = {
    Board,
    Game,
};

})(module);
