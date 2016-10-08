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
  '$ionicPopover',
  '$ionicPlatform',
  '$cordovaDatePicker'
];

function DataCtrlFunction($http, $rootScope, $state, $cookieStore, DataService, LoginService, ProjectService, $ionicModal, $ionicHistory, $ionicPopover, $ionicPlatform, $cordovaDatePicker) {
  var dataCtrl = this;
  var userId;
  var modalScope = $rootScope.$new(true);
  init();


  function getProjectList() {
    DataService.getProjectList(userId)
      .then(function(result){
        console.log(result);
        dataCtrl.projectList = result.data;
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
    $state.go('dashboard.module', {project: project});
  };

  function init() {
    console.log($cookieStore.get('userId'));
    userId = $cookieStore.get('userId');
    DataService.GetUserById(userId)
      .then(function(result) {
        console.log(result.data);
        dataCtrl.user = result.data;
        console.log(JSON.stringify(dataCtrl.user[0]));
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
          modalScope.popover.hide();
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

  dataCtrl.showPopoverProject = function($event, project){
    $ionicPopover.fromTemplateUrl('templates/events/project-popover.html', {
      scope: modalScope
    }).then(function(popover) {
      modalScope.popover = popover; //???????
      modalScope.project = project;
      modalScope.popover.show($event);
    });
  };

  modalScope.openDatePicker = function (provider) {
    $ionicPlatform.ready(function() {
        var projectOptions = {
          date: new Date(),
          mode: 'date',
          minDate: new Date().valueOf()
        };
        $cordovaDatePicker.show(projectOptions)
          .then(function(result) {
            if(provider == 'start') modalScope.startDate = result;
            if(provider == 'end' ) modalScope.endDate = result;
          });
    });
  };

  angular.extend(modalScope, dataCtrl);
  modalScope.userId = userId;
}
