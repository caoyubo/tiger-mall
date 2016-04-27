/**
 * <p>自定义初始化模块
 * <p>@author dragon
 * <p>@date 2015年7月7日
 * <p>@version 1.0
 */
var mainProvider = angular.module('Routing', ['ui.router',"BaseService"]);

/**
 * <p>自定义初始化服务
 * <p>@author dragon
 * <p>@date 2015年7月7日
 * <p>@version 1.0
 */
mainProvider.provider('router', function($stateProvider) {
	var urlCollection;
	this.$get = function($http, $state, $q ,baseService) {
		return {
			/**
			 * 获取菜单和碎片路由
			 */
			getMenusAndRoutes: function() {
				var deferred = $q.defer();

                var xhr = new XMLHttpRequest();
                xhr.open('POST',urlCollection,false);
                xhr.onload = function(e){
                    if(xhr.readyState === 4){
                        if(xhr.status === 200){
                            var result = JSON.parse(xhr.response);
                            if("0" != result.code){
                                deferred.reject(result.mes);
                            }
                            angular.forEach(result.data.routeUrlLists,
                                function(data, index, array) {
                                    $stateProvider.state(data.routeName, data.tmpurl)
                                });
                            deferred.resolve(result.data.menuList);
                        }else{
                            deferred.reject(xhr.statusText);
                        }
                    }
                };
                xhr.onerror = function (e) {
                    deferred.reject(xhr.statusText);
                };
                xhr.send(null);

				return deferred.promise;
			},
			/**
			 * 获取用户信息
			 */
			getUserInfo: function(url) {
				return baseService.webRequest(url,{},requestMethod.POST);
			},
			/**
			 * 所有系统
			 */
			getSyetems: function(url){
				return baseService.webRequest(url,{},requestMethod.POST);
			},
			/**
			 * 资源类型
			 */
			getResourceType: function(url){
				return baseService.webRequest(url,{},requestMethod.POST);
			},
			/**
			 * 获取所有资源
			 */
			getAllResource: function(url){
				return baseService.webRequest(url,{},requestMethod.POST);
			}
		}
	};
	/**
	 * 设置路由碎片页请求url
	 */
	this.setCollectionUrl = function(url) {
		urlCollection = url;
	}
});