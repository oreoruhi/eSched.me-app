angular.module('eSchedMe')
  .controller('ModuleCtrl', ModuleCtrlFunction)

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
    _.each(vm.myModules, function(obj) {
      obj.end = moment(obj.end).format('ll');
      obj.start = moment(obj.start).format('ll');
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
        if(vm.project.user.data.id == vm.user.id){
          vm.myModules = vm.modules;
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
        vm.availablePercentage = 100;
        _.each(vm.myModules, function(obj) {
          obj.end = moment(obj.end).format('ll');
          obj.start = moment(obj.start).format('ll');
          console.log(obj.percentage);
          vm.availablePercentage -= obj.percentage;
        });
      });
  }


  function refreshPercentage() {
    vm.availablePercentage = 100;
    _.each(vm.myModules, function(obj) {
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
          vm.myModules.push(result);
          $log.info(vm.myModules);
          refreshPercentage();
        }
      });
  };

  vm.showOptions = function ($event, module) {
    console.log('clicked');
    appPopoverService.show('templates/events/module-popover.html', 'ModuleModalCtrl as vm', $event, module)
      .then(function (result) {
        if(!result) return;
        if(result.message === "Module Deleted!") {
          vm.myModules = _.reject(vm.myModules, function (el) {
            return el.id == result.module.data.id;
          });
          refreshPercentage();
        }
      });
  }

  vm.completeModule = function(module) {
    console.log(module);
    ModuleData.update({module: module.id}, {status: "completed"},
      function(resp, header) {
        if(resp.message === 'Module Updated!') {
          refreshData();
          if(module.submodules) {
            module.submodules.data.forEach(function(submodule) {
              SubmoduleService.update({submodule: submodule.id}, {status: "completed"});
            });
          }
        }
        refreshData();
      }
    );
  };


  vm.markAsOngoing = function (module) {
    console.log(module);
    module.end = moment(module.end).format('ll');
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
