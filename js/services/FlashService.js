// ----------------------------------------
// FlashService
// ----------------------------------------
// Usage:
//  1. Inject FlashService into your controller
//  2. Bind to $scope
//      $scope.flash = FlashService;
//        or
//      Use internally as FlashService
//  3. Use in your view or controller
//      $scope.create('Hello!');
//      <a href="" ng-click="flash.create('Hello!')">Greet</a>
// 
// May be created or destroyed via
//  $scope.flash.create(typeOrMessage, [message if type specified])
//  $scope.flash.destroy(type, index)
// 
// Messages are available via
//  $scope.flash.alerts[alertType]

Othello.factory('FlashService',
  ['_',
  function(_) {

    // ----------------------------------------
    // Private
    // ----------------------------------------

    var _reservedWords = [
      'success',
      'notice',
      'info',
      'warn',
      'warning',
      'danger',
      'error'
    ];


    var _resolveType = function(type) {
      return {
        notice: 'info',
        error: 'danger',
        warn: 'warning'
      }[type] || type;
    };


    var _createTypeIfNotExists = function(type) {
      if (_alerts[type] === undefined) {
        _alerts[type] = [];
      }
    };


    var _resolveCreateOptions = function(a, b) {
      if (_.isObject(a)) {
        a.type = a.type || 'info';
        return a;
      }
      var type = a,
          message = b;
      if (!_.contains(_reservedWords, a)) {
        type = 'info';
        message = a;
      }
      return {
        type: type,
        message: message
      };
    };


    var _alerts = {};


    // ----------------------------------------
    // Public
    // ----------------------------------------

    var FlashService = {
      length: 0,
      alerts: _alerts,

      create: function(a, b) {
        var options = _resolveCreateOptions(a, b),
            type = options.type,
            message = options.message;
        type = _resolveType(type);
        _createTypeIfNotExists(type);
        if (!_.find(_alerts[type], function(alert) {
          return alert === message;
        })) {
          _alerts[type].push(message);
          this.length++;
        }
        return this;
      },

      destroy: function(type, id) {
        type = _resolveType(type);
        _alerts[type].splice(id, 1);
        this.length--;
        return this;
      },

      clear: function() {
        _.each(_alerts, function(value, key) {
          _alerts[key] = [];
        });
      }
    };


    return FlashService;

  }]);







