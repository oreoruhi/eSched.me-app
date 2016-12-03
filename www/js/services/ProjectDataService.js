(function() {
  angular.module('eSchedMe')
  .factory('ProjectData', ['$resource', function($resource) {
    return $resource('http://192.168.0.10:3000/api/v1/activity/:project', {project: '@project'}, {
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
