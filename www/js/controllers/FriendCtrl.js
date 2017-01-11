(function() {
  "use strict";


  angular.module('eSchedMe')
    .controller('FriendCtrl', controllerFunction);

  controllerFunction.$inject = [
    '$state',
    '$http',
    '$ionicModal',
    '$rootScope',
    'requests',
    'friends',
    'API'
  ];

  function controllerFunction($state, $http, $ionicModal, $rootScope, requests, friends, API) {
    var self = this;
    var modalScope = $rootScope.$new(true);

    function _init() {
      self.requests = requests.data.data;
      self.friends = friends.data.data;
    }

    self.approveRequest = function(user_id) {
      $http({
        method: 'POST',
        url: API.URL + '/api/v1/me/approve/' + user_id,
        headers: {
          'Authorization': 'Bearer ' + window.localStorage.getItem('id_token')
        }
      }).then(function (result) {
        console.log(result);
        $state.reload();
      });
    };

    self.deleteRequest = function(user_id) {
      $http({
        method: 'POST',
        url: API.URL + '/api/v1/me/unfriend/' + user_id,
        headers: {
          'Authorization': 'Bearer ' + window.localStorage.getItem('id_token')
        }
      }).then(function (result) {
        console.log(result);
        $state.reload();
      });
    };



  self.openModalMessageAssociate = function(id) {
    modalScope.id = id;
    $ionicModal.fromTemplateUrl('templates/modals/message-associate.html', {
      scope: modalScope,
      animation: 'fade-in-scale'
    }).then(function(modal) {
      self.modal = modal;
      self.modal.show();
    });
  };

  modalScope.closeModal = function() {
    self.modal.hide();
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
      self.modal.hide();
      // TODO : Redirect the user to the chat detail
      var chatDetailId = result.data.parent_id ? result.data.parent_id : result.data.id;
      $state.go('dashboard.chat', {id: chatDetailId});
    });
  }

    _init();
  }

})();
