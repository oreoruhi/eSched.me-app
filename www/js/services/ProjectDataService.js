(function() {
  angular.module('eSchedMe')
  .factory('ProjectData', ['$resource','API', function($resource, API) {
    return $resource(API.URL + '/api/v1/activity/:project', {project: '@project'}, {
      get: {
        method: 'GET',
        headers: {'Authorization': 'Bearer ' + window.localStorage.getItem('id_token') }
      },
      save: {
        method: 'POST',
        headers: {'Authorization': 'Bearer ' + window.localStorage.getItem('id_token') }
      },
      delete: {
        method: 'DELETE',
        headers: {'Authorization': 'Bearer ' + window.localStorage.getItem('id_token') }
      },
      update: {
        method: 'PATCH',
        headers: {'Authorization': 'Bearer ' + window.localStorage.getItem('id_token') }
      }
    });
  }]);
})();
