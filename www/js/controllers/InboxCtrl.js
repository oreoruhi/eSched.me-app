(function() {
  "use strict";


  angular.module('eSchedMe')
    .controller('InboxCtrl', controllerFunction);

  controllerFunction.$inject = [
    'API',
    'Pusher',
    '$http',
    '$log'
  ];

  function controllerFunction(API, Pusher, $http, $log) {
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
      $http.get(API.URL + '/api/v1/group/message')
        .then(function (result) {
          $log.info(result);
          self.group_messages = result.data;
        });
    }

    self.delete = function() {

    };

    _init();
  }

})();
