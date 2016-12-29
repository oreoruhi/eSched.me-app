angular.module('eSchedMe.directives', [])
  .directive('meetingCard', ['MeetingData', 'appModalService',
    function(MeetingData) {
      return {
        restrict: 'E',
        scope: {
          meeting: "="
        },
        templateUrl: 'templates/directives/meeting-card.html',
        controller: function($scope, appModalService) {
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

          $scope.editMeeting = function(meeting) {
            appModalService.show('templates/modals/meeting/edit-meeting.html', 'MeetingEditCtrl as vm', meeting);
          }
        }
      }
  }]);