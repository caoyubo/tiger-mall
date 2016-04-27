

mainApp.provider("teamProvider", function(){
	
	this.$get = function($http, $q , baseService) {
		return {


			/**
			 * 列表
			 */
			get_list : function (data){
				return baseService.webRequest('/admin/api/team/team_list',data,requestMethod.GET);
			},

			/**
			 * 提交
			 */
			search_submit : function(data) {
				return baseService.webRequest('/admin/api/team/team_list',data,requestMethod.GET);
			},

			/**
			 * 增加
			 */
			add_submit : function(data){
				return baseService.webRequest('/admin/api/team/add',data,requestMethod.POST);
			},

			/**
			 * 编辑
			 */
			edit_submit : function(data){
				return baseService.webRequest('/admin/api/team/edit',data,requestMethod.POST);
			},

			/**
			 * 删除
			 */
			delete_submit : function(data){
				return baseService.webRequest('/admin/api/team/delete',data,requestMethod.POST);
			}

		};
	};
});













