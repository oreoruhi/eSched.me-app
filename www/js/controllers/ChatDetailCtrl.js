(function() {
  "use strict";


  angular.module('eSchedMe')
    .controller('ChatDetailCtrl', controllerFunction);

  controllerFunction.$inject = [
    'API',
    '$stateParams',
    '$http',
    'requests',
    'Pusher',
    '$ionicScrollDelegate'
  ];

  function controllerFunction(API, $stateParams, $http, requests, Pusher, $ionicScrollDelegate) {
    var self = this;

    function _init() {
      console.log(requests);
      self.messages = requests.data;
      self.user_id = window.localStorage.getItem('user_id');
      // TODO : Give focus to the latest chat pushed
      Pusher.subscribe('message.' + self.user_id, 'App\\Events\\ChatEvent', function(message) {
        // TODO : Figure out if the message is new or not, if new create new parent else, add to parent
        console.log(message);
        self.messages.push(message.message);
        $ionicScrollDelegate.scrollBottom(true);
      });
    }

    _init();

  }

})();
