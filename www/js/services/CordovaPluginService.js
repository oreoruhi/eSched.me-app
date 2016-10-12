(function () {
  'use strict';

  angular.module('eSchedMe')
    .factory('CordovaPlugins', cordovaServiceFunction);

  cordovaServiceFunction.$inject = ['$ionicPlatform', '$cordovaDatePicker'];

  function cordovaServiceFunction($ionicPlatform, $cordovaDatePicker) {
    return {
      openDatePicker: openDatePicker
    };

    function openDatePicker (project, provider) {
      $ionicPlatform.ready(function() {
        if (provider === 'project') {
          var projectOptions = {
            date: new Date(),
            mode: 'date',
            minDate: new Date().valueOf()
          };
          return $cordovaDatePicker.show(projectOptions);
        }
        var options = {
          date: new Date(),
          mode: 'date', // or 'time'
          minDate: new Date(project.start).valueOf(),
          maxDate: new Date(project.end).valueOf()
        };
        return $cordovaDatePicker.show(options);
      });
    }
  }
})();
