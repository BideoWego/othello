// ----------------------------------------
// GameService
// ----------------------------------------

Othello.factory('GameService',
  ['_', 'BoardService', 'PlayerService', 'DiskService',
  function(_, BoardService, PlayerService, DiskService) {

    // ----------------------------------------
    // Private
    // ----------------------------------------

    var _flippables = [];

    var _toggleCurrentPlayer = function(game) {
      return function() {
        game.isTurnBlack = !game.isTurnBlack;
        game.isTurnWhite = !game.isTurnWhite;
        game.currentPlayer = (game.currentPlayer.color === DiskService.WHITE) ?
          game.players.black :
          game.players.white
        ;
      };
    };


    var _setScores = function(game) {
      return function() {
        var scores = {};
        scores[game.players.white.color] = game.players.white;
        scores[game.players.black.color] = game.players.black;
        game.players.white.score = game.players.black.score = 0;
        _.each(game.squares, function(square) {
          if (square.color) {
            scores[square.color].score += 1;
          }
        });
      };
    };


    var _placeDiskAt = function(game) {
      return function(x, y) {
        var disk = game.board.grid[x][y];
        disk.color = game.currentPlayer.color;
        _.each(_flippables, function(disk) {
          disk.color = game.currentPlayer.color;
        });
        game.setScores();
      };
    };


    var _isValidMove = function(game) {
      return function(x, y) {
        var color = game.currentPlayer.color;
        _flippables = game.board.getFlippableDisksFor(color, x, y);
        return !!_flippables.length;
      };
    };


    var _isTie = function(game) {
      return function() {
        return game.players.white.score === game.players.black.score;
      };
    };


    var _getWinner = function(game) {
      return function() {
        return (game.players.white.score > game.players.black.score) ?
          game.players.white :
          game.players.black
        ;
      };
    };


    // ----------------------------------------
    // Public
    // ----------------------------------------

    var GameService = {};


    GameService.create = function(options) {
      options = options || {};
      var game = {
        board: BoardService.create()
      };
      game.numPlayers = options.numPlayers || 1;
      game.squares = _.flatten(game.board.grid);
      game.players = PlayerService.createPlayers({ game: game });
      game.currentPlayer = game.players.black;
      if (game.numPlayers === 1) {
        game.players.white.isComputer = true;
      }
      game.isTurnBlack = true;
      game.isTurnWhite = false;
      game.toggleCurrentPlayer = _toggleCurrentPlayer(game);
      game.placeDiskAt = _placeDiskAt(game);
      game.isValidMove = _isValidMove(game);
      game.setScores = _setScores(game);
      game.getWinner = _getWinner(game);
      game.isTie = _isTie(game);
      return game;
    };


    return GameService;

  }]);




