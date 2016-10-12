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

       vm.associateWithUser = function(userId, friendId) {
          return $http ({
            method: 'POST',
            url: vm.baseUrl + '/1/objects/relationship',
            data: {
              user_id: userId,
              friend_id: friendId,
              status: 'Pending',
              created: new Date().toISOString(),
              modified: new Date().toISOString()
            }
          });
       }

       vm.getAllAssociates = function(userId) {
        return $http ({
          method: 'GET',
          url: Backand.getApiUrl() + '/1/objects/relationship',
          params: {
            filter: [
              {
                fieldName: 'user_id',
                operator: 'equals',
                value: userId
              }
            ],
          }
        });
       }

       vm.checkAssociateRequest = function(friendId) {
        return $http ({
          method: 'GET',
          url: vm.baseUrl + '/1/query/data/checkAssociateRequest',
          params: {
            parameters: {
              friend_id: friendId,
            }
          }
        })
       }


       vm.removeAssociate = function(id) {
        return $http ({
          method: 'DELETE',
          url: vm.baseUrl + '/1/objects/relationship/' + id
        });
       }

       vm.acceptAssociateRequest = function(id) {
        return $http ({
          method: 'PUT',
          url: Backand.getApiUrl() + '/1/objects/relationship/'+ id,
          data: {
            status: 'Accepted'
          }
        });
       }

       vm.createProject = function(id, name, description, priority, start, end) {
          return $http ({
            method: 'POST',
            url: Backand.getApiUrl() + '/1/objects/activities?returnObject=true',
            data: {
              user_id: id,
              title: name,
              desc: description,
              priority: priority,
              start: start,
              end: end,
              status: 'ongoing',
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

      vm.editProject = function(id, title, desc, end, priority) {
        return $http ({
          method: 'PUT',
          url: vm.baseUrl + '/1/objects/activities/' + id,
          data: {
            title: title,
            desc: desc,
            end: new Date(end),
            priority: priority,
            modified: new Date()
          }
        });
      }

      vm.getRequestsInfo = function(id) {
        return $http ({
          method: 'GET',
          url: Backand.getApiUrl() + '/1/query/data/getFriends',
          params: {
            parameters: {
              friend_id: id
            }
          }
        });
      }


      vm.getFriendsList = function(id) {
        return $http ({
          method: 'GET',
          url: Backand.getApiUrl() + '/1/query/data/getAssociateList',
          params: {
            parameters: {
              id: id
            }
          }
        });
      }

      vm.deleteModulesOfProject = function(id) {
        return $http ({
          method: 'GET',
          url: Backand.getApiUrl() + '/1/objects/action/activities/?name=deleteModules',
          params: {
            parameters: {
              activity_id: id
            }
          }
        });
      }
    }
      
})();
