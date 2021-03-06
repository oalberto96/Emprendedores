(function () {
"use-strict";

var app = angular.module('emprendedores');

app.controller('ReportGetCtrl', ReportGetCtrl);
ReportGetCtrl.$inject = ['$scope', '$stateParams','$ionicHistory', '$state',  'ReportService'];

function ReportGetCtrl($scope, $stateParams, $ionicHistory, $state,  ReportService){
	ctrl = this;

	this.retrieveReport = function () {

		ReportService.retrieveReport()
		.success(function(result){
			ctrl.cant = result.cant;
			if(result.total){
				ctrl.total = result.total;
			} else{
				ctrl.total = "0";
			}
		});
	}
	this.retrieveReport();
}
})();