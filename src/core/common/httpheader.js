/*
 @require  nodejs  请求头
 @copyright  marlowe
 *list   rest
 */

function counts(req, urls,port) {
    var con = BConfig.conf('conf');
    //BLog.debug("*****************************************get发送请求头********************************************");
    //BLog.debug("url:" + urls);
    urls = encodeURI(urls);
    BLog.debug("encosndeURI url:" + urls);
    var json = {
        hostname: con.apiHttpurl,
        port: port,
        path: urls,
        method: "GET",
        agent: false,
        headers: {
            'Content-Type': 'application/json;charset=UTF-8',
            'Cache-Control': 'max-age=2222',
            'X-Requested-With': 'XMLHttpRequest',
            'signature': "username=marlowe"
        }
    }
    BLog.debug(json);
    return json;
}

function httpSendDateToGet(req, res, urls, dealFunction, port) {
    BLog.debug("*****************************************get发送请求头********************************************");
    var http = require('http');
    var httpheaders = counts(req, urls,port);  //接收函数传过来的值
    http.get(httpheaders, function (reqq) {
        reqq.setEncoding('utf8');
        var chunks = "";
        //循环获取数据
        reqq.on('data', function (chunk) {
            chunks += chunk;
        });
        //获取数据后的处理
        reqq.on("end", function () {
            console.log('返回数据1：' + chunks);
            dealFunction(chunks, req, res);
        });
    });
}
exports.counts = counts;
exports.httpSendDateToGet = httpSendDateToGet;

/*
 * marlowe
 * post
 * urs post 请求
 */

function httpSendDateTopost(req, res, urls, dealFunction, data,port) {

    var http = require('http');
    var con = BConfig.conf('conf');
    var opt = {
        method: "POST",
        host: con.httpurl,
        port:port,
        path: urls,
        headers: {
            "Content-Type": 'application/x-www-form-urlencoded',
            "Content-Length": data.length
        }
    };
    console.log(opt);
    console.log(data);
    var reqq = http.request(opt, function (serverFeedback) {
        if (serverFeedback.statusCode == 200) {
            var body = "";
            serverFeedback.on('data', function (data) {
                body += data;
            });
            serverFeedback.on('end', function () {
                BLog.debug(body);
                dealFunction(body, req, res);
            });
        }
        else {
            res.send(500, "error");
        }
    });
    reqq.write(data + "\n");
    reqq.end();
}
exports.httpSendDateTopost = httpSendDateTopost;



/*
 * marlowe
 * post  rest
 * api post 请求
 */

function httpSendDateToGetrestpost(res, req, urls, dealFunction, data,port) {
    console.log(data);
    var http = require('http');
    var con = BConfig.conf('conf');
    var opt = {
        method: "POST",
        host: con.apiHttpurl,
        port: port,
        path: urls,
        headers: {
            "Content-Type": 'application/json;charset=UTF-8',

            // "Content-Length": data.length
        }
    };
    console.log(opt);

    var reqq = http.request(opt, function (serverFeedback) {
        console.log(serverFeedback.statusCode);
        if (serverFeedback.statusCode == 200) {
            var body = "";
            serverFeedback.on('data', function (data) {
                body += data;
            });
            serverFeedback.on('end', function () {
                console.log('返回数据：'+body);
                dealFunction(body, req, res);
            });
        }
        else {
            res.send(500, "error");
        }
    });

    reqq.write(data + "\n");
    reqq.end();
}
exports.httpSendDateToGetrestpost = httpSendDateToGetrestpost;



