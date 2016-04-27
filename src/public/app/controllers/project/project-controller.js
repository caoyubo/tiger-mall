/**
 * <p>角色控制器
 * <p>@author dragon
 * <p>@date 2015年7月7日
 * <p>@version 1.0
 */
mainApp.controller("ProjectController", function($scope,$http,$compile,baseService){

    //分页
    $scope.project_list = [];
    $scope.pageSkip = function(page_num){
        /*$http.get('/admin/api/project/project_list?p='+page_num).success(function(result){
            if(result.state == false){
                alert('获取数据失败');
                return ;
            }
            refreshList($scope,$compile,result);

        })*/
        baseService.webRequest('/admin/api/project/project_list?p='+page_num,{},"POST").then(function(result){
            refreshList($scope,$compile,result);
        },function(error){
            alert('获取数据失败');
        })

    };
    $scope.pageSkip($scope.curr_page);



    //搜索
    $scope.search = {};
    $scope.search_submit = function(){
        baseService.webRequest(grobalUrl.project_search,$scope.search,requestMethod.GET).then(function(result){
            refreshList($scope,$compile,result);
        },function(error){
            alert('请求失败');
        })
    };

    //初始化增加编辑表单
    $scope.project_info = {};
    $scope.model_show = false;
    $scope.team_list = [];
    baseService.webRequest('/admin/api/project/add_data',{},requestMethod.GET).then(function(result){
        $scope.team_list = result.data.team_list;
    });

    $scope.reset = function(){
        $scope.project_info = {};
    };

    //编辑
    $scope.edit_project = function(info){
        $scope.edit_sign = true;
        $scope.add_sign = false;
        $scope.project_info = cloneObj(info);
        $scope.project_info.finish_time = getDateFormat(info.finish_time,'yyyy-MM-dd');
        $scope.project_info.start_time = getDateFormat(info.start_time,'yyyy-MM-dd');
        $scope.project_info.team = $scope.project_info.team_id+'-' + $scope.project_info.team_name;
    };

    //添加
    $scope.add_project = function(){
        $scope.edit_sign = false;
        $scope.add_sign = true;

        $scope.reset();
    };

    //提交
    $scope.project_submit = function(){
        if($scope.add_sign){    //新增
            baseService.webRequest(grobalUrl.project_add,$scope.project_info,requestMethod.POST).then(function(result){
                if(result.state){
                    $scope.pageSkip($scope.curr_page);
                    alert('添加成功');
                    $('button[data-dismiss="modal"]').click();
                }else{
                    alert('增加失败');
                }
            },function(error){
                alert('请求失败');
            });
        }else{      //编辑
            baseService.webRequest(grobalUrl.project_edit,$scope.project_info,requestMethod.POST).then(function(result){
                if(result.state ){
                    $scope.pageSkip($scope.curr_page);
                    alert('编辑成功');
                    $('button[data-dismiss="modal"]').click();
                }else{
                    alert('编辑失败');
                }
            },function(error){
                alert('请求失败');
            });
        }
    };

    //删除
    $scope.delete_submit = function(project_id){
        if(!confirm("确定删除？")){
            return ;
        }
        baseService.webRequest(grobalUrl.project_delete,{project_id:project_id},requestMethod.POST).then(function(result){
            if(result.state ){
                alert('删除成功');
                $scope.pageSkip($scope.curr_page);
            }else{
                alert('删除失败');
            }
        },function(error){

            alert('请求失败');
        });
    };

    /**
     * 刷新列表
     */
    function refreshList($scope,$compile,result){
        var data = result.data;
        $scope.project_list = data.project_list;
        $scope.curr_page = data.curr_page;
        var html = $compile((page(data.total_size,data.curr_page,data.pagesize)))($scope);
        angular.element('#showpagecode').html(html)
    }

});




