(function() {
  angular.module('eSchedMe')
    .factory('PersonalTaskData', ['$resource', 'API', function($resource, API) {
      return $resource(API.URL + '/api/v1/personaltask/:task', {task: '@task'});
    }]);
})();
