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
      self.user_id = window.localStorage.getItem('user_id');
      $log.info(self.user_id);
      self.data = requests.data;
      self.limitDate = moment().subtract(10, 'days');
      self.data = self.data.filter(function(msg) {
        return moment(msg.created).isAfter(self.limitDate);
      });
      setTimeout(function() {$ionicScrollDelegate.scrollBottom(true);}, 500);
      Pusher.subscribe('groupchat.' + $stateParams.id, 'App\\Events\\GroupChatEvent', function(message) {
        $log.info(message);
        self.data.push(message.message);
        $ionicScrollDelegate.scrollBottom(true);
      });
    }

    self.sendGroupMessage = function(message) {
      $ionicLoading.show({template: '<ion-spinner>'});
      $log.info('ID is: ' + $stateParams.id);
      $http.post(API.URL + '/api/v1/group/message', {
        'group_chat_id': $stateParams.id,
        'message': message
      }).then(function(data) {
        $log.info(data);
        self.msgToSend = '';
        $ionicLoading.hide();
      });
    };

    _init();

  }

})();
