angular.module('eSchedMe')
  .factory('SubmoduleService', factoryFunction);

function  factoryFunction($http, Backand) {
  var apiUrl = Backand.getApiUrl();

  return {
    getSubmodules: getSubmodules,
    newSubmodule: newSubmodule,
    getSubmoduleById: getSubmoduleById,
    editSubmodule: editSubmodule
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

  function newSubmodule(module_id, title, description, percentage) {
    return $http({
      method: 'POST',
      url: apiUrl + '/1/objects/sub_modules',
      data: {
        module_id: module_id,
        title: title,
        description: description,
        percentage: percentage,
        status: 'ongoing'
      }
    });

  }

  function getSubmoduleById(id) {
    return $http.get('https://api.backand.com/1/objects/sub_modules/' + id);
  }

  function editSubmodule(id, title, description) {
    return $http ({
      method: 'PUT',
      url: Backand.getApiUrl() + '/1/objects/sub_modules/' + id,
      data: {
        title: title,
        description: description,
      }
    });
  }
}
