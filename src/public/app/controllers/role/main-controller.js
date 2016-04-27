/**
 * <p>角色控制器
 * <p>@author dragon
 * <p>@date 2015年7月7日
 * <p>@version 1.0
 */
mainApp.controller("RoleMainController", function($scope,roleMain){
	/**初始化树**/
	resourceDataLoad(0,roleMain);

	$scope.resourceMap = {};
	$scope.loadResourceTree = function(){
		roleMains = roleMain;
		treeLoad($scope);
	};


	/**
	 * 初始化页面
	 */
	refreshRolePage($scope,roleMain,null,null);

	/**
	 * 跳转页面
	 */
	$scope.PageSkip = function(currentPage, pageSize){
		refreshRolePage($scope,roleMain,currentPage,pageSize);
	};

	/**
	 * 添加
	 */
	$scope.formData={};
	$scope.addSubmit = function(){

		roleMain.addSubmit($scope.formData)
		.then(function(data){
			$("#roleModal").modal("hide");

			//alert(data.mes);

			//刷新页面
			refreshRolePage($scope,roleMain,null,null);

			//添加映射
			var idlist = new Array();

			angular.forEach($scope.resourceMap,
			function(data, index, array) {
				if(0!=data.pid){
					idlist.push(data.pid);
				}
				idlist.push(data.id);
			});

			var bindParams = {
					"uid":{},
					"id":$scope.formData.id,
					"resourceId":idlist,
					"roleId":$scope.formData.role
					};
			bindRoleResource(roleMain,bindParams);

			$scope.formData = {};
		},function(err){
	        console.log(err);
	        //alert(err.mes);
	    });
	}

	/**
	 * 删除
	 */
	$scope.deleteById = function(role){
		roleMain.deleteById({"id":role.id})
		.then(function(data){
			//alert(data.mes);
			refreshRolePage($scope,roleMain,null,null);
		},function(err){
	        console.log(err);
	        //alert(err.mes);
	    });
	}

	/**
	 * 更新
	 */
	$scope.update = function(role){
		$scope.formData = role;
	}
	$scope.updateSubmit = function(){
		roleMain.updateSubmit($scope.formData)
		.then(function(data){
			$("#roleUpdateModal").modal("hide");
			$scope.formData = {};
			//alert(data.mes);
			refreshRolePage($scope,roleMain,null,null);
		},function(err){
	        console.log(err);
	        //alert(err.mes);
	    });
	}

	/**
	 * 禁止|启动
	 */
	$scope.enableRole = function(enable,id){
		roleMain.enableRole({"id":id,"enable":enable})
		.then(function(data){
			//alert(data.mes);
			refreshRolePage($scope,roleMain,null,null);
		},function(err){
	        console.log(err);
	        //alert(err.mes);
	    });
	}



});

/* -------------------------内置方法------------------------- */
/**
 * 绑定关系
 */
function bindRoleResource(roleMain,bindParams){
	roleMain.bindResource(bindParams)
	.then(function(data){
		console.log(data.mes);
	},function(err){
        console.log(err.mes);
        //alert(err.mes);
    });
};

/**
 * 获取资源页，提供currentPage、pageSize参数
 */
function refreshRolePage($scope,roleMain,currentPage,pageSize) {
	var param = {
			currentPage: currentPage,
			pageSize: pageSize
	};
	roleMain.getRolePage(param).then(function(resPage){
		$scope.rolePage = resPage.data;
		$scope.pageNums = setPageNum(resPage);
	},function(error){
		//alert(error.mes);
	});
};


/**
 * 初始化树的根节点
 * @param pid
 * @param roleMain
 */
function resourceDataLoad(pid,roleMain){

	roleMain.findTree({"pid":pid})
	.then(function(success){
		treeDataSource = new DataSourceTree({data:success.data});
	},function(error){
		//alert(error.mes);
	});
};


/**
 * 加载树
 */
function treeLoad($scope,dom){

	//加载树
	var tree = $('#resourceTree').ace_tree({
		dataSource: treeDataSource ,
		multiSelect:true,
		loadingHTML:'<div class="tree-loading"><i class="ace-icon fa fa-refresh fa-spin blue"></i></div>',
		'open-icon' : 'ace-icon tree-minus',
		'close-icon' : 'ace-icon tree-plus',
		'selectable' : true,
		'selected-icon' : 'ace-icon fa fa-check',
		'unselected-icon' : 'ace-icon glyphicon glyphicon-ok'
	});

	//树回调
	tree.on('updated', function(e,object) {
		$scope.resourceMap = object.info;
	});
};

