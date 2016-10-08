(function() {
  "use strict";


  angular.module('eSchedMe')
    .controller('ProfileCtrl', profileCtrl);



  function profileCtrl(
    $state,
    $log,
    DataService,
    $cookieStore
  ) {

    var self = this;

    self.userId = $cookieStore.get('userId');

    self.id = $state.params.id;

    function init() {
      DataService.GetUserById(self.id)
        .then(function(result) {
          self.user = result.data;
          $log.info(self.userId + '     ' + self.id);
        });
    }

    init();
  }

})();
