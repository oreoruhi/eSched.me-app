angular.module('eSchedMe.controllers')

.controller('DirectionsCtrl', function($state, $stateParams, $cordovaGeolocation){
    var vm = this;


    var directionsDisplay;
    var directionsService = new google.maps.DirectionsService();
    var directionsMap;
    vm.map = document.getElementById("directions-map");
    var start;
    var end;


    var options = {timeout: 10000, enableHighAccuracy: true};

    $cordovaGeolocation.getCurrentPosition(options).then(function(position){
      directionsLatitude = position.coords.latitude;
      directionsLongitude = position.coords.longitude;
      destinationLatitude = $stateParams.meeting.lat;
      destinationLongitude = $stateParams.meeting.long;
      directionsLatLng = new google.maps.LatLng(directionsLatitude, directionsLongitude);
      destinationLatLng = new google.maps.LatLng(destinationLatitude, destinationLongitude);
      getDirections();
      console.log(directionsLatitude + " " + directionsLongitude);
      console.log(destinationLatitude + " " + destinationLongitude);
    }, function(error){

          console.log("Doesn't work!!!");
    });



    function getDirections() {
        console.log('getDirections');
        start = directionsLatLng;
        end = destinationLatLng;
        console.log("getDirections " + directionsLatLng + " " + destinationLatLng);

        var directionsOptions = {
          zoom: 12,
          center: start
        }

        directionsMap = new google.maps.Map(vm.map, directionsOptions);
        directionsDisplay = new google.maps.DirectionsRenderer({
          draggable: true,
          map: directionsMap,
        });
        directionsDisplay.setMap(directionsMap);
        calcRoute();
    }

    function calcRoute() {
        console.log("calcRoute " + directionsLatLng + " " + destinationLatLng);
        var request = {
        origin:start,
        destination:end,
        travelMode: google.maps.TravelMode.DRIVING
        };
        directionsService.route(request, function(result, status) {
        if (status == google.maps.DirectionsStatus.OK) {
            directionsDisplay.setDirections(result);
        }
        });
    }

});
