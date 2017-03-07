/**
 * Created by admin on 2017/2/16.
 */
//我们可以自定服务，类似于$scope,$route,$routeProvider
angular.module('moviecatJsonpApp',[]).service('jsonpService', ['$window',function ($window) {
    this.jsonp= function (url,data,fn) {
        //生成一个随机的函数名
        var callbackName = 'jsonp'+new Date().getTime()+Math.random().toString().substr(2);
        //有一个全局函数，函数名是：
        $window[callbackName]= function (data) {
            fn(data);
            $window.document.body.removeChild(script)
        };
        //生成请求地址：
        //http://www.baidu.com?page=1&pagesize=10&callback=callbackName;
        //url:http://www.baidu.com
        //data:{page:1,pagesize:10}
        var url = url+"?";
        for(var key in data){
            url+=key+"="+data[key]+"&"
        }
        url+="callback="+callbackName;
        //新建一个script标签
        var script = document.createElement('script');
        script.src=url;
        //把新建的script标签插入body的末尾
        $window.document.body.appendChild(script);

    }
}])