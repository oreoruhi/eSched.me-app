angular.module('eSchedMe.controllers')

.controller('MapCtrl', function($state, $cordovaGeolocation, MapService){
    var vm = this;

    function init(){
        MapService.GetMeetings().then(function(result){
            vm.meetings = result.data.data;
            // // var ctr = vm.meetings.length;
            // console.log(ctr);


            var options = {timeout: 10000, enableHighAccuracy: true};

            $cordovaGeolocation.getCurrentPosition(options).then(function(position){


            var mapLat = position.coords.latitude;
            var mapLong = position.coords.longitude;
        
            var latLng = new google.maps.LatLng(position.coords.latitude, position.coords.longitude);

            var latLng = new google.maps.LatLng(position.coords.latitude, position.coords.longitude);

            var mapOptions = {
            center: latLng,
            zoom: 12,
            mapTypeId: google.maps.MapTypeId.ROADMAP
            };

            vm.map = new google.maps.Map(document.getElementById("map"), mapOptions);

            google.maps.event.addListenerOnce(vm.map, 'idle', function(){


                var marker = new google.maps.Marker({
                    map: vm.map,
                    position: latLng
                });
 
                vm.meetings.forEach(function(meeting){
                    var position = new google.maps.LatLng(meeting.lat, meeting.long);
                    var markers = new google.maps.Marker({
                        position: position,
                        map: vm.map,
                        title: meeting.location,
                    });

                    var infoWindowMultiple = new google.maps.InfoWindow({
                        content: '<div class="info_content">' +
                                '<h4>' + meeting.location + '</h4>' +
                                '<p>Put agenda information here.</p>' + '</div>'
                    });

                    google.maps.event.addListener(markers, 'click', function () {
                    infoWindowMultiple.open(vm.map, markers);

                    google.maps.event.addListener(vm.map, "click", function(event) { infoWindowMultiple.close(vm.map, markers); }); 
                });               

                });

                var infoWindow = new google.maps.InfoWindow({
                    content: '<div class="info_content">' +
                             '<h4>You are here!</h4>' +
                             '<p>This is your current location.</p>' + '</div>'
                });

                google.maps.event.addListener(marker, 'click', function () {
                    infoWindow.open(vm.map, marker);
                });

                google.maps.event.addListener(vm.map, "click", function(event) { infoWindow.close(vm.map, marker); }); 

                });
            }, function(error){
                console.log("Could not get location");
            });

        });
    }

    init();

});
