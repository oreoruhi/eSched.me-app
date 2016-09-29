angular.module('eSchedMe.controllers')
.controller('DataCtrl', DataCtrlFunction);

DataCtrlFunction.$inject = [
  '$http',
  '$rootScope',
  '$state',
  '$cookieStore',
  'DataService',
  'LoginService',
  'ProjectService',
  '$ionicModal',
  '$ionicHistory',
];

function DataCtrlFunction($http, $rootScope, $state, $cookieStore, DataService, LoginService, ProjectService, $ionicModal, $ionicHistory) {
  var dataCtrl = this;
  var userId;
  var modalScope = $rootScope.$new(true);


  function getProjectList() {
    DataService.getProjectList(userId)
      .then(function(result){
        dataCtrl.projectList = result.data.data;
      });
  };

  dataCtrl.filterUsers = function (name) {
    DataService.filterUsers(name)
      .then(function (result) {
        console.log(result);
        dataCtrl.searchResult = result.data;
      });
  };

  dataCtrl.openProjectModules = function(project) {
    console.log(project);
    // $ionicHistory.nextViewOptions({
    //   disableBack: true
    // });
    $state.go('dashboard.module', {project: project}, {reload: true});
  };

  function init() {
    console.log($cookieStore.get('userId'));
    userId = $cookieStore.get('userId');
    DataService.GetUserById(userId)
      .then(function(result) {
        console.log(result.data);
        dataCtrl.user = result.data;
        dataCtrl.user_photo = 'http://graph.facebook.com/' + dataCtrl.user[0].fuid + '/picture?height=300';
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

  dataCtrl.createProject = function(name, description, start, end) {
    var startDate = new Date(start).toISOString();
    var endDate = new Date(end).toISOString();
    DataService.createProject(userId, name, description, startDate, endDate)
      .then(function(result) {
        if(result.status === 200) {
          dataCtrl.modal.hide();
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

  dataCtrl.openModalSummaryProject = function(id) {
    $ionicModal.fromTemplateUrl('templates/modals/project-summary.html', {
      scope: modalScope,
      animation: 'fade-in-scale'
    }).then(function(modal) {
      DataService.getProjectById(id)
        .then(function(result) {
          modalScope.project = result.data.data[0];
          dataCtrl.modal = modal;
          dataCtrl.modal.show();
        });
    });
  };

  dataCtrl.openModalCreateModule = function() {
    $ionicModal.fromTemplateUrl('templates/modals/create-module.html', {
      scope: modalScope,
      animation: 'fade-in-scale'
    }).then(function(modal) {
      dataCtrl.modal = modal;
      dataCtrl.modal.show();
    });
  };

  modalScope.closeModal = function() {
    dataCtrl.modal.hide();
  };


  init();
  angular.extend(modalScope, dataCtrl);
  modalScope.userId = userId;
}
