(function () {

  angular.module('eSchedMe.controllers')
    .controller('ProjectCtrl', ProjectCtrlFunction);

    function ProjectCtrlFunction(
      $http,
      ProjectData,
      $ionicModal,
      $scope,
      $ionicPlatform,
      $cordovaDatePicker,
      $ionicPopover,
      $state,
      API) {
      var vm = this;
      vm.showModules = false;

      vm.getProjects = function() {
        vm.projects = ProjectData.get();
        console.log(vm.projects);
        vm.user = JSON.parse(window.localStorage.getItem('user'));
        console.log(vm.user);
      };

      vm.saveProject = function(title, desc, budget, vendor, status, start, end, priority) {
        var data = {
          "user_id": window.localStorage.getItem('user_id'),
          "title": title,
          "desc": desc,
          "budget": budget,
          "vendor": vendor,
          "status": status,
          "start": start,
          "end": end,
          "priority": priority
        };

        ProjectData.save(data,
          function(resp, header) {
            console.log(resp);
            vm.getProjects();
            vm.closeModal();
          },
          function(error) {
            console.log(error);
          });
      }

      vm.deleteProject = function(id) {
        console.log('deleteing id: ' + id);
        ProjectData.delete({project: id},
         function(resp, header) {
           vm.getProjects();
           vm.popover.hide();
         },
         function(error) {
           console.log(error);
         });
      }

      vm.createProject = function() {
        $ionicModal
          .fromTemplateUrl('templates/modals/project/create-project.html', function (modal) {
            $scope.saveProject = vm.saveProject;
            $scope.closeModal = vm.closeModal;
            $scope.openDatePicker = vm.openDatePicker;
            vm.modal = modal;
            vm.modal.show();
        }, {
          scope: $scope,
          animation: 'fade-in-scale'
        });
      }

      vm.editProject = function(project) {
        console.log(project);
        $ionicModal
          .fromTemplateUrl('templates/modals/project/edit-project.html', function (modal) {
            $scope.updateProject = vm.updateProject;
            $scope.closeModal = vm.closeModal;
            $scope.editDatePicker = vm.openDatePicker;
            $scope.project = project;
            $scope.project.end = new Date(project.end);
            vm.modal = modal;
            vm.modal.show();
        }, {
          scope: $scope,
          animation: 'fade-in-scale'
        });
      }

      vm.updateProject = function(id, title, desc, end, priority) {
        $http({
          method: 'PATCH',
          url: API.URL + '/api/v1/activity/' + id,
          data: {
            'title': title,
            'desc': desc,
            'end': end,
            'priority': priority
          }
        }).then(function(result) {
            vm.getProjects();
            vm.closeModal();
            vm.popover.hide();
        });
}

      vm.projectSummary = function(project) {
        $ionicModal
          .fromTemplateUrl('templates/modals/project/project-summary.html', function (modal) {
            $scope.project = project;
            $scope.closeModal = vm.closeModal;
            vm.modal = modal;
            vm.modal.show();
        }, {
          scope: $scope,
          animation: 'fade-in-scale'
        });
      }

      function filterFriends(friends, tagged) {
        var taggedId = {};

        tagged.forEach(function (obj) {
          taggedId[obj.id] = obj;
        });

        return friends.filter(function (obj) {
          return !(obj.id in taggedId);
        })
      }
      vm.tagPeople = function (project) {
        console.log(project);
        $ionicModal
          .fromTemplateUrl('templates/modals/project/tag-people.html', function (modal) {
            $scope.project = project;
            $scope.project.end = new Date(project.end);
            $scope.friends = [];
            $http({
              method: 'GET',
              url: API.URL + '/api/v1/me/friends'
            }).then(function (result) {
              $scope.allFriends = result.data.data;
              $scope.friends = filterFriends(result.data.data, project.tagged.data);
            });
            $scope.addTag = vm.addTag;
            $scope.unTag = vm.unTag;
            $scope.closeModal = vm.closeModal;
            vm.modal = modal;
            vm.modal.show();
          }, {
            scope: $scope,
            animation: 'fade-in-scale'
          });
      };

      vm.addTag = function (project_id, person_id) {
        $http({
          method: 'POST',
          url: API.URL + '/api/v1/activity/' + project_id + '/tag',
          data: {
            "user_id": person_id
          }
        }).then(function (result) {
          $scope.project = result.data.activity.data;
          $scope.friends = filterFriends($scope.friends, $scope.project.tagged.data);
        })
      };

      vm.unTag = function (project_id, person_id) {
        $http({
          method: 'POST',
          url: API.URL + '/api/v1/activity/' + project_id + '/untag',
          data: {
            "user_id": person_id
          }
        }).then(function (result) {
          console.log(result);
          $scope.project = result.data.activity.data;
          $scope.friends = filterFriends($scope.allFriends, $scope.project.tagged.data);
        })
      };



      vm.projectPopover = function($event, project){
        $scope.deleteProject = vm.deleteProject;
        $scope.project = project;
        $scope.editProject = vm.editProject;
        $scope.openTagModal = vm.tagPeople;
        $ionicPopover.fromTemplateUrl('templates/events/project-popover.html', {
          scope: $scope
        }).then(function(popover) {
          vm.popover = popover; //???????
          vm.project = project;
          console.log(project);
          vm.popover.show($event);
        });
      };

      vm.closeModal = function() {
        vm.modal.hide();
      }

      vm.openDatePicker = function (provider) {
        $ionicPlatform.ready(function() {
            var projectOptions = {
              date: new Date(),
              mode: 'date',
              minDate: new Date().valueOf()
            };
            $cordovaDatePicker.show(projectOptions)
              .then(function(result) {
                if(provider == 'start') $scope.startDate = result;
                if(provider == 'end' ) $scope.endDate = result;
              });
        });
      };

      vm.goToModule = function (module, project) {
        $state.go('dashboard.module',{project: project, module: module});
      };

      vm.getProjects();

    }

})();
