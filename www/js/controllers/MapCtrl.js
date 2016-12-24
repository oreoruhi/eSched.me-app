angular.module('eSchedMe.controllers')

.controller('MapCtrl', function($state, $cordovaGeolocation){
    var vm = this;
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
        
        google.maps.event.addListener(marker, 'click', function () {
            infoWindow.open(vm.map, marker);
        });
        
        });
    }, function(error){
        console.log("Could not get location");
    });

});