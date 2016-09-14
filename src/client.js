import fightly from 'fightly-client';


// !FIXME: remove `.default`
let F = fightly.default();

function showStage(stage) {
    $('section').hide();
    $('#' + stage).show();
}
showStage('loading');

F.on('ready', () => {
    showStage('start');

    F.on('gameJoined', () => {
        console.log(F.identity);
        showStage('waiting');
    });

    F.on('gameStarted', () => {
        showStage('game');
    });

    F.on('gameEnded', () => {
        showStage('start');
    });
});

$('#start button').click((e) => {
    e.preventDefault();

    console.log(F.games);

    if (!F.games.length) {
        // No games, create one.
        console.log('Asked for new game');
        F.actions.createGame();
    }
    else {
        console.log('Joining existing game');
        F.actions.joinGame(F.games[0].id);
    }
});

$('#game').on('click', '.cell', (e) => {
    var id = $(this).attr('id').split('-');
    F.actions.playOnCell(id[1], id[2]);
});

var RenderingProcessor = function (manager) {
    this.manager = manager;
};

RenderingProcessor.prototype.update = function (dt) {
    let state = this.manager.getComponentsData('Board')[0];
    let game = this.manager.getComponentsData('Game')[0];

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
};

F.manager.addProcessor(new RenderingProcessor(F.manager));

function animate() {
    requestAnimationFrame(animate);
    F.manager.update();
}
// animate();
