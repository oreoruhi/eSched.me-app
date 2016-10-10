(function() {
  "use strict";


  angular.module('eSchedMe')
    .controller('FriendCtrl', controllerFunction);


  function controllerFunction(DataService, $cookieStore) {
    var self = this;

    function _init() {
      self.userId = $cookieStore.get('userId');
      DataService.getRequestsInfo(self.userId)
        .then(function(result) {
          self.followRequest = result.data;
          console.log(result.data);
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
