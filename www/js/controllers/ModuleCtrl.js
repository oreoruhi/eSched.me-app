angular.module('eSchedMe')
  .controller('ModuleCtrl', ModuleCtrlFunction)
  .controller('ModuleModalCtrl', ModalCtrlFunction);

function ModuleCtrlFunction(
  appModalService,
  appPopoverService,
  ProjectData,
  ModuleData,
  SubmoduleService,
  $stateParams,
  $state,
  $log,
  $ionicHistory,
  API,
  _
  ) {

  var vm = this;
  vm.taggedModules = [];

  init();


  function init() {
    vm.maxPercentage = 100;
    vm.availablePercentage = 100;
    console.log("Initializing Module Controller.");
    console.log($stateParams.project);
    console.log($stateParams.module);
    vm.project = $stateParams.project;
    vm.modules = $stateParams.module;
    console.log("yung nagchecheck ng tagged");
    console.log(vm.modules);
    vm.user = JSON.parse(window.localStorage.getItem('user'));

    if(vm.project.user.data.id == vm.user.id){
      vm.myModules = $stateParams.module;
    } else {
      vm.myModules = [];
      vm.modules.forEach(function(module){
        console.log(module);
        module.tagged.data.forEach(function(user){
          if(user.id == vm.user.id){
            vm.myModules.push(module);
          }
        });
      });
    }
    _.each(vm.modules, function(obj) {
      obj.end = new Date(obj.end).toISOString();
      obj.start = new Date(obj.start).toISOString();
      console.log(obj.percentage);
      vm.availablePercentage -= obj.percentage;
      console.log("chenaboo sa loob ng obj");
      console.log(obj.tagged);
      console.log(vm.user);
    });
    refreshData();
  }

  function refreshData() {
    ProjectData.get({project: $stateParams.project.id},
      function (resp, header) {
        console.log(resp);
        vm.project = resp.data;
        vm.modules = resp.data.modules.data;
        vm.availablePercentage = 100;
        _.each(vm.modules, function(obj) {
          obj.end = new Date(obj.end).toISOString();
          obj.start = new Date(obj.start).toISOString();
          console.log(obj.percentage);
          vm.availablePercentage -= obj.percentage;
        });
      });
  }


  function refreshPercentage() {
    vm.availablePercentage = 100;
    _.each(vm.modules, function(obj) {
      console.log(vm.availablePercentage);
      vm.availablePercentage -= obj.percentage;
      console.log(vm.availablePercentage);
    });
  }

  vm.createModule = function () {
    vm.project.availablePercentage = vm.availablePercentage;
    console.log(vm.availablePercentage);
    appModalService.show('templates/modals/module/create-module.html', 'ModuleModalCtrl as vm', vm.project)
      .then(function (result) {
        if(result) {
          $log.info(result);
          //vm.modules = _.union(vm.modules, [result]);
          refreshData();
          $log.info(vm.modules);
          refreshPercentage();
          $state.reload();
        }
      });
  };

  vm.showOptions = function ($event, module) {
    console.log('clicked');
    appPopoverService.show('templates/events/module-popover.html', 'ModuleModalCtrl as vm', $event, module)
      .then(function (result) {
        if(!result) return;
        if(result.message === "Module Deleted!") {
          vm.modules = _.reject(vm.modules, function (el) {
            return el.id == result.module.data.id;
          });
          refreshPercentage();
          $state.reload();
        }
      });
  }

  vm.completeModule = function(module) {
    console.log(module);
    ModuleData.update({module: module.id}, {status: "completed"},
      function(resp, header) {
        if(resp.message === 'Module Updated!') {
          module.submodules.data.forEach(function(submodule) {
            SubmoduleService.update({submodule: submodule.id}, {status: "completed"});
          });
        }
        $state.reload();
      }
    );
  };


  vm.markAsOngoing = function (module) {
    console.log(module);
    module.end = new Date(module.end);
    appModalService.show('templates/modals/module/mark-as-ongoing.html', 'ModuleModalCtrl as vm', module)
      .then(function (result) {
        if (!result) {
          vm.closePopover();
          $state.reload();
        } else {
          module.submodules.data.forEach(function(submodule) {
            SubmoduleService.update({submodule: submodule.id}, {status: "ongoing"});
          });
          vm.closePopover();
        }
      });
  }

}

