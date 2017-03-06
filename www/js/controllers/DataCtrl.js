angular.module('eSchedMe.controllers')
.controller('DataCtrl', DataCtrlFunction);

DataCtrlFunction.$inject = [
  '$http',
  '$rootScope',
  '$state',
  '$cookieStore',
  'DataService',
  'LoginService',
  'ProjectService',
  '$ionicModal',
  '$ionicHistory',
  '$ionicPopover',
  '$ionicLoading',
  '$ionicPlatform',
  '$cordovaDatePicker',
  '$location',
  '_',
  'ProjectData',
  'API'
];

function DataCtrlFunction(
  $http,
  $rootScope,
  $state,
  $cookieStore,
  DataService,
  LoginService,
  ProjectService,
  $ionicModal,
  $ionicHistory,
  $ionicPopover,
  $ionicLoading,
  $ionicPlatform,
  $cordovaDatePicker,
  $location,
  _,
  ProjectData,
  API) {


  var dataCtrl = this;
  var userId;
  var modalScope = $rootScope.$new(true);
  init();


  function getProjectList() {
    // DataService.getProjectList(userId)
    //   .then(function(result){
    //     console.log(result);
    //     dataCtrl.projectList = result.data;
    //   });
    dataCtrl.projectList = dataCtrl.user.activities;
  };

  dataCtrl.filterUsers = function (name) {
    DataService.GetUsers()
      .then(function (result) {
        console.log(result);
        dataCtrl.searchResult = result.data.data;
      });
  };

  dataCtrl.openProjectModules = function(project) {
    console.log(project);
    // $ionicHistory.nextViewOptions({
    //   disableBack: true
    // });
    window.localStorage.setItem('project', JSON.stringify(project));
    $state.go('dashboard.module');
  };

  function init() {
    DataService.GetUserById()
      .then(function(result) {
        dataCtrl.user = result.data.data;
        window.localStorage.setItem('user_id', dataCtrl.user.id);
        window.localStorage.setItem('user', JSON.stringify(dataCtrl.user));
        console.log(dataCtrl.user);
      });
      // TODO: Multiple HTTP Request for Badge data is bad
      $http.get(API.URL + '/api/v1/me/pending_activity_tags')
        .then(function (resp) {
          dataCtrl.tagCount = resp.data.length;
        });
      $http.get(API.URL + '/api/v1/me/requests')
        .then(function (resp) {
          dataCtrl.associateCount = resp.data.data.length;
        });
  }


  dataCtrl.signout = function() {
    var user = window.localStorage.getItem('user');
    user = JSON.parse(user);
    console.log(user);
    LoginService.signout(user);
  };

  dataCtrl.createProject = function(name, desc, priority, start, end) {
    // var start = new Date(start).toISOString();
    // var end = new Date(end).toISOString();
    var user_id = window.localStorage.getItem('user_id');
    var data = {
      "user_id": user_id,
      "title": name,
      "desc": desc,
      "status": "ongoing",
      "start": start,
      "end": end,
      "priority": priority
    };

    ProjectData.save(data);
    init();
    modalScope.closeModal();
  };


  dataCtrl.deleteProjectById = function(id) {
    ProjectData.delete({project: id},
      function(resp, header){
        console.log('Project is successfully deleted');
        modalScope.popover.hide();$pr
        $state.go('dashboard.project');
      },
      function(error) {

      });
    // DataService.deleteProjectById(id)
    //   .then(function(result) {
    //     DataService.deleteModulesOfProject(id)
    //       .then(function() {
    //         if(result.status === 200) {
    //           console.log('Project is successfully deleted');
    //           modalScope.popover.hide();
    //           getProjectList();
    //         }
    //       })
    //   });
  };

  dataCtrl.openModalCreateProject = function() {
    $ionicModal.fromTemplateUrl('templates/modals/project/create-project.html', {
      scope: modalScope,
      animation: 'fade-in-scale'
    }).then(function(modal) {
      dataCtrl.modal = modal;
      dataCtrl.modal.show();
    });
  };

  dataCtrl.openModalSummaryProject = function(id) {
    $ionicModal.fromTemplateUrl('templates/modals/project/project-summary.html', {
      scope: modalScope,
      animation: 'fade-in-scale'
    }).then(function(modal) {
      DataService.getProjectById(id)
        .then(function(result) {
          modalScope.project = result.data.data[0];
          dataCtrl.modal = modal;

          dataCtrl.modal.show();
        });
    });
  };

  modalScope.openEditModal = function(id) {
    $ionicModal.fromTemplateUrl('templates/modals/project/edit-project.html', {
      scope: modalScope,
      animation: 'fade-in-scale'
    }).then(function(modal) {
      DataService.getProjectById(id)
        .then(function(result) {
          result.data.data[0].start = new Date(result.data.data[0].start);
          result.data.data[0].end = new Date(result.data.data[0].end);
          modalScope.data = result.data.data[0];
          dataCtrl.modal = modal;
          dataCtrl.modal.show();
        });
    });
  }

  dataCtrl.openModalCreateModule = function() {
    $ionicModal.fromTemplateUrl('templates/modals/module/create-module.html', {
      scope: modalScope,
      animation: 'fade-in-scale'
    }).then(function(modal) {
      dataCtrl.modal = modal;
      dataCtrl.modal.show();
    });
  };

  modalScope.closeModal = function() {
    dataCtrl.modal.hide();
  };

  dataCtrl.showPopoverProject = function($event, project){
    $ionicPopover.fromTemplateUrl('templates/events/project-popover.html', {
      scope: modalScope
    }).then(function(popover) {
      modalScope.popover = popover; //???????
      modalScope.project = project;
      console.log(project);
      modalScope.popover.show($event);
    });
  };

  modalScope.openDatePicker = function (provider) {
    $ionicPlatform.ready(function() {
        var projectOptions = {
          date: new Date(),
          mode: 'date',
          minDate: new Date().valueOf()
        };
        $cordovaDatePicker.show(projectOptions)
          .then(function(result) {
            if(provider == 'start') modalScope.startDate = result;
            if(provider == 'end' ) modalScope.endDate = result;
          });
    });
  };

  modalScope.editDatePicker = function (provider) {
    $ionicPlatform.ready(function() {
        var projectOptions = {
          date: new Date(),
          mode: 'date',
          minDate: new Date().valueOf()
        };
        $cordovaDatePicker.show(projectOptions)
          .then(function(result) {
            modalScope.data.end = result;
          });
    });
  };


  modalScope.updateProject = function(id, title, desc, end, priority) {
    DataService.editProject(id, title, desc, end, priority)
      .then(function(result) {
        dataCtrl.modal.hide();
        modalScope.popover.hide();
        init();
      });
  };

  modalScope.openTagModal = function(id) {
    dataCtrl.projectId = id;
    $ionicModal.fromTemplateUrl('templates/modals/project/tag-people.html', {
      scope: modalScope,
      animation: 'fade-in-scale'
    }).then(function(modal) {
      DataService.getAllTaggedToProject(id)
        .then(function(result) {
          modalScope.project.people = result.data;
          console.log(result.data);
          modalScope.project.acceptedList = [];
          DataService.getFriendsList(userId)
            .then(function(result) {
              modalScope.friendsList = result.data;
              modalScope.friendsList.forEach(function(friend) {
                //pag sya yung naka login
                if(userId == friend.user_id) {
                  DataService.GetUserById(friend.friend_id)
                    .then(function(result) {
                      result.data[0].request_id = friend.id;
                      modalScope.project.acceptedList.push(result.data[0]);
                    });
                } else {
                  DataService.GetUserById(friend.user_id)
                    .then(function(result) {
                      result.data[0].request_id = friend.id;
                      modalScope.project.acceptedList.push(result.data[0]);
                    });
                }
              });
              console.log(modalScope.project.people);
              console.log(modalScope.project.acceptedList);
              dataCtrl.modal = modal;
              dataCtrl.modal.show();
            });

        });
    });
  };

  function getTagData() {
    DataService.getAllTaggedToProject(dataCtrl.projectId)
        .then(function(result) {
          modalScope.project.people = result.data;
          console.log(result.data);
          modalScope.project.acceptedList = [];
          DataService.getFriendsList(userId)
            .then(function(result) {
              modalScope.friendsList = result.data;
              modalScope.friendsList.forEach(function(friend) {
                //pag sya yung naka login
                if(userId == friend.user_id) {
                  DataService.GetUserById(friend.friend_id)
                    .then(function(result) {
                      result.data[0].request_id = friend.id;
                      modalScope.project.acceptedList.push(result.data[0]);
                    });
                } else {
                  DataService.GetUserById(friend.user_id)
                    .then(function(result) {
                      result.data[0].request_id = friend.id;
                      modalScope.project.acceptedList.push(result.data[0]);
                    });
                }
              });
            });
        });
  }

  modalScope.addTag = function(project_id, user_id) {
    for(i = 0; i < modalScope.project.people.length; i++) {
      if(modalScope.project.people[i].id1 == user_id) {
        return false;
      }
    }
    ProjectService.addTag(project_id, user_id)
      .then(function(result) {
        getTagData();
      });
  }

  modalScope.removeTag = function(tag_id) {
    ProjectService.removeTag(tag_id)
      .then(function(result) { getTagData() });
  }

  angular.extend(modalScope, dataCtrl);
  modalScope.userId = userId;
}
