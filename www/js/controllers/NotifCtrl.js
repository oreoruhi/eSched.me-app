(function() {
  'use strict';

  var app = angular.module('eSchedMe');
  app.controller('NotifCtrl', function(
    $http,
    $log,
    $ionicLoading,
    DataService,
    API) {

    var self = this;

    _init();

    function _init() {
      $log.warn('Notification Controller Initializing...');
      $http.get(API.URL + '/api/v1/notifications')
        .then(function (resp) {
          $log.info(resp);
          self.notifications = resp.data;
        });
    }

    self.clearNotif = function(){
      $http.delete(API.URL + '/api/v1/notifications')
        .then(function (resp) {
          $log.info(resp);
          _init();
        });
    }

    _init();

  });
})();
