(function() {
    'use strict';

    var app = angular.module('eSchedMe');

    app.service('ModuleService', ['Backand','$http', ModuleServiceFunction]);

    function ModuleServiceFunction(Backand, $http) {
        var vm = this;




    }
})();
