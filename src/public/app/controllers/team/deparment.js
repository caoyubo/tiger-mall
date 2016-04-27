/**
 * <p>角色控制器
 * <p>@author dragon
 * <p>@date 2015年7月7日
 * <p>@version 1.0
 */
mainApp.controller("deparmentController", function($scope,$compile,$stateParams,baseService){

    $scope.team_id = $stateParams.id || 0;
    $scope.tree = {};
    $scope.setTree = function(){
        baseService.webRequest('/admin/api/department/department_list',{team_id:$scope.team_id},requestMethod.GET)
            .then(function(result){
                $scope.tree = formatTree(result.data);
                setTree($scope.tree);
            },function(error){
                alert('请求失败');
            });
    };
    $scope.setTree();

    //增加
    $scope.add = function(){

    };

    $scope.info = {team_id:$scope.team_id};
    $scope.department_add_submit = function(){
        baseService.webRequest('/admin/api/department/add',$scope.info,requestMethod.POST)
            .then(function(result){
                if(result && result.state){
                    alert('添加成功');
                }else{
                    alert('添加失败');
                }
            },function(error){
                alert('请求失败');
            });
    };

    //编辑
    $scope.edit = function(){

    };





    function formatTree(tree_data,parent_id){
        parent_id = parent_id || '0';
        if(!tree_data || tree_data.length<=0){
            return tree_data;
        }
        var new_tree = {};
        for(var i in tree_data){
            if(tree_data[i]['parent_id'] == parent_id){
                var obj = {};
                obj.name = tree_data[i]['department_name'];
                obj.additionalParameters = formatTree(tree_data,tree_data[i]['_id']);
                if(!obj.additionalParameters || obj.additionalParameters.length<=0){
                    obj.type = 'item';
                }else{
                    obj.type = 'folder';
                }
                new_tree[i] = obj;
            }
        }
        return new_tree;

    }

});




