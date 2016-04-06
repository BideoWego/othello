// ----------------------------------------
// DiskService
// ----------------------------------------

Othello.factory('DiskService',
  ['_',
  function(_) {

    // ----------------------------------------
    // Private
    // ----------------------------------------
    
    var WHITE = 'white';
    var BLACK = 'black';

    var _isWhite = function(disk) {
      return function() {
        return disk.color === WHITE;
      };
    };

    var _isBlack = function(disk) {
      return function() {
        return disk.color === BLACK;
      };
    };

    var resolveCreateOptions = function(a, b, c) {
      if (_.isObject(a)) {
        return a;
      }

      return {
        x: a,
        y: b,
        color: c
      };
    };

    var _flip = function(disk) {
      return function() {
        disk = (disk.color === WHITE) ? BLACK : WHITE;
      };
    };

    // ----------------------------------------
    // Public
    // ----------------------------------------

    var DiskService = {
      WHITE: WHITE,
      BLACK: BLACK
    };


    DiskService.create = function(a, b, c) {
      var options = resolveCreateOptions(a, b, c);
      return {
        color: options.color,
        x: options.x,
        y: options.y,
        flip: _flip(this),
        isWhite: _isWhite(this),
        isBlack: _isBlack(this)
      };
    };

    return DiskService;

  }]);




