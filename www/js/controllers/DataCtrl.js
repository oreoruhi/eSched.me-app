angular.module('SimpleRESTIonic.controllers')
.controller('DataCtrl', DataCtrlFunction);

DataCtrlFunction.$inject = ['$http', 'Backand', 'DataService', 'LoginService']

function DataCtrlFunction($http, Backand, DataService, LoginService) {
  var dataCtrl = this;

  function init() {
    var userId;
    Backand.getUserDetails()
      .then(function(result) {
        DataService.GetUserById(result.userId)
          .then(function(result) {
            console.log(result.data);
            dataCtrl.user = result.data;
          })
      });
  }

  dataCtrl.signout = function() {
    LoginService.signout()
    .then(function () {
        $rootScope.$broadcast('logout');
        $state.go('login');
    });
  }

  init();
}
