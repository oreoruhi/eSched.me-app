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
  $ionicModal) {
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

  angular.extend(modalScope, this);
  return project;
};
