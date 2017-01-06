(function() {
    'use strict';

    var app = angular.module('eSchedMe');

    app.service('ModuleService', ['$http', '$resource', 'API', ModuleServiceFunction]);

    function ModuleServiceFunction($http, $resource, API) {

       return $resource(API.URL + '/api/v1/module/:module', {module: '@module'}, {
         tag: {
           method: 'POST'
         },
         untag: {
           method: 'POST'
         }
       });
    }
})();
