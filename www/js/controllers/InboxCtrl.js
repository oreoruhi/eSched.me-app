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
          self.messages = result.data.data;
          console.log(self.messages);
        });
      self.user = window.localStorage.getItem('user_id');
      console.log(self.user);
    }

    self.delete = function() {
      
    }

    _init();
  }

})();
