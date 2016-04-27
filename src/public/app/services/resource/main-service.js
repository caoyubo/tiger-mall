/**
 * <p>资源模块与服务
 * <p>@author dragon
 * <p>@date 2015年7月7日
 * <p>@version 1.0
 */
var resourceMainModule = angular.module("resourceMainModule", ["BaseService"]);
resourceMainModule.provider("resourceMain", function(){
	
	this.$get = function($http, $q , baseService) {
		return {
			/**
			 * 获取resource页面数据
			 */
			getResourcePage: function(pageData){
				return baseService.webRequest(grobalUrl.resourceTable,pageData,requestMethod.POST);
			},
			/**
			 * 删除resource数据
			 */
			deleteById: function(deleteData){
				return baseService.webRequest(grobalUrl.resourceDelete,deleteData,requestMethod.POST);
			},
			/**
			 * 提交添加资源表单
			 */
			addSubmit: function(addFormData) {
				return baseService.webRequest(grobalUrl.resourceAdd,addFormData,requestMethod.POST);
			},
			/**
			 * 更新
			 */
			updateSubmit: function(addFormData) {
				return baseService.webRequest(grobalUrl.resourceUpdate,addFormData,requestMethod.POST);
			}
		};
	};
});











