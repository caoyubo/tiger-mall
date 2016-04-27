/**
 * <p>自定义过滤器
 * <p>@author dragon
 * <p>@date 2015年7月7日
 * <p>@version 1.0
 */
/**
 * 资源表格过滤
 */
mainApp.filter("systemfilter",function(){
    return function(input){
    	if(0 == input){
    		return "";
    	}
        return grobalSystems[input-1].appName;
    }
});

/**
 * 类型过滤
 */
mainApp.filter("typefilter",function(){
    return function(input){
    	if(0 == input){
    		return "";
    	}
        return grobalMenuType[input];
    }
});

mainApp.filter('to_trusted',['$sce',function($sce){
    return function(text){
        return $sce.trustAsHtml(text);
    }
}]);