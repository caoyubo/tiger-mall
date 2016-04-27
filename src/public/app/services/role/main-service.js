/**
 * <p>角色模块与服务
 * <p>@author dragon
 * <p>@date 2015年7月7日
 * <p>@version 1.0
 */
var roleMainModule = angular.module("roleMainModule", ["BaseService"]);
roleMainModule.provider("roleMain", function(){

	this.$get = function($http, $q , baseService) {
		return {
			/**
			 * 获取resource页面数据
			 */
			getRolePage: function(pageData){
				return baseService.webRequest(grobalUrl.roleTable,pageData,requestMethod.POST);
			},
			/**
			 * 删除resource数据
			 */
			deleteById: function(deleteData){
				return baseService.webRequest(grobalUrl.roleDelete,deleteData,requestMethod.POST);
			},
			/**
			 * 提交添加资源表单
			 */
			addSubmit: function(addFormData) {
				return baseService.webRequest(grobalUrl.roleAdd,addFormData,requestMethod.POST);
			},
			/**
			 * 更新
			 */
			updateSubmit: function(addFormData) {
				return baseService.webRequest(grobalUrl.roleUpdate,addFormData,requestMethod.POST);
			},
			/**
			 * 查询树
			 */
			findTree: function(data) {
				return baseService.webRequest(grobalUrl.resourceTree,data,requestMethod.POST);
			},
			/**
			 * 绑定
			 */
			bindResource: function(data) {
				return baseService.webRequest(grobalUrl.resourceBind,data,requestMethod.POST);
			},
			/**
			 * enable
			 */
			enableRole: function(data) {
				return baseService.webRequest(grobalUrl.enableRole,data,requestMethod.POST);
			}

		};
	};
});






