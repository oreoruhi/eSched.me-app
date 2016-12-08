(function() {
  angular.module('eSchedMe')
    .factory('ModuleData', ['$resource', 'API', function($resource, API) {
      return $resource(API.URL + '/api/v1/module/:module', {module: '@module'}, {
        update: {
          method: 'PATCH'
        }
      });
    }]);
})();
