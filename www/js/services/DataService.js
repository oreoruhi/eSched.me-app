(function() {
    'use strict';

    var app = angular.module('eSchedMe');

    app.service('DataService', ['Backand','$http', DataServiceFunction]);

    function DataServiceFunction(Backand, $http) {
        var vm = this;


        vm.baseUrl = Backand.getApiUrl();

        vm.filterUsers = function(name) {
          return $http ({
            method: 'GET',
            url: Backand.getApiUrl() + '/1/query/data/filterUsers',
            params: {
              parameters: {
                query: name
              }
            }
          });
        };

        vm.GetUsers = function(){
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
                        user_id: id
                    }
                }
            });
       }

       vm.createProject = function(id, name, description, start, end) {
          return $http ({
            method: 'POST',
            url: Backand.getApiUrl() + '/1/objects/activities?returnObject=true',
            data: {
              user_id: id,
              title: name,
              desc: description,
              start: start,
              end: end,
              status: 'Pending',
              created: new Date().toISOString(),
              modified: new Date().toISOString()
            }
          });
       }

       vm.getProjectList = function(id){
        return $http ({
          method: 'GET',
          url: Backand.getApiUrl() + '/1/query/data/getAllProjects',
          params: {
            parameters: {
              id: id
            }
          }
        });
       }

       vm.getProjectById = function(id) {
        return $http ({
          method: 'GET',
          url: Backand.getApiUrl() + '/1/objects/activities',
          params: {
            pageSize: 20,
            pageNumber: 1,
            filter: [
              {
                fieldName: 'id',
                operator: 'equals',
                value: id
              }
            ],
            sort: ''
          }
        });
       }

       vm.deleteProjectById = function(id) {
         return $http ({
          method: 'DELETE',
          url: Backand.getApiUrl() + '/1/objects/activities/' + id
        });
       }

    }
})();
