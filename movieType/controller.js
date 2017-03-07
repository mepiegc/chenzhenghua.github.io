/**
 * Created by admin on 2017/2/16.
 */
var movieTypeApp = angular.module('movieTypeApp',['moviecatJsonpApp']);
movieTypeApp.controller('movieTypeController',['$scope','$http','jsonpService','$routeParams','$route',function ($scope,$http,jsonpService,$routeParams,$route) {
    $scope.flag = true;
    $scope.count=10;
    $scope.page = $routeParams.page ||1;
    $scope.word = $routeParams.q ||"";
    //  page start
    //  1       0
    //  2      10
    //  3      20
    $scope.start = ($scope.page-1)*$scope.count;
    jsonpService.jsonp('http://api.douban.com/v2/movie/'+$routeParams.movieType,{count:$scope.count,start:$scope.start,q:$scope.word}, function (data) {
        $scope.flag = false;
        $scope.data = data;       
        $scope.totalPage = Math.ceil($scope.data.total/$scope.count);
        if($scope.page<1){
            $route.updateParams({page:1})
        }else if($scope.page>$scope.totalPage){
            $route.updateParams({page:$scope.totalPage})
        }
        console.log(data);
        $scope.subjects= data.subjects;
        $scope.$apply();
    });
    $scope.prev= function () {
        if($scope.page>1){
            $route.updateParams({page:--$scope.page})
        }
    };
    $scope.next= function () {
        if($scope.page<$scope.totalPage){
            $route.updateParams({page:++$scope.page})
        }
    };
}])