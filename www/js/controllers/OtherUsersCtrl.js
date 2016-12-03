angular.module('eSchedMe')
  .controller('OtherUsersCtrl', OtherUsers);

function OtherUsers($stateParams, $state,$http, API) {
  var vm = this;

  vm.user = null;


  vm.init = function() {
    var id = $stateParams.id;
    if(id === window.localStorage.getItem('user_id')) $state.go('dashboard.profile');

    $http({
      method: 'GET',
      url: API.URL + '/api/v1/me/check/' + id,
      headers: {
        'Authorization': 'Bearer ' + window.localStorage.getItem('id_token')
      }
    }).then(function (result) {
      vm.user = result.data;
      console.log(vm.user);
    });
  };

  vm.approveRequest = function(user_id) {

  };

  vm.sendRequest = function(user_id) {

  };

  vm.deleteRelation = function (user_id) {

  };

  vm.init();
}
