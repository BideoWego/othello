// ----------------------------------------
// PlayerService
// ----------------------------------------

Othello.factory('PlayerService',
  ['_', 'DiskService',
  function(_, DiskService) {

    var PlayerService = {};

    var _resolveCreateOptions = function(a, b) {
      if (_.isObject(a)) {
        return a;
      }

      return {
        color: a,
        board: b
      }
    };


    var _move = function(player) {
      return function(x, y) {
        var disk = player.board.grid[x][y];
        disk.value = player.color;
      };
    };


    PlayerService.create = function(a, b) {
      var options = _resolveCreateOptions(a, b);
      var player = {
        color: options.color,
        board: options.board,
        score: 0
      };
      player.move = _move(player);
      return player;
    };


    PlayerService.createWhite = function(options) {
      return this.create(DiskService.WHITE, options.board);
    };


    PlayerService.createBlack = function(options) {
      return this.create(DiskService.BLACK, options.board);
    };


    PlayerService.createPlayers = function(options) {
      return {
        white: this.createWhite(options),
        black: this.createBlack(options)
      };
    };

    return PlayerService;

  }]);




