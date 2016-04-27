/**
 *  字典的service层
 * @module bfw
 * @author zxy
 * @date
 * @version 1.0
 */
var add_url = '/admin/api/dictionary/add';
var get_url = '/admin/api/dictionary/index';
mainApp.provider("dicMain", function(){

    this.$get = function($http, $q , baseService) {
        return {
            addDictionary: function(dictionary){
                return baseService.webRequest(add_url,dictionary,requestMethod.POST);
            },
            getDictionaryList : function (param) {
                return baseService.webRequest(get_url,param,requestMethod.POST);
            }
        };
    };
});