// ----------------------------------------
// PlayerService
// ----------------------------------------

Othello.factory('PlayerService',
  ['_', 'DiskService',
  function(_, DiskService) {

    // ----------------------------------------
    // Private
    // ----------------------------------------

    var _resolveCreateOptions = function(a, b) {
      if (_.isObject(a)) {
        return a;
      }

      return {
        color: a,
        game: b
      };
    };


    var _move = function(player) {
      return function(x, y) {
        var disk = player.game.board.grid[x][y];
        disk.color = player.color;
        player.game.toggleCurrentPlayer();
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
        score: 0
      };
      player.move = _move(player);
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




