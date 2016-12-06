(function() {
  "use strict";


  angular.module('eSchedMe')
    .controller('ProfileCtrl', profileCtrl);



  function profileCtrl(
    $state,
    $http,
    $log,
    DataService,
    $ionicModal,
    $rootScope,
    $ionicPlatform,
    $cordovaDatePicker,
    API,
    user,
    PersonalTaskData,
    _
  ) {

    var self = this;
    var modalScope = $rootScope.$new(true);

    var modalScope = $rootScope.$new();
    angular.extend(modalScope, self);

    var modalScope = $rootScope.$new();
    angular.extend(modalScope, self);


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
    };

    self.showTaskModal = function() {
      $ionicModal.fromTemplateUrl('templates/modals/profile/new-personal-task.html', {
        scope: modalScope,
        animation: 'fade-in-scale'
      }).then(function(modal) {
        modalScope.modal = modal;
        modal.show();
      });
    };

    self.deleteTask = function(id) {
      PersonalTaskData.delete({task: id}, function (resp, header) {
        console.log(resp);
        self.personalTasks = _.reject(self.personalTasks, function (el) {
          return el.id == id;
        });
      }, function (error) {
        console.log(error);
      });
    };

    modalScope.close = function() {
      init();
      modalScope.modal.hide();
    };

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
      $http({
        method: 'POST',
        url: API.URL + '/api/v1/personaltask',
        data:  {
          user_id: self.id,
          title: title,
          description: description,
          reminder_date: reminderDate,
          status: 'ongoing'
        }
      }).then(function (result) {
        console.log(result);
        modalScope.modal.hide();
        self.personalTasks = _.union(self.personalTasks, [result.data]);
      });
    };

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
    };



    init();
    angular.extend(modalScope, profileCtrl);
  }

})();
