(function() {
    'use strict';

    var app = angular.module('eSchedMe');

    app.service('DataService', ['$http', 'API', DataServiceFunction]);

    function DataServiceFunction($http, API) {
        var vm = this;



        vm.filterUsers = function(name) {
          return $http ({
            
          });
        };

        vm.GetUsers = function(){
            return $http ({
              
            });
        }

        vm.GetUserById = function(id) {
            return $http({
              method: 'GET',
              url: API.URL + '/api/v1/me',
              headers: {
                'Authorization': 'Bearer ' + window.localStorage.getItem('id_token')
              }
            });
       }

       vm.associateWithUser = function(userId, friendId) {
          return $http ({
            
          });
       }

       vm.getAllAssociates = function(userId) {
        return $http ({
          
        });
       }

       vm.checkAssociateRequest = function(friendId) {
        return $http ({
          
        })
       }


       vm.removeAssociate = function(id) {
        return $http ({
          
        });
       }

       vm.acceptAssociateRequest = function(id) {
        return $http ({
          
        });
       }

       vm.createProject = function(id, name, description, priority, start, end) {
          return $http ({
            
          });
       }

       vm.getProjectList = function(id){
        return $http ({
          
        });
       }

       vm.getProjectById = function(id) {
        return $http ({
          
        });
       }

      vm.deleteProjectById = function(id) {
        return $http ({
          
        });
      }

      vm.editProject = function(id, title, desc, end, priority) {
        return $http ({
          
        });
      }

      vm.getRequestsInfo = function(id) {
        return $http ({
          
        });
      }


      vm.getFriendsList = function(id) {
        return $http ({
          
        });
      }

      vm.deleteModulesOfProject = function(id) {
        return $http ({
          
        });
      }


      vm.createPersonalTask = function(userId, title, description, reminder) {
        return $http ({
          
        });
      }

      vm.deletePersonalTask = function(id) {
        return $http ({
          
        });
      }

      vm.getPersonalTasks = function(id) {
        return $http ({
          
        });
      }


      vm.editProfile = function(userId ,first_name, last_name, skills, about_me, occupation) {
        return $http ({
          
        });
      }

      vm.getAllTaggedToProject = function(project_id) {
        return $http ({
          
        });
      }

    }

})();
