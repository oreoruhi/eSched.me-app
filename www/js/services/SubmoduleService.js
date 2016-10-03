angular.module('eSchedMe')
  .factory('SubmoduleService', factoryFunction);

function  factoryFunction($http, Backand) {
  var apiUrl = Backand.getApiUrl();

  return {
    getSubmodules: getSubmodules
  };


  function getSubmodules(moduleId) {
    return $http ({
      method: 'GET',
      url: Backand.getApiUrl() + '/1/objects/sub_modules',
      params: {
        pageSize: 20,
        pageNumber: 1,
        filter: [
          {
          fieldName: 'module_id',
          operator: 'equals',
          value: moduleId
          }
        ],
        sort: ''
      }
    });

  }
}
