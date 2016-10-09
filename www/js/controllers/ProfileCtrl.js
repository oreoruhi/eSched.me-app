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
    self.isRequest = false;
    self.isPending = false;
    self.associateAccepted = false;

    self.id = $state.params.id;

    function init() {
      DataService.GetUserById(self.id)
        .then(function(result) {
          self.user = result.data;
          $log.info(self.userId + '     ' + self.id);

          // Start of HIGHLY UNOPTIMIZED CODE
          DataService.getAllAssociates(self.userId)
            .then(function(result) {
              self.associates = result.data.data
              self.associates.forEach(function(result) {
                $log.info(result);
                if(result.friend_id == self.id) {
                  self.isRequest = true;
                  self.associateRequestId = result.id;
                  if(result.status == "Pending") {
                    self.isPending = true;
                  } else if (result.status === "Accepted"){
                    self.associateAccepted = true;
                  } else if (result.status === "Seen") {
                    self.ignored = true;
                  }
                }
              });
            });
          // End of HIGHLY UNOPTIMIZED CODE
          DataService.checkAssociateRequest(self.userId)
            .then(function(result) {
              self.requests = result.data;
              self.requests.forEach(function(res) {
                self.associateRequestId = res.id;
                if(res.status == "Pending") {
                  self.acceptRequest = true;
                }
                if(res.status == "Accepted") {
                  self.isRequest = true;
                  self.associateAccepted = true;
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
          self.isRequest = true;
          self.isPending = true;
        });
    }

    self.removeAssociate = function(id) {
      DataService.removeAssociate(id)
        .then(function(result) {
          $log.info(result);
          self.isRequest = false;
          self.isPending = false;
          self.associateAccepted = false;
        });
    }

    self.acceptAssociateRequest = function(id) {
      DataService.acceptAssociateRequest(id)
        .then(function(result) {
          self.acceptRequest = false;
          self.isRequest = true;
          self.associateAccepted = true;
        });
    }

    init();
  }

})();
