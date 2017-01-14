angular.module('eSchedMe')
  .controller('OtherUsersCtrl', OtherUsers);

function OtherUsers(
    $stateParams,
    $state,
    $http,
    $rootScope,
    $ionicModal,
    API) {
  var vm = this;
  var modalScope = $rootScope.$new(true);
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
    $http({
      method: 'POST',
      url: API.URL + '/api/v1/me/approve/' + user_id,
      headers: {
        'Authorization': 'Bearer ' + window.localStorage.getItem('id_token')
      }
    }).then(function (result) {
      console.log(result);
      vm.init();
    });
  };

  vm.sendRequest = function(user_id) {
    $http({
      method: 'POST',
      url: API.URL + '/api/v1/me/add/' + user_id,
      headers: {
        'Authorization': 'Bearer ' + window.localStorage.getItem('id_token')
      }
    }).then(function (result) {
      vm.init();
    });
  };

  vm.deleteRelation = function (user_id) {
    $http({
      method: 'POST',
      url: API.URL + '/api/v1/me/unfriend/' + user_id,
      headers: {
        'Authorization': 'Bearer ' + window.localStorage.getItem('id_token')
      }
    }).then(function (result) {
      console.log(result);
      console.log('DELETINF!!!');
      vm.init();
    });
  };

  vm.openModalMessageAssociate = function(id) {
    modalScope.id = id;
    $ionicModal.fromTemplateUrl('templates/modals/message-associate.html', {
      scope: modalScope,
      animation: 'fade-in-scale'
    }).then(function(modal) {
      vm.modal = modal;
      vm.modal.show();
    });
  };

  vm.init();

  modalScope.closeModal = function() {
    vm.modal.hide();
  };

  modalScope.sendMessage = function(id, textMessage) {
    console.log(id, textMessage);
    $http({
      method: 'POST',
      url: API.URL + '/api/v1/user/' + id + '/message',
      data: {
        "message": textMessage
      }
    }).then(function(result) {
      console.log(result);
      vm.modal.hide();
      // TODO : Redirect the user to the chat detail
      var chatDetailId = result.data.parent_id ? result.data.parent_id : result.data.id;
      $state.go('dashboard.chat', {id: chatDetailId});
    });
  }
}
