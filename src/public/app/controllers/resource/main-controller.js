/**
 * <p>资源控制器
 * <p>@author dragon
 * <p>@date 2015年7月7日
 * <p>@version 1.0
 */
mainApp.controller("ResourceMainController", function($scope, resourceMain){
	
	/**
	 * 初始化页面
	 */
	refreshPage($scope,resourceMain,null,null);
	
	/**
	 * 跳转页面
	 */
	$scope.PageSkip = function(currentPage, pageSize){
		refreshPage($scope,resourceMain,currentPage,pageSize);
	};
	
	/**
	 * 删除指定资源
	 */
	$scope.delById = function(resource){

		resourceMain.deleteById({"id":resource.id,"pid":resource.parentId,"appid":resource.appId})
		.then(function(JsonResponse){
			refreshPage($scope,resourceMain,null,null);
			//alert(JsonResponse.mes);
		},function(error){
			//alert(error.mes);
		});
	};

	// 初始化表单数据容器
	$scope.addResForm = {};
	/**
	 * 提交添加资源表单
	 */
	$scope.addResourceSubmit = function(){
		resourceMain.addSubmit($scope.addResForm)
		.then(function(data){
			$("#resourceAddModal").modal("hide");
			$scope.addResForm = {};
			//alert(data.mes);
			refreshPage($scope,resourceMain,null,null);
		},function(err){
	        console.log(err);
	        //alert(err);
	    });
	};
	
	
	//更新资源
	$scope.updateResource =function(resource){
		$scope.addResForm = resource;
	};
	$scope.updateResourceSubmit = function(){
		resourceMain.updateSubmit($scope.addResForm)
		.then(function(data){
			console.log(data.mes);
			//alert(data.mes);
			$("#resourceUpdateModal").modal("hide");
			$scope.addResForm = {};
		},function(err){
	        console.log(err);
	        //alert(err);
	    });
	};
	$scope.hideResModal = function(){
		$("#resourceUpdateModal").modal("hide");
		$scope.addResForm = {};
	};
	
	
	
	
});

/* -------------------------内置方法------------------------- */
/**
 * 获取资源页，提供currentPage、pageSize参数
 */
function refreshPage($scope,resourceMain,currentPage,pageSize) {
	var param = {
			currentPage: currentPage,
			pageSize: pageSize
	};
	resourceMain.getResourcePage(param).then(function(resPage){
		$scope.resourcePage = resPage.data;
		$scope.pageNums = setPageNum(resPage);
	},function(error){
		//alert(error.mes);
	});
};
