(function (module) {
"use strict";

// const actions = {
//     playOnCell: {
//         check: function (playerId, i, j) {
//             var state = this.getComponentsData('Board')[0];
//             var player = this.getComponentDataForEntity('Player', playerId);
//             return (
//                 state.activePlayer === player.number &&
//                 state.board[i][j] === -1
//             );
//         },
//         execute: function (playerId, i, j) {
//             var state = this.getComponentsData('Board')[0];
//             var game = this.getComponentsData('Game')[0];
//             state.board[i][j] = game.activePlayer;
//             this.actions.core.nextTurn();
//             // state.activePlayer = Math.abs(state.activePlayer - 1);
//         }
//     }
// }

const actions = [
    'playOnCell',
];

module.exports = actions;

})(module);
