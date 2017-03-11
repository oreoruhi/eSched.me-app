(function() {
  'use strict';

  var app = angular.module('eSchedMe');
  app.controller('TagsCtrl', function(
    $http,
    $log,
    $ionicLoading,
    DataService,
    API) {

    var self = this;

    _init();

    function _init() {
      $log.warn('Tags Controller Initializing...');
      $http.get(API.URL + '/api/v1/me/pending_activity_tags')
        .then(function (resp) {
          $log.info(resp);
          self.pendingTags = resp.data;
        });
        self.me = JSON.parse(window.localStorage.getItem('user'));
        $log.debug(self.me);
    }

    self.acceptTag = function (activityId) {
      $log.warn('Accepting Tag in Project ID: ' + activityId);
      $ionicLoading.show({template: '<ion-spinner>'});
      $http.post(API.URL + '/api/v1/me/pending_activity_tags/approve/' + activityId)
        .then(function () {
          // DataService.GetUserById()
          //   .then(function(result) {
          //     self.user = result.data.data;
          //     window.localStorage.setItem('user_id', self.user.id);
          //     window.localStorage.setItem('user', JSON.stringify(self.user));
          //     $ionicLoading.hide();
          //   });
          $ionicLoading.hide();
          _init();
        });
    };

    self.untagMe = function(activityId) {
      $log.warn("Untagging me on Project ID: " + activityId);
      $log.warn("My user id is: " + self.me.id);
      $ionicLoading.show({template: '<ion-spinner>'});
      $http.post(API.URL + '/api/v1/me/pending_activity_tags/decline/' + activityId)
      .then(function(result) {
        $log.info(result);
        $ionicLoading.hide();
        _init();
      });
    }

  });
})();
