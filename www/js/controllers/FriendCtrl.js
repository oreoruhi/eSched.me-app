(function() {
  "use strict";


  angular.module('eSchedMe')
    .controller('FriendCtrl', controllerFunction);


  function controllerFunction(DataService, $cookieStore) {
    var self = this;

    function _init() {
      self.acceptedList = [];
      self.userId = $cookieStore.get('userId');
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


    _init();
  }

})();
