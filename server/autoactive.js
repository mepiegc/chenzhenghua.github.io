/**
 * Created by admin on 2017/2/17.
 */
var app = angular.module('autoApp',[]);
app.directive('autoActive', ['$location',function ($location) {
    return {
        link: function (scope,ele,attr) {
            scope.loca = $location;
            scope.$watch('loca.url()', function (newVal,oldVal) {
                var urlStr = ele.children()[0].href.split("#")[1];
                if(newVal.startsWith(urlStr)){
                    ele.parent().children().removeClass('active');
                    ele.addClass('active');
                }
            })
        }
    }
}])
