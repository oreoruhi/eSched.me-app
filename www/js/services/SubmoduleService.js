angular.module('eSchedMe')
  .factory('SubmoduleService', factoryFunction);

function  factoryFunction($http) {
  var apiUrl = Backand.getApiUrl();

  return {
    getSubmodules: getSubmodules,
    newSubmodule: newSubmodule,
    getSubmoduleById: getSubmoduleById,
    editSubmodule: editSubmodule
  };


  function getSubmodules(moduleId) {
    return $http ({
      
    });
  }

  function newSubmodule(module_id, title, description, percentage) {
    return $http({
      
    });

  }

  function getSubmoduleById(id) {
    
  }

  function editSubmodule(id, title, description) {
    return $http ({
      
    });
  }
}
