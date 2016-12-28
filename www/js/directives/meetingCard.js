angular.module('eSchedMe.directives', [])
  .directive('meetingCard', ['MeetingData',
    function(MeetingData) {
      return {
        restrict: 'E',
        scope: {
          meeting: "="
        },
        templateUrl: 'templates/directives/meeting-card.html',
        controller: function($scope) {
          $scope.meeting.date = new Date($scope.meeting.date);

          $scope.deleteMeeting = function(meeting) {
            console.log(meeting.id);
            MeetingData.delete({meeting: meeting.id},
              function(resp, header) {
                if(resp.message === "Meeting Deleted!") {
                  $scope.$parent.vm.getMeetings();
                }
              },
              function(error) {
                console.log(error);
              }
            );
          }
        }
      }
  }]);
