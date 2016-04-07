// ----------------------------------------
// GamesCtrl
// ----------------------------------------

Othello.controller('GamesCtrl',
  ['_', '$scope', '$timeout', 'GameService', 'FlashService',
  function(_, $scope, $timeout, GameService, FlashService) {

    var _ff = function() {
      while($scope.game.currentPlayer.hasMoves()) {
        var moves = $scope.game.currentPlayer.moves;
        moves = _.shuffle(moves);
        var move = _.first(moves);
        _makeMove(move.x, move.y);
      }
    };


    var _moveComputer = function() {
      $scope.flash.create('Thinking...');
      $timeout(function() {
        var moves = $scope.game.currentPlayer.moves;
        moves = _.shuffle(moves);
        var move = _.last(moves);
        console.log(moves);
        _makeMove(move.x, move.y);
      }, 1000);
    };


    var _makeMove = function(x, y) {
      $scope.flash.clear();
      if ($scope.game.isValidMove(x, y)) {
        $scope.game.currentPlayer.move(x, y);
      } else {
        $scope.flash.create('error', 'Invalid Move!');
      }
      _checkCurrentPlayerHasMoves();
    };


    var _checkCurrentPlayerHasMoves = function() {
      if (!$scope.game.currentPlayer.hasMoves()) {
        var color = $scope.game.currentPlayer.color;
        $scope.flash.create('No moves available for player: ' + color);
        $scope.game.toggleCurrentPlayer();
        _checkGameOver();
      } else if ($scope.game.currentPlayer.isComputer) {
        _moveComputer();
      }
    };


    var _checkGameOver = function() {
      if (!$scope.game.currentPlayer.hasMoves()) {
        $scope.playing = false;
        $scope.flash.clear();
        $scope.flash.create('Game Over!');
        var message = ($scope.game.isTie()) ?
          'Tie Game!' :
          'The winner is: ' + $scope.game.getWinner().color
        ;
        $scope.flash.create('success', message);
      }
    };


    $scope.flash = FlashService;
    $scope.move = function(x, y) {
      if (!$scope.game.currentPlayer.isComputer) {
        _makeMove(x, y);
      }
    };
    $scope.play = function(numPlayers) {
      $scope.flash.clear();
      $scope.playing = true;
      $scope.game = GameService.create({ numPlayers: numPlayers });
      // _ff();
    };


  }]);




