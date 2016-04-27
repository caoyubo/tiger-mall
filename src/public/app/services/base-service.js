/**
 * <p>自定义基础模块 自定义基础服务
 * <p>@author dragon
 * <p>@date 2015年7月7日
 * <p>@version 1.0
 */
var baseService = angular.module('BaseService', []);
baseService.factory("baseService",['$http','$q', function($http,$q) {
	return {
		webRequest: function(url, params, method) {
			var deferred = $q.defer();
			var request;
			if(requestMethod.POST == method){
				request = $http.post(url,params);
			}
			
			if(requestMethod.GET == method){
				url = getUrl(url,params);
				request = $http.get(url);
			}
			
			request.success(function(data, status, headers, config) {
				//if("0" != data.code || "1111111" == data.code){
				//	deferred.reject(data);
				//	return;
				//}
				deferred.resolve(data);
			}).error(function(data, status, headers, config) {
				deferred.reject(data);
			});
			
			return deferred.promise;
		}
	}
}]);