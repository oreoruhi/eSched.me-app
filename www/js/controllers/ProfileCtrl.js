(function() {
  "use strict";


  angular.module('eSchedMe')
    .controller('ProfileCtrl', profileCtrl);



  function profileCtrl(
    $state,
    $log,
    DataService,
    $cookieStore,
    $ionicModal,
    $rootScope,
    $ionicPlatform,
    $cordovaDatePicker
  ) {

    var self = this;
    var modalScope = $rootScope.$new(true);

    var modalScope = $rootScope.$new();
    angular.extend(modalScope, self);

    var modalScope = $rootScope.$new();
    angular.extend(modalScope, self);

    self.userId = $cookieStore.get('userId');
    self.isRequest = false;
    self.isPending = false;
    self.associateAccepted = false;

    self.id = $state.params.id;

    function init() {
      DataService.getPersonalTasks(self.userId)
        .then(function(result) {
          self.personalTasks = result.data.data;
        });

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
                console.log(res.user_id +'    ' + self.id);
                if(res.user_id == self.id) {
                  if(res.status == "Pending") {
                    self.isRequest = true;
                    self.acceptRequest = true;
                  }
                  if(res.status == "Accepted") {
                    self.isRequest = true;
                    self.associateAccepted = true;
                  }
                }
              });
            });
        });
    }

    self.openModalEditProfile = function() {
      $ionicModal.fromTemplateUrl('templates/modals/profile/profile-edit.html', {
        scope: modalScope,
        animation: 'fade-in-scale'
      }).then(function(modal) {
        modalScope.modal = modal;
        modalScope.user = self.user;
        $log.info(modalScope.user);
        modal.show();
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

    self.showTaskModal = function() {
      $ionicModal.fromTemplateUrl('templates/modals/profile/new-personal-task.html', {
        scope: modalScope,
        animation: 'fade-in-scale'
      }).then(function(modal) {
        modalScope.modal = modal;
        modal.show();
      });
    }

    self.deleteTask = function(id) {
      DataService.deletePersonalTask(id)
        .then(function(result) {
          init();
        });
    }

    modalScope.close = function() {
      init();
      modalScope.modal.hide();
    }

    modalScope.openDatePicker = function () {
      $ionicPlatform.ready(function() {
          var projectOptions = {
            date: new Date(),
            mode: 'date',
            minDate: new Date().valueOf()
          };
          $cordovaDatePicker.show(projectOptions)
            .then(function(result) {
              modalScope.reminder = result;
            });
      });
    };

    modalScope.createPersonalTask = function(title, description, reminder) {
      var reminderDate = new Date(reminder).toISOString();
      DataService.createPersonalTask(self.userId, title, description, reminderDate)
        .then(function(result) {
          modalScope.modal.hide();
          init();
        });
    }

    modalScope.editProfile = function() {
      DataService.editProfile(
          modalScope.user[0].first_name, 
          modalScope.user[0].last_name, 
          modalScope.user[0].skills, 
          modalScope.user[0].about_me,
          modalScope.user[0].occupation)
        .then(function(result) {
          modalScope.modal.hide();
        });
    }

    

    init();
    angular.extend(modalScope, profileCtrl);
  }

})();
