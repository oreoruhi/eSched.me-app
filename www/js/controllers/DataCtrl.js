/*angular.module('SimpleRESTIonic.controllers')

    .controller('DataCtrl', function (Backand, $state, $rootScope, DataService) {
        var vm = this;

        Backand.getUserDetails()
            .then(function(result) {
                console.log(result);
            });

        vm.GetUsersById = function(id) {
            DataService.GetUsersById(id)
                .then(function(result) {
                    console.log(result);
                });
        }

    }); */