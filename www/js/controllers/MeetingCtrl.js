angular.module('eSchedMe.controllers')

.controller('MeetingCtrl', function(
    $state, 
    $scope, 
    MeetingData,
    $ionicPopover, 
    $ionicModal, 
    $ionicPlatform, 
    $cordovaDatePicker,
    $stateParams){
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
            $scope.saveMeeting = vm.saveMeeting;
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

    var geocoder = new google.maps.Geocoder();



      vm.saveMeeting = function(location, date, status) {
        console.log(location);
        geocoder.geocode( {'address': location}, function(results, status) {
        if (status == 'OK') {
            console.log(results[0].geometry.location.lat() + " " + results[0].geometry.location.lng());
            var data = {
                "activity_id": $stateParams.project.id,
                "location": location,
                "long": results[0].geometry.location.lng(),
                "lat": results[0].geometry.location.lat(),
                "status": status,
                "date": date,
            };
            console.log(data);

            MeetingData.save(data,
            function(resp, header) {
                console.log(resp);
                vm.getMeetings();
                vm.closeModal();
            },
            function(error) {
                console.log(error);
            });
        } else {
            console.log('Geocode was not successful for the following reason: ' + status);
        }
        });
        console.log(location);
      }

    init();

});
