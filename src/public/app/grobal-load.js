/**
 *  引入js文件
 * @module bfw
 * @author zxy
 * @date 20150730
 * @version 1.0
 */

//引入controller
angular.forEach(grobalConfig.controller , function (data , index , array) {
    document.write('<script src="' + grobalConfig.controller_path + data+'"></script>');
});
//引入指令
angular.forEach(grobalConfig.directives , function (data , index , array) {
    document.write('<script src="' + grobalConfig.directives_path + data+'"></script>');
});
//引入services
angular.forEach(grobalConfig.services , function (data , index , array) {
    document.write('<script src="' + grobalConfig.services_path + data+'"></script>');
});
//引入过滤器
angular.forEach(grobalConfig.filters , function (data , index , array) {
    document.write('<script src="' + grobalConfig.filters_path + data+'"></script>');
});