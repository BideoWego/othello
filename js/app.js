// ----------------------------------------
// Othello
// ----------------------------------------


var Othello = angular.module('Othello', []);


// Dependencies
// ----------------------------------------

Othello.factory('_',
  ['$window', function($window) {
    return $window._;
  }]);


// Filters
// ----------------------------------------

Othello.filter('isEmpty',
  ['_',
  function (_) {
    return function (arg) {
      if (_.isObject(arg)) {
        return _.keys(arg).length === 0;
      } else if (_.isArray(arg) || _.isString(arg)) {
        return arg.length === 0;
      } else {
        throw new TypeError("Type " + (typeof arg) + " is not a valid value for filter 'isEmpty'");
      }
    };
  }]);


Othello.run(function($rootScope, FlashService) {
  $rootScope.times = function(n) {
    var a = [];
    var i = 0;
    while( a.push(i++) < n) { }
    return a;
  };

  FlashService.init();
});

