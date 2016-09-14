// A demo Tic-Tac-Toe game using the Fightly game engine.

var express = require('express');
var fightly = require('fightly');
var path = require('path');

const MODULES_DIR = path.join(__dirname, 'src', 'modules');


var F = fightly();
F.setModulesDir(MODULES_DIR);

// Serve an index.html file.
F.web.get('/', (req, res) => {
    res.sendFile(__dirname + '/public/index.html');
});

// Serve client files.
F.web.use('/static', express.static('public'));

// Load modules.
F.loadModule('tictactoe');
