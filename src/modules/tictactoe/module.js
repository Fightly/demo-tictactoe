(function (module) {
"use strict";

var actions = require('./actions');
var Board = require('./components').Board;
var GameProcessor = require('./processors').GameProcessor;


const TICTACTOE = {
    actions,
    components: [
        Board,
    ],
    processors: [
        GameProcessor,
    ],
};

module.exports = TICTACTOE;

})(module);
