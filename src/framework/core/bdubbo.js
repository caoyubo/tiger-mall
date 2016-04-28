/**
 *  dubbo请求模块
 * @module bfw
 * @author zxy
 * @date
 * @version 1.0
 */

var http = require('http');
var urlutil    	= require('url');

var methodList = {
    GET  : "GET",
    POST : "POST"
};
var contentType = {
    JSON : "application/json; charset=UTF-8",
    FORM : "application/x-www-form-urlencoded",
};
/**
 *
 * @param url
 * @param param
 * @param method
 * @param callback
 */
function requestToHttpJson(url,param,method,headers,callback){
    var url_info = urlutil.parse(url);
    var opt = {
        method  : method,
        host    : url_info.hostname,
        path    : url_info.pathname,
        headers : headers
    };
    if(url_info.port){
        opt.port = url_info.port;
    }
    var req = http.request(opt, function (serverFeedback) {
        if (serverFeedback.statusCode == 200) {
            var body = "";
            serverFeedback.on('data', function (data) {
                body += data;
            });
            serverFeedback.on('end', function () {
                BLog.debug('[Http api response]'+body);
                var result = JSON.parse(body);
                callback(result);
            });
        }else {
            BLog.debug("[url="+ url +",code=" + serverFeedback.statusCode+"] " + serverFeedback.statusMessage);
            callback(null);
        }
    });
    req.write(param + "\n");
    req.end();
}

/**
 * 构造restful url
 * @param url
 * @param param
 * @returns {*}
 */
function makeUrl(url,param){
    for(var key in param){
        url = url.replace('{{'+key+'}}',param[key]);
    }
    return url;
}

/**
 * 进行rest请求的GET方法
 * @param url
 * @param param
 * @param callback
 */
exports.get = function (url,param,callback) {
    url = makeUrl(url,param);
    BLog.debug('[GET]'+url);
    requestToHttpJson(url,"",methodList.GET,{},callback);
};
/**
 * 进行rest请求的POST方法
 * @param url
 * @param param
 * @param callback
 */
exports.post = function (url,param,callback) {
    var json = JSON.stringify(param);
    var headers = {
        "Content-Type": contentType.JSON
    };
    requestToHttpJson(url,json,methodList.POST,headers,callback);
};

