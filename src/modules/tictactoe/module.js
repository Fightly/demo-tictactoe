(function (module) {
"use strict";

var actions = require('./actions');
var Board = require('./components').Board;
var Game = require('./components').Game;


const TICTACTOE = {
    actions,
    components: [
        Board,
        Game,
    ],
    processors: [
    ],
};

module.exports = TICTACTOE;

})(module);
