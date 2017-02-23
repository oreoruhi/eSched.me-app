(function() {
  "use strict";


  angular.module('eSchedMe')
    .controller('GroupChatDetailCtrl', controllerFunction);

  controllerFunction.$inject = [
    'API',
    '$stateParams',
    '$http',
    '$log',
    'requests',
    'Pusher',
    '$ionicScrollDelegate',
    '$ionicLoading'
  ];

  function controllerFunction(API, $stateParams, $http, $log, requests, Pusher, $ionicScrollDelegate, $ionicLoading) {
    var self = this;

    function _init() {
      $log.info(requests);
      self.data = requests.data;
    }

    self.sendMessage = function(id, message) {

    };

    _init();

  }

})();
