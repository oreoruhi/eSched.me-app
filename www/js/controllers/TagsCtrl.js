(function() {
  'use strict';

  var app = angular.module('eSchedMe');
  app.controller('TagsCtrl', function($http, $log, API) {
    var self = this;

    _init();

    function _init() {
      $log.warn('Tags Controller Initializing...');
      $http.get(API.URL + '/api/v1/me/pending_activity_tags')
        .then(function (resp) {
          $log.debug(resp);
          self.pendingTags = resp.data;
        });
    }

    self.acceptTag = function (activityId) {
      $log.warn('Accepting Tag in Project ID: ' + activityId);
      $http.post(API.URL + '/api/v1/me/pending_activity_tags/approve/' + activityId)
        .then(function () {
          _init();
        });
    };

  });
})();
