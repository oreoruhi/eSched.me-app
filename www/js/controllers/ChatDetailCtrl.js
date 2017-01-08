(function() {
  "use strict";


  angular.module('eSchedMe')
    .controller('ChatDetailCtrl', controllerFunction);

  controllerFunction.$inject = [
    'API',
    '$stateParams',
    '$http',
    'requests'
  ];

  function controllerFunction(API, $stateParams, $http, requests) {
    var self = this;

    function _init() {
      console.log(requests);
      self.messages = requests.data;
      self.user_id = window.localStorage.getItem('user_id');
    }

    _init();

  }

})();
