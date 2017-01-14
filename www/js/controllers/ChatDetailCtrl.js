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
    '$ionicScrollDelegate',
    '$ionicLoading'
  ];

  function controllerFunction(API, $stateParams, $http, requests, Pusher, $ionicScrollDelegate, $ionicLoading) {
    var self = this;

    function _init() {
      console.log(requests);
      self.messages = requests.data.data;
      self.user_id = window.localStorage.getItem('user_id');
      self.sender_id = self.messages[0].sender_id != self.user_id ? self.messages[0].sender_id : self.user_id;
      self.receiver_id = self.messages[0].receiver_id != self.user_id ? self.messages[0].receiver_id : self.messages[0].sender_id;
      setTimeout(function() {$ionicScrollDelegate.scrollBottom(true);}, 500);
      Pusher.subscribe('message.' + self.user_id, 'App\\Events\\ChatEvent', function(message) {
        console.log(message);
        var msg = message.message;
        if (msg.sender_id == self.user_id || msg.receiver_id == self.user_id) {
          self.messages.push(message.message);
          $ionicScrollDelegate.scrollBottom(true);
        }
      });
    };

    self.sendMessage = function(id, message) {
      $ionicLoading.show({template: '<ion-spinner>'});
      $ionicScrollDelegate.scrollBottom(true);
      console.log("id: " + id);
      console.log("msg: " + message);
      self.chatMessage = ""
      $http({
        method: 'POST',
        url: API.URL + '/api/v1/user/' + id + '/message',
        data: {
          "message": message
        }
      }).then(function(result) {
        console.log(result);
        $ionicLoading.hide();
        if(result.status == 200) {
          self.messages.push(result.data);
          $ionicScrollDelegate.scrollBottom(true);
        }
      });
    }

    _init();

  }

})();
