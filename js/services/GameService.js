// ----------------------------------------
// GameService
// ----------------------------------------

Othello.factory('GameService',
  ['_', 'BoardService', 'PlayerService', 'DiskService',
  function(_, BoardService, PlayerService, DiskService) {

    // ----------------------------------------
    // Private
    // ----------------------------------------

    var _toggleCurrentPlayer = function(game) {
      return function() {
        game.currentPlayer = (game.currentPlayer.color === DiskService.WHITE) ?
          game.players.black :
          game.players.white
        ;
      };
    };


    // ----------------------------------------
    // Public
    // ----------------------------------------

    var GameService = {};


    GameService.create = function() {
      var game = {
        board: BoardService.create()
      };
      game.squares = _.flatten(game.board.grid);
      game.players = PlayerService.createPlayers({ game: game });
      game.currentPlayer = game.players.black;
      game.toggleCurrentPlayer = _toggleCurrentPlayer(game);
      return game;
    };


    return GameService;

  }]);




