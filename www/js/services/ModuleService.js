(function() {
    'use strict';

    var app = angular.module('eSchedMe');

    app.service('ModuleService', ['Backand','$http', ModuleServiceFunction]);

    function ModuleServiceFunction(Backand, $http) {
      var vm = this;
      var apiUrl = Backand.getApiUrl();

      vm.getProjectModules = function(id) {
        return $http ({
          method: 'GET',
          url: Backand.getApiUrl() + '/1/objects/modules',
          params: {
            pageSize: 20,
            pageNumber: 1,
            filter: [
              {
                fieldName: 'activity_id',
                operator: 'equals',
                value: id
              }
            ],
            sort: ''
          }
        });
      };

      vm.deleteModule = function (id) {
        return $http.delete('https://api.backand.com/1/objects/modules/' + id);
      };

      vm.newModule = function(id, name, desc, percentage, priority, start, end) {
        var today = new Date().toISOString();
        return $http ({
          method: 'POST',
          url: Backand.getApiUrl() + '/1/objects/modules?returnObject=true',
          data: {
            activity_id: id,
            title: name,
            description: desc,
            percentage: percentage,
            priority: priority,
            status: 'Pending',
            start: start,
            end: end,
            created: today,
            modified: today
          }
        });
      };

      vm.updateModule = function(id, title, priority, end, description) {
        return $http ({
          method: 'PUT',
          url: apiUrl + '/1/objects/modules/' + id,
          data: {
            title: title,
            priority: priority,
            end: new Date(end),
            description: description,
            modified: new Date()
          }
        });
      }

      vm.getModuleById = function(id) {
        return $http.get(apiUrl + '/1/objects/modules/' + id);
      }
    }
})();
