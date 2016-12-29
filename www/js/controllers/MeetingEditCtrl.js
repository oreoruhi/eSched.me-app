angular.module('eSchedMe.controllers')

.controller('MeetingEditCtrl', function(
    $state,
    $scope,
    $stateParams,
    $q,
    MeetingData,
    parameters){
    var vm = this;

    function init(){
      vm.meeting = parameters;
      console.log(parameters);
    }

    function prepareData(location, date, meetingStatus) {
      var deferred = $q.defer();
      var geocoder = new google.maps.Geocoder();
      geocoder.geocode( {'address': location}, function(result, status) {
        if (status == 'OK') {
          var data = {
            "activity_id": vm.meeting.activity_id,
            "location": location,
            "long": results[0].geometry.location.lng(),
            "lat": results[0].geometry.location.lat(),
            "status": meetingStatus,
            "date": date
          };
          deferred.resolve(data);
        } else if(status == 'ZERO_RESULTS') {
          var data = {
              "activity_id": vm.meeting.activity_id,
              "location": location,
              "status": meetingStatus,
              "date": date
          };
          deferred.resolve(data);
        }
        // TODO: Add Error else that will reject the deferred object.
      });
      return deferred.promise;
    }

    init();


    vm.updateMeeting = function(location, date, meetingStatus) {
      console.log(location);
      prepareData(location, date, meetingStatus)
        .then(function(result) {
          MeetingData.update({meeting: vm.meeting.id}, result,
            function(resp, header) {
                console.log(resp);
                vm.closeModal();
            },
            function(error) {
                console.log(error);
          });
          console.log(location);
        });
    };
});
