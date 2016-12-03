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
      $ionicPopover) {
      var vm = this;

      vm.getProjects = function() {
        vm.projects = ProjectData.get();
        console.log(vm.projects);
        vm.user = JSON.parse(window.localStorage.getItem('user'));
        console.log(vm.user);
      }

      vm.saveProject = function(title, desc, status, start, end, priority) {
        var data = {
          "user_id": window.localStorage.getItem('user_id'),
          "title": title,
          "desc": desc,
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
          url: 'http://192.168.0.10:3000/api/v1/activity/' + id,
          headers: {'Authorization': 'Bearer ' + window.localStorage.getItem('id_token') },
          data: {
            'title': title,
            'desc': desc,
            'end': end,
            'priority': priority
          }
        }).then(function(result) {
            vm.getProjects();
            vm.closeModal();
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


      vm.projectPopover = function($event, project){
        $scope.deleteProject = vm.deleteProject;
        $scope.project = project;
        $scope.editProject = vm.editProject;
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

      vm.getProjects();

    }

})();
