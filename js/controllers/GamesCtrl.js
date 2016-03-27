// ----------------------------------------
// GamesCtrl
// ----------------------------------------

Othello.controller('GamesCtrl',
  ['$scope', 'GameService',
  function($scope, GameService) {

    $scope.game = GameService.create();
    $scope.game.players.white.move(5, 3);

  }]);




