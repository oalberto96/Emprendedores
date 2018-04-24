(function(){
	"use-strict";
var app = angular.module('emprendedores');

app.controller('ProductListCtrl', ProductListCtrl);
ProductListCtrl.$inject = ['$scope','$state','ProductService'];

function ProductListCtrl($scope,$state, ProductService){

	clientList = this;

	clientList.go = function(path){
		$state.go(path);
	}

	ProductService.retrieveProducts();
	this.products = ProductService.getProducts();
}


})();