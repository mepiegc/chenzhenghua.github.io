/**
 * Created by admin on 2017/2/16.
 */
var app = angular.module('detailApp',['moviecatJsonpApp']);
app.controller('detailController',['$scope','jsonpService','$routeParams', function ($scope,jsonpService,$routeParams) {
    jsonpService.jsonp('http://api.douban.com/v2/movie/subject/'+$routeParams.id,{}, function (data) {
        $scope.data = data;
        $scope.$apply()
    })
}])