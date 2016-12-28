(function() {
  angular.module('eSchedMe')
  .factory('MeetingData', ['$resource','API', function($resource, API) {
    return $resource(API.URL + '/api/v1/meeting/:meeting', {meeting: '@meeting'}, {
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
