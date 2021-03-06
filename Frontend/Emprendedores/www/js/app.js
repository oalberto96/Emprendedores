(function() {
var app = angular.module('emprendedores', ['ionic','chart.js','ngCookies'])

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

  .state('home', {
    url: "/home",
    abstract: true,
    templateUrl: "templates/home.html",
  })

  .state('home.graph',{
    url: '/graph',
    views: {
      'graph': {
        templateUrl: 'templates/graph/graphs.html',
        //controller: 'GraphGetCtrl'
      }
    }
  })  

  .state('home.reports',{
    url: '/reports',
    views: {
      'graph': {
        templateUrl: 'templates/graph/reports.html',
        //controller: 'GraphGetCtrl'
      }
    }
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

  .state('home.addClient', {
    url: '/client/add',
    views: {
      'clients': {
        templateUrl: 'templates/client/add-client.html',
        controller: 'ClientAddCtrl'
      }
    }
  })

  .state('home.retrieveClient', {
    url: '/clients/:clientId',
    views: {
      'clients': {
        templateUrl: 'templates/client/get-client.html',
        controller: 'ClientGetCtrl'
      }
    }
  })

  .state('home.sale', {
    url: '/sales',
    views: {
      'sales': {
        templateUrl: 'templates/sale/sales.html',
        controller: 'SalesCtrl'
      }
    }
  })
 
  .state('home.addSale', {
    url: '/sales/add',
    views: {
      'sales': {
        templateUrl: 'templates/sale/add-sale.html',
        controller: 'SalesCtrl'
      }
    }
  })

  .state('home.retrieveSale', {
    url: '/sales/:saleId',
    views: {
      'sales': {
        templateUrl: 'templates/sale/get-sale.html',
        controller: 'SalesCtrl'
      }
    }
  })


  .state('home.thanksSale', {
    url: '/sales/thanks',
    views: {
      'sales':{
        templateUrl: 'templates/sale/gracias.html',
        controller: 'SalesCtrl'
      }
    }
  })





  .state('home.product', {
    url: '/products',
    views: {
      'products': {
        templateUrl: 'templates/product/products.html',
        controller: 'ProductCtrl'
      }
    }
  })

  .state('home.addProduct', {
    url: '/product/add',
    views: {
      'products': {
        templateUrl: 'templates/product/add-product.html',
        controller: 'ProductAddCtrl'
      }
    }
  })

  .state('home.retrieveProduct', {
    url: '/products/:productId',
    views: {
      'products': {
        templateUrl: 'templates/product/get-product.html',
        controller: 'ProductGetCtrl'
      }
    }
  })

  .state('services', {
    url: "/services",
    templateUrl: "templates/account/services.html",
    controller: 'AccountCtrl'
  })

  .state('services-pay', {
    url: "/services/:serviceId",
    templateUrl: "templates/account/services-pay.html",
    controller: 'AccountCtrl'
  })

  .state('register-business', {
    url: "/business/register",
    templateUrl: "templates/business/business-register.html",
    controller: 'BusinessCtrl'
  })

  .state('business-home', {
    url: "/:business",
    templateUrl: "templates/business/business-home.html",
    controller: "BusinessCtrl"
  })

  .state('business-shopping', {
    url: "/:business/shopping-cart",
    templateUrl: "templates/business/business-shopping.html",
    controller: "BusinessCtrl"
  })

  .state('business-thanksSale', {
    url: '/:business/sale/thanks',
    templateUrl: 'templates/sale/gracias.html',
    controller: 'BusinessCtrl'
  })

  .state('business-client-register', {
    url: "/:business/register",
    templateUrl: "templates/business/business-client-register.html",
    controller: "BusinessCtrl"
  })

  .state('business-client-login', {
    url: "/:business/login",
    templateUrl: "templates/business/business-client-login.html",
    controller: "BusinessCtrl"
  })


  .state('home.profile', {
    url: '/profile',
    views: {
      'profile': {
        templateUrl: 'templates/profile/profile.html',
        controller: 'ProfileGetCtrl'
      }
    }
  })

  .state('home.about', {
    url: '/about',
    views: {
      'profile': {
        templateUrl: 'templates/profile/about.html',
        controller: 'ProfileGetCtrl'
      }
    }
  })

  .state('home.help', {
    url: '/help',
    views: {
      'profile': {
        templateUrl: 'templates/profile/help.html',
        controller: 'ProfileGetCtrl'
      }
    }
  })      

  $urlRouterProvider.otherwise('/login');

})

})();

