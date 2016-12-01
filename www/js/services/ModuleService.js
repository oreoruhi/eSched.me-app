(function() {
    'use strict';

    var app = angular.module('eSchedMe');

    app.service('ModuleService', ['$http', ModuleServiceFunction]);

    function ModuleServiceFunction( $http) {
      var vm = this;
      

      vm.getProjectModules = function(id) {
        return $http ({
          
        });
      };

      vm.deleteModule = function (id) {
        return $http.delete('https://api.backand.com/1/objects/modules/' + id);
      };

      vm.newModule = function(id, name, desc, percentage, priority, start, end) {
        var today = new Date().toISOString();
        return $http ({
          
        });
      };

      vm.updateModule = function(id, title, priority, end, description) {
        return $http ({
          
        });
      }

      vm.getModuleById = function(id) {
        
      }
    }
})();
