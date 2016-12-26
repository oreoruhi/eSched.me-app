(function() {
    'use strict';

    var app = angular.module('eSchedMe');

    app.service('MeetingService', ['$http', 'API', MeetingServiceFunction]);

    function MeetingServiceFunction($http, API) {
        var vm = this;

    }

})();
