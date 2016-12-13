(function() {
  angular.module('eSchedMe')
  .factory('ProjectData', ['$resource','API', function($resource, API) {
    return $resource(API.URL + '/api/v1/activity/:project', {project: '@project'}, {
      get: {
        method: 'GET'
      },
      save: {
        method: 'POST'
      },
      delete: {
        method: 'DELETE'
      },
      update: {
        method: 'PATCH'
      }
    });
  }]);
})();
