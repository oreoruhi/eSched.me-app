angular.module('eSchedMe')
.factory('ProjectService', [
    '$http',
    '$state',
    '$rootScope',
    '$ionicModal',
    'Backand',
    ProjectService
  ]);



function ProjectService(
  $http, 
  $state,
  $rootScope,
  $ionicModal,
  Backand) {
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
      method: 'POST',
      url: Backand.getApiUrl() + '/1/objects/activity_tags?returnObject=true',
      data: {
        activity_id: project_id,
        friend_id: user_id
      }
    });
  }

  project.removeTag = function(tag_id) {
    return $http ({
      method: 'DELETE',
      url: Backand.getApiUrl() + '/1/objects/activity_tags/' + tag_id
    });
  }

  angular.extend(modalScope, this);
  return project;
};
