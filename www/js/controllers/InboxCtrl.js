(function() {
  "use strict";


  angular.module('eSchedMe')
    .controller('InboxCtrl', controllerFunction);

  controllerFunction.$inject = [
    'API',
    'Pusher',
    '$http',
  ];

  function controllerFunction(API, Pusher, $http) {
    var self = this;
    self.messages = [];
    function _init() {
      $http.get(API.URL + '/api/v1/me/messages')
        .then(function(result) {
          self.messages = result.data;
          console.log(self.messages);
        });
      self.user = window.localStorage.getItem('user_id');
      console.log(self.user);
      Pusher.subscribe('message.' + self.user, 'App\\Events\\ChatEvent', function(message) {
        // TODO : Figure out if the message is new or not, if new create new parent else, add to parent
        self.messages.push(message);
        console.log(message);
      });
    }

    _init();
  }

})();
