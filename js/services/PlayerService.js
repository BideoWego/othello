// ----------------------------------------
// PlayerService
// ----------------------------------------

Othello.factory('PlayerService',
  ['_', 'DiskService',
  function(_, DiskService) {

    // ----------------------------------------
    // Private
    // ----------------------------------------

    var _moves = [];

    var _resolveCreateOptions = function(a, b) {
      if (_.isObject(a)) {
        return a;
      }

      return {
        color: a,
        game: b
      };
    };


    var _hasMoves = function(player) {
      return function() {
        var moves = player.game.board.possibleMovesFor(player.color);
        _moves.splice(0);
        _.each(moves, function(move) {
          _moves.push(move);
        });
        return !!_moves.length;
      };
    };


    var _move = function(player) {
      return function(x, y) {
        player.game.placeDiskAt(x, y);
      };
    };

    // ----------------------------------------
    // Public
    // ----------------------------------------

    var PlayerService = {};


    PlayerService.create = function(a, b) {
      var options = _resolveCreateOptions(a, b);
      var player = {
        color: options.color,
        game: options.game,
        score: 2,
        moves: _moves,
        isComputer: false
      };
      player.move = _move(player);
      player.hasMoves = _hasMoves(player);
      return player;
    };


    PlayerService.createWhite = function(options) {
      return this.create(DiskService.WHITE, options.game);
    };


    PlayerService.createBlack = function(options) {
      return this.create(DiskService.BLACK, options.game);
    };


    PlayerService.createPlayers = function(options) {
      return {
        white: this.createWhite(options),
        black: this.createBlack(options)
      };
    };

    return PlayerService;

  }]);




