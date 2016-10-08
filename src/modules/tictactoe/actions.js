(function (module) {
"use strict";

const actions = {
    playOnCell: {
        predicate: function (i, j) {
            var game = this.manager.getComponentsData('Game')[0];
            var state = this.manager.getComponentsData('Board')[0];
            var player = this.manager.getComponentDataForEntity('Player', this.playerId);
            return (
                game.activePlayer === player.number &&
                state.board[i][j] === null
            );
        },
        action: function (i, j) {
            var game = this.manager.getComponentsData('Game')[0];
            var state = this.manager.getComponentsData('Board')[0];
            var player = this.manager.getComponentDataForEntity('Player', this.playerId);

            // Update board.
            state.board[i][j] = player.number;

            // Verify if the board is finished.
            const combinations = [
                [[0, 0], [0, 1], [0, 2]],
                [[1, 0], [1, 1], [1, 2]],
                [[2, 0], [2, 1], [2, 2]],
                [[0, 0], [1, 0], [2, 0]],
                [[0, 1], [1, 1], [2, 1]],
                [[0, 2], [1, 2], [2, 2]],
                [[0, 0], [1, 1], [2, 2]],
                [[0, 2], [1, 1], [2, 0]],
            ];
            let winning = false;
            combinations.forEach(c => {
                if (
                    state.board[c[0][0]][c[0][1]] === player.number &&
                    state.board[c[1][0]][c[1][1]] === player.number &&
                    state.board[c[2][0]][c[2][1]] === player.number
                ) {
                    winning = true;
                }
            });

            let unplayedCount = 0;
            state.board.forEach(line => {
                line.forEach(val => {
                    if (val === null) {
                        unplayedCount++;
                    }
                });
            });

            if (winning) {
                // We have a winner!
                game.winner = player.number;
                game.state = 'finished';
            }
            // Else count the number of played cells.
            else if (unplayedCount === 0) {
                // It's a draw!
                game.winner = null;
                game.state = 'finished';
            }
            else {
                // Go to next turn.
                game.activePlayer = Math.abs(game.activePlayer - 1);
            }
        },
    }
};

module.exports = actions;

})(module);
