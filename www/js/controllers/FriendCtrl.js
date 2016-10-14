(function() {
  "use strict";


  angular.module('eSchedMe')
    .controller('FriendCtrl', controllerFunction);


  function controllerFunction(DataService, $cookieStore, $ionicModal, $rootScope) {
    var self = this;
    var modalScope = $rootScope.$new(true);

    function _init() {
      self.acceptedList = [];
      self.userId = window.localStorage.getItem('userId');
      DataService.getRequestsInfo(self.userId)
        .then(function(result) {
          self.followRequest = result.data;
          console.log(result.data);
        });

      DataService.getFriendsList(self.userId)
        .then(function(result) {
          self.friendsList = result.data;
          self.friendsList.forEach(function(friend) {
            //pag sya yung naka login
            if(self.userId == friend.user_id) {
              DataService.GetUserById(friend.friend_id)
                .then(function(result) {
                  result.data[0].request_id = friend.id;
                  self.acceptedList.push(result.data[0]);
                });
            } else {
              DataService.GetUserById(friend.user_id)
                .then(function(result) {
                  result.data[0].request_id = friend.id;
                  self.acceptedList.push(result.data[0]);
                });
            }
          });
        });
    }

    self.acceptRequest = function(id) {
      DataService.acceptAssociateRequest(id)
        .then(function(result) {
          console.log('Accepted!');
          _init();
        });
    }

    self.deleteRequest = function(id) {
      DataService.removeAssociate(id)
        .then(function(result) {
          console.log('Deleted!');
          _init();
        });
    }



  self.openModalMessageAssociate = function() {
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

    _init();
  }

})();
