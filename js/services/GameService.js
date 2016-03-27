// ----------------------------------------
// GameService
// ----------------------------------------

Othello.factory('GameService',
  ['_', 'BoardService', 'PlayerService',
  function(_, BoardService, PlayerService) {

    var _board = BoardService.create();
    var _squares = _.flatten(_board.grid);
    var _players = PlayerService.createPlayers({ board: _board });


    return {
      game: {
        squares: _squares,
        players: _players
      }
    };

  }]);




