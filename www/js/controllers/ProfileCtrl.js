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
    $cordovaDatePicker,
    user
  ) {

    var self = this;
    var modalScope = $rootScope.$new(true);

    var modalScope = $rootScope.$new();
    angular.extend(modalScope, self);

    var modalScope = $rootScope.$new();
    angular.extend(modalScope, self);

    self.userId = window.localStorage.getItem('userId');
    self.isRequest = false;
    self.isPending = false;
    self.associateAccepted = false;

    self.id = JSON.parse(window.localStorage.getItem('user')).id;

    function init() {
      window.localStorage.setItem('user',JSON.stringify(user.data.data));
      self.user = JSON.parse(window.localStorage.getItem('user'));
      self.personalTasks = self.user.personal_tasks.data;
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
          self.user.id,
          modalScope.user.first_name,
          modalScope.user.last_name,
          modalScope.user.skills,
          modalScope.user.about_me,
          modalScope.user.occupation)
        .then(function(result) {
          modalScope.modal.hide();
        });
    }



    init();
    angular.extend(modalScope, profileCtrl);
  }

})();
