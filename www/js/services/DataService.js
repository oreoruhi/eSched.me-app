/*(function() {
    'use strict';

    var app = angular.module('SimpleRESTIonic');

    app.service('DataService', ['Backand', '$q', '$http', DataServiceFunction]);

    function DataServiceFunction(Backand, $http, $q) {
        var vm = this;


        vm.baseUrl          = Backand.getApiUrl();
        
        vm.GetUsers    = function(){
            $http ({
              method: 'GET',
              url: Backand.getApiUrl() + '/1/query/data/getUsers',
              params: {
                parameters: {}
              }
            }).then(function(result) {
                return result.data;
            }).catch(function(err) {
                if (err) return $q.reject();
            });
        }

        vm.GetUsersById = function(id) {
            return $http({
                method: "GET",
                url: Backand.getApiUrl() + '/1/query/data/GetUsersById',
                params: {
                    parameters: {
                        user_id: id
                    }
                }
            });

    }

})();
*/