/**
 * <p>主控制器，主要用于初始化
 * <p>MainController
 * <p>@auth dragon
 * <p>@date 20150701
 */
mainApp.controller("MainController",function($scope , $location, router){

    //菜单 urls
    router.getMenusAndRoutes()
        .then(function(menus){
            var from = $location.path();
            if(from === '/'){
                from = grobalConfig.default_router;
            }
            var current = get_current_menu(menus,from);
            $scope.menuItem = current.menuItem;
            $scope.subMenuItem = current.subMenuItem;
            $scope.menus = menus;
        },function(err){
            console.log(err);
        });


    //用户信息
    router.getUserInfo(grobalUrl.userInfo)
        .then(function(user){
            $scope.user = user.data;
        },function(err){
            console.log(err);
        });


    //主菜单
    $scope.mouseDown = function(menu){
        $scope.menuItem = menu;
    }
    //子菜单
    $scope.submouseDown = function(menu,submenu){
        $scope.menuItem = menu;
        $scope.subMenuItem = submenu;
    }


    /**
     * 根据入口url获取当前菜单
     * @param menus
     * @param path
     * @returns {number}
     */
    var parent_menu = null;
    function get_current_menu(menus,path){
        var current = {};
        current.num = -1;
        angular.forEach(menus , function (data, index, array) {
            menus[index].current = '';
            if(data.leaf == true) {
                parent_menu = data;
                var r = get_current_menu(data.sub, path);
                if(r.num >= 0){
                    menus[index].current = 'active open';
                    current.num = index;
                    current.menuItem = menus[index];
                    current.subMenuItem = menus[index];
                }
            }else {
                if (path.indexOf(data.url)>=0) {
                //if (data.url.indexOf(path)>=0) {
                    if(parent_menu!=null){
                        $scope.submouseDown(parent_menu,data);
                    }else{
                        $scope.mouseDown(data);
                    }
                    menus[index].current = 'active';
                    current.num = index;
                    current.menuItem = menus[index];
                }
            }
        });

        return current;
    }
});

