var app = angular.module("app", ['ngMaterial'])
app.config(($mdIconProvider) => {
	$mdIconProvider
		.iconSet("call", "img/icons/account-card-details.svg", 24)
})

app.controller("mainCtrl", ($scope) => {
	$scope.list = ["Test123", "test2", "test3"]
	$scope.itemMouseEnter = (item) => {
		
		$(item).toggleClass("hover", true)
	}
})