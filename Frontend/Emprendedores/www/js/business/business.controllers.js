(function () {
  "use-strict";
  var app = angular.module('emprendedores');

  app.controller('BusinessCtrl', BusinessCtrl);
  BusinessCtrl.$inject = ['$scope'];

  function BusinessCtrl($scope) {
    $scope.go = function (path) {
      $state.go(path)
    }
  }

  app.controller('BusinessRegisterCtrl', BusinessRegisterCtrl);
  BusinessRegisterCtrl.$inject = ['$scope', '$state', 'BusinessService'];

  function BusinessRegisterCtrl($scope, $state, BusinessService) {
    var ctrl = this;
    ctrl.register = function () {
      BusinessService.register(ctrl.data)
        .then(function (result) {
          //status Ok
          if (result.status == 200) {
            $state.go('home.client');
          }
        })
        .catch(function (error) {
          $state.go('login');
        })
    }
  }

  app.controller('BusinessHomeCtrl', BusinessHomeCtrl);
  BusinessHomeCtrl.$inject = ['$scope', '$state', '$stateParams', '$ionicPopup', 'BusinessService', 'ProductService', 'SaleService'];

  function BusinessHomeCtrl($scope, $state, $stateParams, $ionicPopup, BusinessService, ProductService, SaleService) {
    var ctrl = this;
    ctrl.business = [];
    ctrl.business_url = $stateParams.business;
    BusinessService.getInfo($stateParams.business)
      .then(function (result) {
        ctrl.business.name = result.data.name;
        ctrl.business.description = result.data.description;
        console.log(result);
      });

    ProductService.retrieveBusinessProducts($stateParams.business)
      .then(function (result) {
        ctrl.products = ProductService.getProducts();
      });

    this.itemOnLongPress = function (indexProduct) {
      window.navigator.vibrate(40);
      showQuantityDialog().then(function (quantity) {
        SaleService.addProduct(ctrl.products[indexProduct], quantity);
      });
    }

    function showQuantityDialog() {
      return new Promise((resolve, reject) => {
        $scope.data = [];

        var myPopup = $ionicPopup.show({
          template: '<input type="number" ng-model="data.quantity">',
          title: 'Cantidad',
          subTitle: 'Ingrese cantidad de productos que desea agregar',
          scope: $scope,
          buttons: [
            {text: 'Cancelar'},
            {
              text: '<b>Aceptar</b>',
              type: 'button-positive',
              onTap: function (e) {
                if (!$scope.data.quantity) {
                  //don't allow the user to close unless he enters wifi password
                  e.preventDefault();
                } else {
                  return $scope.data.quantity;
                }
              }
            }
          ]
        });
        myPopup.then(function (res) {
          if (res) {
            resolve(res);
          }
        });
      });
    };
  }

  app.controller('ShoppingCartCtrl', ShoppingCartCtrl);

  function ShoppingCartCtrl() {
  }

  app.controller('SCartCheckoutCtrl', SCartCheckoutCtrl);
  SCartCheckoutCtrl.$inject = ['$scope', '$state', '$stateParams', 'BusinessService', 'ProductService', 'SaleService'];

  function SCartCheckoutCtrl($scope, $state, $stateParams, BusinessService, ProductService, SaleService) {
    var ctrl = this;
    ctrl.sale = SaleService.getSale();
    ctrl.business = [];
    ctrl.business_url = $stateParams.business;
    ctrl.business.name = ctrl.business_url;
    BusinessService.getInfo($stateParams.business)
      .then(function (result) {
        ctrl.business.name = result.data.name;
      })


    ctrl.proceed = function () {
      SaleService.proceedSale(ctrl.total(), ctrl.business_url)
        .then(function (result) {
          console.log(result);
          // ctrl.sale = SaleService.getSale();
          // ctrl.total();
          // $state.go($ionicHistory.backView().stateName);
        });
    }

    ctrl.total = function () {
      var total = 0;
      ctrl.sale.products.forEach(function (item) {
        total += item.price * item.quantity;
      })
      return total;
    }
  }

  app.controller('BClientRegisterCtrl', BClientRegisterCtrl);
  BClientRegisterCtrl.$inject = ['$scope', '$cookies', '$stateParams', '$state', '$window','BusinessService'];

  function BClientRegisterCtrl($scope, $cookies, $stateParams, $state, $window, BusinessService) {
    $scope.data = {};
    $scope.register = function () {
      BusinessService.userRegister($scope.data, $stateParams.business)
        .success(function (data, status, headers, config) {
          console.log("Registro");
          token = String('Token ') + data['token'];
          $cookies.put('csrftoken', data['csrftoken']);
          $cookies.put('sessionid', token);
          $state.go('business-home', {'business': $stateParams.business})
          location.reload();
        });
    }
  }


})();
