(function() {
    'use strict';

    var app = angular.module('eSchedMe');

    app.service('MapService', ['$http', 'API', MapServiceFunction]);

    function MapServiceFunction($http, API) {
        var vm = this;

        vm.GetMeetings = function(){
            return $http ({
              method: 'GET',
              url: API.URL + '/api/v1/meeting'
            });
        }

    }

})();
