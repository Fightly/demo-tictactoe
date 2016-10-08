import fightly from 'fightly-client';

import tictactoe from './modules/tictactoe/module';


const MODULES = {
    tictactoe,
};


// FIXME: remove `.default`
let F = fightly(MODULES);

function showStage(stage) {
    $('section').hide();
    $('#' + stage).show();
}
showStage('loading');

F.on('ready', () => {
    animate();
    showStage('start');

    F.on('gameJoined', () => {
        console.log(F.identity);
        showStage('waiting');
    });
});

$('button.play').click((e) => {
    e.preventDefault();

    console.log(F.games);

    if (!F.games.length) {
        // No games, create one.
        console.log('Asked for new game');
        F.actions.core.createGame();
    }
    else {
        console.log('Joining existing game');
        F.actions.core.joinGame(F.games[0].id);
    }
});

$('#game').on('click', '.cell', (e) => {
    var id = $(this).attr('id').split('-');
    F.actions.tictactoe.playOnCell(id[1], id[2]);
});

class RenderingProcessor {
    constructor(manager) {
        this.manager = manager;
    }

    update(dt) {
        let games = this.manager.getComponentsData('Game');

        // Verify there is a game going on.
        if (!games.length) {
            return;
        }

        let game = games[0];

        // If that game is finished, show the game over screen.
        if (game.state === 'finished') {
            let result = 'lose';
            if (game.winner === this.identity.playerNumber) {
                result = 'win';
            }
            else if (game.winner === null) {
                result = 'draw';
            }

            $('#finished .result').text($('#finished .result').data(result));
            showStage('finished');
        }
        // Otherwise if not playing (i.e. waiting), do nothing.
        else if (games[0].state !== 'playing') {
            return;
        }

        showStage('game');

        let state = this.manager.getComponentsData('Board')[0];

        // Update cells.
        for (let i = 0; i < 3; i++) {
            for (let j = 0; j < 3; j++) {
                let cell = $('#cell-' + i + '-' + j);
                let content = '';
                if (state.board[i][j] === 0) {
                    content = 'O';
                }
                else if (state.board[i][j] === 1) {
                    content = 'X';
                }
                cell.innerHTML = content;
            }
        }

        // Update player status.
        if (game.activePlayer === this.identity.playerNumber) {
            $('#player-status').text('Your turn');
        }
        else {
            $('#player-status').text('Opponent\'s turn');
        }
    }
}

F.manager.addProcessor(new RenderingProcessor(F.manager));

function animate() {
    requestAnimationFrame(animate);
    F.manager.update();
}
