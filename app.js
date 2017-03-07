(function (angular) {
    "use strict";

    // start your ride
    var moviecatApp =angular.module('moviecatApp',['ngRoute','homePageApp','movieTypeApp','detailApp','autoApp']);
    moviecatApp.config(['$routeProvider', function ($routeProvider) {
        $routeProvider.when('/home_page',{
            templateUrl:'home_page/view.html',
            controller:'homePageController'
        }).when('/details/:id',{
            templateUrl:'detail/view.html',
            controller:'detailController'
        }).when('/:movieType/:page?',{
            templateUrl:'movieType/view.html',
            controller:'movieTypeController'
        }).otherwise({
            redirectTo:'home_page'
        })
    }])
     moviecatApp.controller('moviecatController',['$scope','$location', function ($scope,$location) {
        $scope.word="";
        $scope.search= function () {
            $location.url('/search?q='+$scope.word)
        }
    }])
    
})(angular);