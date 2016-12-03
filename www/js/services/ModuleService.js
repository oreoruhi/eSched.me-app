(function() {
    'use strict';

    var app = angular.module('eSchedMe');

    app.service('ModuleService', ['$http', '$resource', ModuleServiceFunction]);

    function ModuleServiceFunction($http, $resource) {
      // var vm = this;


      // vm.deleteModule = function (id) {
      //   return $http.delete('https://api.backand.com/1/objects/modules/' + id);
      // };

      // vm.newModule = function(id, name, desc, percentage, priority, start, end) {
      //   var today = new Date().toISOString();
      //   return $http ({

      //   });
      // };

      // vm.updateModule = function(id, title, priority, end, description) {
      //   return $http ({

      //   });
      // }

      // vm.getModuleById = function(id) {

      // }

       return $resource('http://192.168.0.10:3000/api/v1/module/:module', {module: '@module'});
    }
})();
