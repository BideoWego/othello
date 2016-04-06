// ----------------------------------------
// GamesCtrl
// ----------------------------------------

Othello.controller('GamesCtrl',
  ['$scope', 'GameService', 'FlashService',
  function($scope, GameService, FlashService) {

    $scope.flash = FlashService;
    $scope.game = GameService.create();
    $scope.game.players.white.move(5, 3);

  }]);