function  ModalCtrlFunction(ModuleData, parameters, appModalService, $state, $scope, $ionicModal, ProjectData, $http, API) {
  // parameters is the project for this module
  var vm = this;
  vm.module=parameters;
  vm.edit = parameters;
  if(parameters.availablePercentage) vm.availablePercentage = parameters.availablePercentage;
  if(!parameters.user) {
      $scope.end = new Date(parameters.end);
      $scope.start = new Date(parameters.start);
  }
  vm.editModule = function () {
    appModalService.show('templates/modals/module/edit-module.html', 'ModuleModalCtrl as vm', parameters)
      .then(function (result) {
        if (!result) {
          vm.closePopover();
          $state.reload();
        } else {
          vm.closePopover();
        }
      });
  };

  vm.tagPeople = function (module) {
    console.log(module);
    ProjectData.get({project: module.activty_id}, function (resp, header) {
      console.log(resp);
      console.log(module.tagged.data)
      $scope.allTagged = resp.data.tagged.data;
      $ionicModal
        .fromTemplateUrl('templates/modals/module/tag-people.html', function (modal) {
          $scope.module = module;
          $scope.tagged = filterFriends($scope.allTagged, module.tagged.data);
          $scope.module.start = new Date(module.start);
          $scope.module.end = new Date(module.end);
          $scope.closeModal = vm.closeModal;
          $scope.addTag = vm.addTag;
          $scope.unTag = vm.unTag;
          vm.modal = modal;
          vm.modal.show();
        }, {
          scope: $scope,
          animation: 'fade-in-scale'
        });
    });
  };

  vm.addTag = function (module_id, user_id) {
    $http({
      method: 'POST',
      url: API.URL + '/api/v1/module/' + module_id + '/tag',
      data: {
        "user_id": user_id
      }
    }).then(function (result) {
      $scope.module = result.data.module.data;
      $scope.tagged = filterFriends($scope.tagged, $scope.module.tagged.data);
      console.log(result);
    })
  };

  vm.unTag = function (module_id, user_id) {
    $http({
      method: 'POST',
      url: API.URL + '/api/v1/module/' + module_id + '/untag',
      data: {
        "user_id": user_id
      }
    }).then(function (result) {
      console.log(result);
      $scope.module = result.data.module.data;
      $scope.tagged = filterFriends($scope.allTagged, $scope.module.tagged.data);
    })
  };

  vm.closeModal = function () {
    vm.modal.hide();
  };

  vm.updateModule = function (start, end) {
    vm.edit.start = start;
    vm.edit.end = end;
    vm.edit.status = "ongoing";
    ModuleData.update({module: parameters.id}, vm.edit,
    function (resp,header) {
      vm.closeModal(resp);
    },
    function (error) {
      console.log(error)
    });

  };

  vm.deleteModule = function () {
    ModuleData.delete({module: parameters.id},
      function (resp,header) {
        console.log(resp);
        vm.closePopover(resp);
      },
      function (error) {
        console.log(error);
      });
  };

  vm.saveModule = function (start, end) {
    ModuleData.save({
      'activity_id': parameters.id,
      'title': vm.modal.name,
      'percentage': vm.modal.percentage,
      'description': vm.modal.description,
      'risk': vm.modal.risk,
      'start': start,
      'end': end,
      'status': 'ongoing',
      'priority': vm.modal.priority
    }, function (resp, headers) {
      console.log(resp);
      vm.closeModal(resp);
    }, function (error) {
      console.log(error);
    });
  };

  function filterFriends(friends, tagged) {
    var taggedId = {};

    tagged.forEach(function (obj) {
      taggedId[obj.id] = obj;
    });

    return friends.filter(function (obj) {
      return !(obj.id in taggedId);
    })
  }
}
