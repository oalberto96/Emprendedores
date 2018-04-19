(function() {
var app = angular.module('emprendedores', ['ionic','ngCookies']);

app.run(function($ionicPlatform, $http, $cookies) {
  $http.defaults.xsrfHeaderName = 'X-CSRFToken';
  $http.defaults.xsrfCookieName = 'csrftoken';
  $http.defaults.headers.common.Authorization = $cookies.get('sessionid');

  $ionicPlatform.ready(function() {
    if(window.cordova && window.cordova.plugins.Keyboard) {
      // Hide the accessory bar by default (remove this to show the accessory bar above the keyboard
      // for form inputs)
      cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);

      // Don't remove this line unless you know what you are doing. It stops the viewport
      // from snapping when text inputs are focused. Ionic handles this internally for
      // a much nicer keyboard experience.
      cordova.plugins.Keyboard.disableScroll(true);
    }
    if(window.StatusBar) {
      StatusBar.styleDefault();
    }
  });
})

app.config(function ($stateProvider, $urlRouterProvider) {
  $stateProvider

  .state('home', {
    url: "/home",
    abstract: true,
    templateUrl: "templates/home.html",
  })

  .state('home.client', {
    url: '/clients',
    views: {
      'clients': {
        templateUrl: 'templates/client/clients.html',
        controller: 'ClientCtrl'
      }
    }
  })

  .state('home.product', {
    url: '/products',
    views: {
      'products': {
        templateUrl: 'templates/products.html',
        controller: 'ProductCtrl'
      }
    }
  })

  $stateProvider
  .state('login', {
    url: "/login",
    templateUrl: "templates/account/login.html",
    controller: 'LoginCtrl'
  })

  .state('register', {
    url: "/register",
    templateUrl: "templates/account/register.html",
    controller: 'RegisterCtrl'
  })

  $urlRouterProvider.otherwise('/home/clients');

})

})();

