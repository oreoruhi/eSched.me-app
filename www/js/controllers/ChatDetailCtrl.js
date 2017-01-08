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
      self.messages = requests.data.data;
      self.user_id = window.localStorage.getItem('user_id');
      // TODO : Give focus to the latest chat pushed
      Pusher.subscribe('message.' + self.user_id, 'App\\Events\\ChatEvent', function(message) {
        // TODO : Figure out if the message is new or not, if new create new parent else, add to parent
        console.log(message);
        var msg = message.message;
        if (msg.sender_id == self.user_id || msg.receiver_id == self.user_id) {
          self.messages.push(message.message);
          $ionicScrollDelegate.scrollBottom(true);
        }
      });
    };

    self.sendMessage = function(id, message) {
      $http({
        methood: 'POST',
        url: API.URL + '/api/v1/user/' + id + '/message',
        data: {
          "message": message
        }
      });
    }

    _init();

  }

})();
