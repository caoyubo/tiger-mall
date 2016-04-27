/**
 * <p>资源模块与服务
 * <p>@author dragon
 * <p>@date 2015年7月7日
 * <p>@version 1.0
 */
var projectMainModule = angular.module("projectMainModule", ["BaseService"]);
projectMainModule.provider("projectProvider", function(){
	
	this.$get = function($http, $q , baseService) {
		return {

			/**
			 * 提交
			 */
			search_submit: function(data) {
				//alert(getUrl(grobalUrl.project_search,data))
				return baseService.webRequest(grobalUrl.project_search,data,requestMethod.GET);
			},

			/**
			 * 增加
			 */
			add_submit : function(data){
				return baseService.webRequest(grobalUrl.project_add,data,requestMethod.POST);
			},

			/**
			 * 编辑
			 */
			edit_submit : function(data){
				return baseService.webRequest(grobalUrl.project_edit,data,requestMethod.POST);
			},

			/**
			 * 删除
			 */
			delete_submit : function(data){
				return baseService.webRequest(grobalUrl.project_delete,data,requestMethod.POST);
			},

			/**
			 * 得到增加或编辑时所需要的数据
			 */
			get_data : function(data){
				return baseService.webRequest('/admin/api/project/add_data',data,requestMethod.GET);
			}

		};
	};
});













