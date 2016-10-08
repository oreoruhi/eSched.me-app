(function() {
  "use strict";


  angular.module('eSchedMe')
    .controller('ProfileCtrl', profileCtrl);



  function profileCtrl(
    $state,
    $log,
    DataService,
    $cookieStore
  ) {

    var self = this;

    self.userId = $cookieStore.get('userId');
    self.isAssociate = false;
    self.isPending = false;
    self.associateAccepted = false;

    self.id = $state.params.id;

    function init() {
      DataService.GetUserById(self.id)
        .then(function(result) {
          self.user = result.data;
          $log.info(self.userId + '     ' + self.id);
          DataService.getAllAssociates(self.userId)
            .then(function(result) {
              self.associates = result.data.data
              self.associates.forEach(function(result) {
                $log.info(result);
                if(result.friend_id == self.id) {
                  self.isAssociate = true;
                  self.associateRequestId = result.id;
                  if(result.status == "Pending") {
                    self.isPending = true;
                  } else if (result.status === "Accepted"){
                    self.associateAccepted = true;
                  }
                }
              });
            });
        });
    }

    self.associateWithUser = function(friendId) {
      DataService.associateWithUser(self.userId, friendId)
        .then(function(result) {
          $log.info(result);
          self.associateRequestId = result.data.__metadata.id;
          self.isAssociate = true;
          self.isPending = true;
        });
    }

    self.removeAssociate = function(id) {
      DataService.removeAssociate(id)
        .then(function(result) {
          $log.info(result);
          self.isAssociate = false;
          self.isPending = false;
        });
    }

    init();
  }

})();
