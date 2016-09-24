angular.module('eSchedMe.controllers')
.controller('DataCtrl', DataCtrlFunction);

DataCtrlFunction.$inject = [
  '$http',
  '$rootScope',
  '$state',
  '$cookieStore',
  'DataService',
  'LoginService',
  '$ionicModal'
];

function DataCtrlFunction($http, $rootScope, $state, $cookieStore, DataService, LoginService, $ionicModal, $scope) {
  var dataCtrl = this;
  var userId;
  var modalScope = $rootScope.$new(true);


  function getProjectList() {
    DataService.getProjectList(userId)
      .then(function(result){
        dataCtrl.projectList = result.data.data;
      });
  }

  function init() {
    console.log($cookieStore.get('userId'));
    userId = $cookieStore.get('userId');
    DataService.GetUserById(userId)
      .then(function(result) {
        console.log(result.data);
        dataCtrl.user = result.data;
      });
    getProjectList();
  }


  dataCtrl.signout = function() {
    LoginService.signout()
    .then(function () {
        $rootScope.$broadcast('logout');
        $state.go('login');
    });
  };

  dataCtrl.createProject = function(name, description) {
    DataService.createProject(userId, name, description)
      .then(function(result) {
        if(result.status === 200) {
          modalScope.closeModalCreateProject();
          getProjectList();
        }
      });
  };

  dataCtrl.deleteProjectById = function(id) {
    DataService.deleteProjectById(id)
      .then(function(result) {
        console.log(result);
        if(result.status === 200) {
          getProjectList();
        }
      });
  };

  dataCtrl.openModalCreateProject = function() {
    $ionicModal.fromTemplateUrl('templates/modals/create-project.html', {
      scope: modalScope,
      animation: 'fade-in-scale'
    }).then(function(modal) {
      dataCtrl.modal = modal;
      dataCtrl.modal.show();
    });
  };

  dataCtrl.openModalSummaryProject = function() {
    $ionicModal.fromTemplateUrl('templates/modals/project-summary.html', {
      scope: modalScope,
      animation: 'fade-in-scale'
    }).then(function(modal) {
      dataCtrl.modal = modal;
      dataCtrl.modal.show();
    });
  };

  modalScope.closeModalCreateProject = function() {
    dataCtrl.modal.hide();
  };

  modalScope.closeModalSummaryProject = function() {
    dataCtrl.modal.hide();
  };

  init();
  angular.extend(modalScope, dataCtrl);
  modalScope.userId = userId;
}
