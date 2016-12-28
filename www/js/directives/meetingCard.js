angular.module('eSchedMe.directives', [])
  .directive('meetingCard', function() {
    return {
      restrict: 'E',
      scope: {
        meeting: "="
      },
      templateUrl: 'templates/directives/meeting-card.html',
      controller: function() {

      }
    }
  });
