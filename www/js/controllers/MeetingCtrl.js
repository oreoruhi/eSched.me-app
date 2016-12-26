angular.module('eSchedMe.controllers')

.controller('MeetingCtrl', function(
    $state, 
    $scope, 
    MeetingData,
    $ionicPopover, 
    $ionicModal, 
    $ionicPlatform, 
    $cordovaDatePicker){
    var vm = this;

    function init(){
        vm.getMeetings();
    }

    vm.meetingPopover = function($event){
    $ionicPopover.fromTemplateUrl('templates/events/meeting-popover.html', {
        scope: $scope
    }).then(function(popover) {
        vm.popover = popover; 
        vm.popover.show($event);
        });
    };

    vm.createMeeting = function() {
    $ionicModal
        .fromTemplateUrl('templates/modals/meeting/create-meeting.html', function (modal) {
            $scope.openDatePicker = vm.openDatePicker;
            $scope.closeModal = vm.closeModal;
            vm.modal = modal;
            vm.modal.show();
    }, {
            scope: $scope,
            animation: 'fade-in-scale'
        });
    }

    vm.openDatePicker = function (provider) {
        $ionicPlatform.ready(function() {
            var projectOptions = {
              date: new Date(),
              mode: 'date',
              minDate: new Date().valueOf()
            };
            $cordovaDatePicker.show(projectOptions)
             .then(function(result) {
                if(provider == 'meetingdate') $scope.meetingdate = result;
              });
        });
      };

      vm.closeModal = function() {
        vm.modal.hide();
      }

      vm.getMeetings = function() {
        vm.meetings = MeetingData.get();
        console.log(vm.meetings);
      };

    init();

});
