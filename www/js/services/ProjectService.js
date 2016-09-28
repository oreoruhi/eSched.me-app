angular.module('eSchedMe')
.factory('ProjectService', [
    '$http',
    ProjectService
  ]);



function ProjectService($http, $state) {
  var project = {};

  project.setData = function(project) {
    project.data = project;
  }

  project.openProjectModules = function(project) {
    console.log(project);
  }



  return project;
};
