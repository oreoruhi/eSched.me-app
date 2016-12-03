angular.module('eSchedMe')
  .config(function ($stateProvider) {
    $stateProvider
      .state('signup', {
        url: '/signup',
        templateUrl: 'templates/signup.html',
        controller: 'SignUpCtrl as signup'
      })

      .state('login', {
        // cache: false,
        url: '/',
        templateUrl: 'templates/signin.html',
        controller: 'LoginCtrl as login'
      })

      .state('signup-form', {
        url: '/signup-form',
        templateUrl: 'templates/signup-form.html',
        controller: 'SignUpCtrl as vm'
      })

      .state('dashboard', {
        // cache: false,
        url: '/dashboard',
        abstract: true,
        templateUrl: 'templates/dashboard.html',
        controller: 'DataCtrl as dataCtrl',
        data: {
          //role: 'User'
        }
      })

      .state('dashboard.newsfeed', {
        url: '/newsfeed',
        views: {
          'menuContent': {
            templateUrl: 'templates/newsfeed.html'
          }
        }
      })

      .state('dashboard.profile', {
        // cache: false,
        url: '/profile/:id',
        views: {
          'menuContent': {
            templateUrl: 'templates/profile.html'
          }
        }
      })
      .state('dashboard.otheruser', {
        url: '/user/:id',
        views: {
          'menuContent': {
            templateUrl: 'templates/other-users.html'
          }
        }
      })

      .state('dashboard.project', {
        url: '/project',
        views: {
          'menuContent': {
            templateUrl: 'templates/project.html'
          }
        }
      })

      .state('dashboard.submodule', {
        // cache: false,
        url: '/submodule/:id',
        controller: 'SubmoduleCtrl',
        controlerAs: 'ctrl',
        views: {
          'menuContent': {
            templateUrl: 'templates/submodule.html'
          }
        }
      })

      .state('dashboard.timeline', {
        url: '/timeline',
        controller: 'MapCtrl',
        views: {
          'menuContent': {
            templateUrl: 'templates/timeline.html'
          }
        }
      })

      .state('dashboard.module', {
        // cache: false,
        url: '/module',
        controller: 'ModuleCtrl as moduleCtrl',
        // params: {
        //   project: null
        // },
        views: {
          'menuContent': {
            templateUrl: 'templates/module.html'
          }
        }
      })

      .state('dashboard.friend', {
        // cache: false,
        url: '/friend',
        views: {
          'menuContent': {
            templateUrl: 'templates/friend.html'
          }
        }
      })

      .state('dashboard.notification', {
        // cache: false,
        url: '/notification',
        views: {
          'menuContent': {
            templateUrl: 'templates/notification.html'
          }
        }
      })

      .state('dashboard.inbox', {
        // cache: false,
        url: '/inbox',
        views: {
          'menuContent': {
            templateUrl: 'templates/inbox.html'
          }
        }
      })

      .state('dashboard.chat', {
        // cache: false,
        url: '/chat',
        views: {
          'menuContent': {
            templateUrl: 'templates/chat-detail.html'
          }
        }
      })

      .state('dashboard.groupchat', {
        // cache: false,
        url: '/groupchat',
        views: {
          'menuContent': {
            templateUrl: 'templates/chat-detail-group.html'
          }
        }
      });
  });
