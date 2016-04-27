/**
 * <p>角色控制器
 * <p>@author dragon
 * <p>@date 2015年7月7日
 * <p>@version 1.0
 */
var add_url = '/admin/api/dictionary/add';
var edit_url = '/admin/api/dictionary/edit';
var get_url = '/admin/api/dictionary/index';
mainApp.controller("DictionaryController", function($scope,$state,$stateParams,baseService,$compile) {

    //if($stateParams.id == ""){
    //    $state.go('dictionary',{id :0});
    //}
    var cur_fid = $stateParams.id ? $stateParams.id : "0";
    refreshDictionary({fid: cur_fid});
    /**
     * 提交添加信息
     */
    $scope.addSubmit = function () {
        var dictionary = {
            name    : $scope.addDicForm.name,
            value   : $scope.addDicForm.value,
            desc    : $scope.addDicForm.desc,
            fid     : $scope.addDicForm.fid
        };
        var result = baseService.webRequest(add_url,dictionary,requestMethod.POST);;
        result.then(function (data) {
            if(data.state){
                $('#dicAddModal').modal('hide');
                refreshDictionary({fid: cur_fid});
            }else {
                alert('错误');
            }
            console.log(data);
        }, function (err) {
            alert(err);
            console.log(err);
        });
    };
    /**
     * 更新字典
     * @param dic
     */
    $scope.editDic = function (dic) {
        $scope.editDicForm = {};
        $scope.editDicForm.id       = dic._id,
        $scope.editDicForm.name     = dic.dic_name;
        $scope.editDicForm.value    = dic.dic_value;
        $scope.editDicForm.desc     = dic.dic_desc;
        $scope.editDicForm.fid      = dic.dic_fid;
        $scope.editDicForm.fid_name = '顶级字典';
    };
    /**
     * 保存修改
     */
    $scope.saveEdit = function () {
        var dictionary = {
            id      : $scope.editDicForm.id,
            name    : $scope.editDicForm.name,
            value   : $scope.editDicForm.value,
            desc    : $scope.editDicForm.desc,
            fid     : $scope.editDicForm.fid
        };
        var result = baseService.webRequest(edit_url,dictionary,requestMethod.POST);;
        result.then(function (data) {
            if(data.state){
                $('#dicUpdateModal').modal('hide');
                refreshDictionary({fid: cur_fid});
            }else {
                alert('错误');
            }
            console.log(data);
        }, function (err) {
            alert(err);
            console.log(err);
        });
    };

    /**
     * 打开添加窗口
     * @param dic
     */
    $scope.openAddForm = function (dic) {
        $scope.addDicForm = {};
        if(dic == "0"){
            $scope.addDicForm.title     = '添加字典';
            $scope.addDicForm.fid_name  = '顶级字典';
            $scope.addDicForm.fid       = 0;
        }else{
            $scope.addDicForm.title     = "添加子字典";
            $scope.addDicForm.fid_name  = dic.dic_name;
            $scope.addDicForm.fid   = dic._id;
        }
        $('#dicAddModal').modal('show');
    };

    $scope.delDic = function (dic) {
        if(confirm('确定要删除吗？')){
            console.log('yes');
        }
    };

    /**
     * 刷新整个碎片页
     * @param param
     */
    function refreshDictionary(param) {
        baseService.webRequest(get_url,param,requestMethod.POST)
            .then(function (data) {
                $scope.dicList    = data.data.dictionary_list;
                //$scope.fatherList = data.data.father_list;
                refreshMenu(data.data.father_list);

                console.log(data);
            }, function (err) {
                console.log(err);
            });
    }

    /**
     * 刷新菜单
     * @param list
     */
    function refreshMenu(list){
        var plus = [];
        var first_item = {
            name : '顶级菜单',
            href : 'dictionary/'
        };

        if(typeof(list) == "undefined"){
            plus.push(first_item);
            $scope.menuItem.plus = plus;
            return;
        }
        if(list.length > 0){
            angular.forEach(list, function (data,index,array) {
                //menu_plus = '<li><a>'+data.dic_name+'</a></li>'+menu_plus;
                var plus_item = {};
                plus_item.name = data.dic_name;
                plus_item.href = 'dictionary/'+data._id;
                plus.unshift(plus_item);
            });
        }
        plus.unshift(first_item);
        $scope.menuItem.plus = plus;
    }

});
