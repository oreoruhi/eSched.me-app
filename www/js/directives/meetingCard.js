angular.module('eSchedMe.directives', [])
  .directive('meetingCard', ['$state', 'MeetingData', 'appModalService',
    function(MeetingData) {
      return {
        restrict: 'E',
        scope: {
          meeting: "="
        },
        templateUrl: 'templates/directives/meeting-card.html',
        controller: function($state, $scope, appModalService) {
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

<<<<<<< HEAD
<<<<<<< HEAD
          $scope.completeMeeting = function(meeting) {
            MeetingData.update({meeting: meeting.id}, {status: 'Completed'},
            function(resp, header) {
              if(resp.message === "Meeting Updated!") {
                $scope.$parent.vm.getMeetings();
              }
            },
            function(error) {
              console.log(error);
            });
=======
          $scope.viewMeeting = function(meeting){
              console.log("clicked");
              $state.go('dashboard.direction',{meeting: meeting});
>>>>>>> 883a4b1ae1cd201370e8cd6cee6fd7b370c63708
=======
          $scope.viewMeeting = function(meeting){
              console.log("clicked");
              $state.go('dashboard.direction',{meeting: meeting});
>>>>>>> 883a4b1ae1cd201370e8cd6cee6fd7b370c63708
          }
        }
      }
  }]);
