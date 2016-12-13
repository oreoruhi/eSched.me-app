angular.module('eSchedMe')
  .factory('SubmoduleService', factoryFunction);

function  factoryFunction($resource, API) {
  return $resource(API.URL + '/api/v1/submodule/:submodule', {submodule: '@submodule'}, {
    update: {
      method: 'PATCH'
    }
  });
}
