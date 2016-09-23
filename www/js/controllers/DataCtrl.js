angular.module('eSchedMe.controllers')
.controller('DataCtrl', DataCtrlFunction);

DataCtrlFunction.$inject = ['$http', '$rootScope', '$state','Backand', 'DataService', 'LoginService']

function DataCtrlFunction($http, $rootScope, $state, Backand, DataService, LoginService) {
  var dataCtrl = this;
  var userId;

  function getProjectList() {
    DataService.getProjectList(userId)
      .then(function(result){
        dataCtrl.projectList = result.data.data;
      });
  }

  function init() {
    Backand.getUserDetails()
      .then(function(result) {
        userId = result.userId;
        DataService.GetUserById(userId)
          .then(function(result) {
            console.log(result.data);
            dataCtrl.user = result.data;
          });
        getProjectList();
      });
  }


  dataCtrl.signout = function() {
    LoginService.signout()
    .then(function () {
        $rootScope.$broadcast('logout');
        $state.go('login');
    });
  }

  dataCtrl.createProject = function(name, description) {
    DataService.createProject(userId, name, description)
      .then(function(result) {
        if(result.status === 200) {
          getProjectList();
        }
      });
  }

  dataCtrl.deleteProjectById = function(id) {
    DataService.deleteProjectById(id)
      .then(function(result) {
        console.log(result);
        if(result.status === 200) {
          getProjectList();
        }
      });
  }

  init();
}
