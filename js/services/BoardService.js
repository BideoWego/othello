// ----------------------------------------
// BoardService
// ----------------------------------------

Othello.factory('BoardService',
  ['_', 'DiskService',
  function(_, DiskService) {

    // ----------------------------------------
    // Private
    // ----------------------------------------

    var WIDTH = 8;
    var HEIGHT = 8;


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
      for (var x = 0; x < WIDTH; x++) {
        var row = [];
        for (var y = 0; y < HEIGHT; y++) {
          var disk = _createDisk(x, y);
          row.push(disk);
        }
        grid.push(row);
      }
      return grid;
    };


    // ----------------------------------------
    // Public
    // ----------------------------------------

    var BoardService = {};


    BoardService.create = function() {
      var board = {
        grid: _createGrid(),
        width: WIDTH,
        height: HEIGHT
      };
      return board;
    };


    return BoardService;

  }]);




