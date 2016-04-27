/**
 * Created by dragon on 15-6-24.
 * 全局配置
 */

var grobalSystems;//=["超级管理后台","财务对账系统","视频管理系统"];
var grobalMenuType;//=["一级菜单","二级菜单","按钮","开关","资源"];

/**
 * 全局请求url
 */
var grobalUrl={
	userInfo:"user/info",						//用户信息
	userMenu:"/admin/api/ui_config/menu",		//用户菜单
	
	resourceTable:"permission/resource/main",	//用户资源表格,分页查询
	resourceAdd:"permission/resource/add",		//添加资源
	resourceDelete:"permission/resource/delete",//删除资源
	resourceUpdate:"permission/resource/update",//更新资源
	
	roleTable:"permission/role/main",			//分页查询
	roleAdd:"permission/role/add",				//添加角色
	roleUpdate:"permission/role/update",		//更新角色
	roleDelete:"permission/role/delete",		//删除角色
	resourceTree:"permission/role/tree",		//查询权限树
	resourceBind:"permission/role/bind",		//绑定角色权限
	enableRole:"permission/role/enable",		//启用|禁用角色
		
	userTable:"permission/user/main",			//分页查询

    project_search : "/admin/api/project/project_list",
    project_edit    : "/admin/api/project/edit",
    project_add     : "/admin/api/project/add",
    project_delete  : "/admin/api/project/delete",

};

var grobalConfig = {
    default_router  : '/index',
    controller_path : '/app/controllers/',
    controller      : [
        'global-controller.js',
        'dictionary/dictionary.js',
        'project/project-controller.js',
        'role/main-controller.js',
        'resource/main-controller.js',
        'team/team.js',
        'team/deparment.js',
        'user/main-controller.js'
    ],
    directives_path  : '/app/directives/',
    directives       : [
        'global-directive.js',
        'dictionary.js'
    ],
    filters_path     : '/app/filters/',
    filters          : [
        'global-filter.js',
    ],
    services_path    : '/app/services/',
    services         : [
        'global-service.js',
        'base-service.js',
        'project/project.js',
        //'dictionary/dictionary-service.js',
        'team/team.js'
    ]
};

/**
 * HTTP请求方式
 */
var requestMethod={
	POST:"POST",
	GET:"GET",
	PUT:"PUT",
	DELETE:"DELETE",
	HEAD:"HEAD",
	OPTION:"OPTION"
};

