angular.module('eSchedMe.controllers')

.controller('MapCtrl', function($state, $cordovaGeolocation, MapService){
    var vm = this;

    function init(){
        MapService.GetMeetings().then(function(result){
            vm.meetings = result.data.data;
            // // var ctr = vm.meetings.length;
            // console.log(ctr);

         console.log(vm.meetings);
         for (var meeting in vm.meetings) {
            console.log("[" + meeting.location + "," + meeting.lat + "," + meeting.long + "],"); 
         }

        });
    }

    init();
    

    var options = {timeout: 10000, enableHighAccuracy: true};
 
    $cordovaGeolocation.getCurrentPosition(options).then(function(position){
 
    var latLng = new google.maps.LatLng(position.coords.latitude, position.coords.longitude);
 
    var mapOptions = {
      center: latLng,
      zoom: 15,
      mapTypeId: google.maps.MapTypeId.ROADMAP
    };
 
    vm.map = new google.maps.Map(document.getElementById("map"), mapOptions);
    
    google.maps.event.addListenerOnce(vm.map, 'idle', function(){
 
        var marker = new google.maps.Marker({
            map: vm.map,
            animation: google.maps.Animation.DROP,
            position: latLng
        });      
        
        var infoWindow = new google.maps.InfoWindow({
            content: '<div class="info_content">' +
                     '<h4>You are here!</h4>' +
                     '<p>This is your current location.</p>' + '</div>'
        });

        // ["Pangalan ng address", latitude, longitude],
        // for(ctr; ctr < max_ctr; ctr++){
        //     console.log("[" + vm.meetings[ctr].location + "," + vm.meeting[ctr].lat + "," + vm.meeting[ctr].long + "],"); 
        // }

        // ["Pangalan ng address", latitude, longitude]
        // var markers = [];

        google.maps.event.addListener(marker, 'click', function () {
            infoWindow.open(vm.map, marker);
        });
        
        });
    }, function(error){
        console.log("Could not get location");
    });

});