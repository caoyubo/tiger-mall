/**
 * <p>角色控制器
 * <p>@author dragon
 * <p>@date 2015年7月7日
 * <p>@version 1.0
 */
mainApp.controller("TeamController", function($scope,$http,$compile,teamProvider){

    //分页
    $scope.team_list = [];
    $scope.pageSkip = function(page_num){
        /*$http.get('/admin/api/team/team_list?p='+page_num).success(function(result){
            if(result.state == false){
                alert('获取数据失败');
                return ;
            }
            refreshList($scope,$compile,result);

        })*/
        teamProvider.get_list({p:page_num}).then(function(result){
            refreshList($scope,$compile,result);
        });

    };
    $scope.pageSkip($scope.curr_page);



    //搜索
    $scope.search = {};
    $scope.search_submit = function(){
        teamProvider.search_submit($scope.search).then(function(result){
            refreshList($scope,$compile,result);
        },function(error){
            alert('请求失败');
        })
    };

    $scope.team_info = {};

    $scope.reset = function(){
        $scope.team_info = {};
    };
    $scope.model_show = false;

    //编辑
    $scope.edit_team = function(info){
        $scope.edit_sign = true;
        $scope.add_sign = false;
        $scope.team_info = cloneObj(info);
    };

    //添加
    $scope.add_team = function(){
        $scope.edit_sign = false;
        $scope.add_sign = true;
        $scope.reset();
    };

    //提交
    $scope.team_submit = function(){
        if($scope.add_sign){    //新增
            teamProvider.add_submit($scope.team_info).then(function(result){
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
            teamProvider.edit_submit($scope.team_info).then(function(result){
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
    $scope.delete_submit = function(team_id){
        if(!confirm("确定删除？")){
            return ;
        }
        teamProvider.delete_submit({team_id:team_id}).then(function(result){
            if(result.state ){
                alert('删除成功');
                $scope.pageSkip($scope.curr_page);
            }else{
                alert('删除失败');
            }
        },function(result){
            alert('请求失败');
        });
    };

    /**
     * 刷新列表
     */
    function refreshList($scope,$compile,result){
        var data = result.data;
        $scope.team_list = data.team_list;
        $scope.curr_page = data.curr_page;
        var html = $compile((page(data.total_size,data.curr_page,data.pagesize)))($scope);
        angular.element('#showpagecode').html(html)
    }

});




