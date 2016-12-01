angular.module('eSchedMe')
.factory('ProjectService', [
    '$http',
    '$state',
    '$rootScope',
    '$ionicModal',
    ProjectService
  ]);



function ProjectService(
  $http, 
  $state,
  $rootScope,
  $ionicModal
  ) {
  var project = {};
  var modalScope = $rootScope.$new(true);
  project.setData = function(project) {
    project.data = project;
  }

  project.openProjectModules = function(project) {
    console.log(project);
    
  }

  modalScope.closeModal = function() {
    dataCtrl.modal.hide();
  };

  project.addTag = function(project_id, user_id) {
    return $http ({
      
    });
  }

  project.removeTag = function(tag_id) {
    return $http ({
      
    });
  }

  angular.extend(modalScope, this);
  return project;
};
