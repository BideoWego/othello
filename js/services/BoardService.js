// ----------------------------------------
// BoardService
// ----------------------------------------

Othello.factory('BoardService',
  ['_', 'DiskService',
  function(_, DiskService) {

    var BoardService = {};

    BoardService.WIDTH = 8;
    BoardService.HEIGHT = 8;

    var _startPositions = {
      "3": {
        "3": DiskService.WHITE,
        "4": DiskService.BLACK
      },
      "4": {
        "3": DiskService.BLACK,
        "4": DiskService.WHITE
      }
    };

    var _createDisk = function(x, y) {
      var color;
      if (_startPositions[y] && _startPositions[y][x]) {
        color = _startPositions[y][x];
      }
      return DiskService.create(x, y, color);
    };

    var _createGrid = function() {
      var grid = [];
      for (var x = 0; x < BoardService.WIDTH; x++) {
        var row = [];
        for (var y = 0; y < BoardService.HEIGHT; y++) {
          var disk = _createDisk(x, y);
          row.push(disk);
        }
        grid.push(row);
      }
      return grid;
    };

    BoardService.create = function() {
      return {
        grid: _createGrid(),
        width: this.WIDTH,
        height: this.HEIGHT
      };
    };

    return BoardService;

  }]);




