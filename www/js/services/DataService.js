(function() {
    'use strict';

    var app = angular.module('SimpleRESTIonic');

    app.service('DataService', ['Backand','$http', DataServiceFunction]);

    function DataServiceFunction(Backand, $http) {
        var vm = this;


        vm.baseUrl          = Backand.getApiUrl();

        vm.GetUsers    = function(){
            return $http ({
              method: 'GET',
              url: Backand.getApiUrl() + '/1/query/data/getUsers',
              params: {
                parameters: {}
              }
            });
        }

        vm.GetUserById = function(id) {
            return $http({
                method: "GET",
                url: Backand.getApiUrl() + '/1/query/data/GetUsersById',
                params: {
                    parameters: {
                        user_id: 60
                    }
                }
            });
       }

    }
})();
