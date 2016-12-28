angular.module('eSchedMe.controllers')

.controller('MeetingEditCtrl', function(
    $state,
    $scope,
    MeetingData,
    $stateParams,
    parameters){
    var vm = this;

    function init(){
      vm.meeting = parameters;
      console.log(parameters);
    }

    init();

    var geocoder = new google.maps.Geocoder();
    var data;
    vm.updateMeeting = function(location, date, meetingStatus) {
      console.log(location);
      geocoder.geocode( {'address': location}, function(results, status) {
        if (status == 'OK') {
          console.log(results[0].geometry.location.lat() + " " + results[0].geometry.location.lng());
           data = {
              "activity_id": vm.meeting.activity_id,
              "location": location,
              "long": results[0].geometry.location.lng(),
              "lat": results[0].geometry.location.lat(),
              "status": meetingStatus,
              "date": date
          };
          console.log(data);
        } else {
          console.log('Geocode was not successful for the following reason: ' + status);
          data = {
              "activity_id": vm.meeting.activity_id,
              "location": location,
              "status": meetingStatus,
              "date": date
          };
        }
        MeetingData.update({meeting: vm.meeting.id}, data,
          function(resp, header) {
              console.log(resp);
              vm.closeModal();
          },
          function(error) {
              console.log(error);
        });
      });
      console.log(location);
    }

});
