/**
 * mysql数据库测试
 * @author blank
 * @date 20150629
 * @param app
 */

module.exports = function (bfw , router ) {

    var db = BFunc.lib( 'bdb').getDb();

    router.use(function(req, res, next){
        BLog.debug( 'begin test.....' );


        /*var name=0;
        if(name){
            console.log('name:',name);
        }

        var name2;
        if(name2){
            console.log('name2:',name2);
        }

        var name3 = [];
        if(name3){
            console.log('name3:',name3);
        }

        var name4 = {};
        if(name4){
            console.log('name4:',name4);
        }

        var name5 = '';
        if(name5){
            console.log('name5:',name5);
        }

        var name6 = undefined;
        if(name6){
            console.log('name6:',name6);
        }*/


//http请求
        /*
        var http=require('http');

        var body = {"appName":"nzlm-test","description":"测试账号","packageName":"com.test.push","url":"www.baidu.com"};

        var bodyString = JSON.stringify(body);

        var headers = {
            'Content-Type': 'application/json;charset=utf-8',
        };

//http://172.16.110.181:8888/app/create
        var options = {
            host: '172.16.110.181',
            port: 8888,
            path: '/app/create',
            method: 'POST',
            headers: headers
        };

        var req=http.request(options,function(res){
            res.setEncoding('utf-8');

            var responseString = '';

            res.on('data', function(data) {
                responseString += data;
            });

            res.on('end', function() {
                //这里接收的参数是字符串形式,需要格式化成json格式使用
                //var resultObject = JSON.parse(responseString);
                console.log('-----resBody-----',responseString);
            });

            req.on('error', function(e) {
                //TODO: handle error.
                console.log('-----error-------',e);
            });
        });
        req.write(bodyString);
        req.end();
*/
        /*var http = BFunc.lib( 'bhttp').bhttp;
        console.log(http);
        http.get({'url':"http://shop.yn.com/yn/index.php?act=version",callback:function(error,respone,body){
            console.log(body);
        }})*/

        var name = 'zhangsan';
        console.log(name.split(','));

   // next();

    });

    /**
     * 列表
     */
    router.get('/list', function(req, res, next) {
        var data = [] ;

        db.getConnection(function(err, connection){
            connection.query('SELECT 1 + 1 AS solution', function(err, rows, fields) {
                if (err) {
                    BLog.debug('[query] - :'+err);
                    next(500);
                }
                BLog.debug('The solution is: ' + rows[0].solution);
                res.send( 'The solution is: ' +  rows[0].solution );
            });

            connection.release();
        });
    });

    router.get('/testadd', function(req, res, next) {
        var App = require( BASE_PATH + 'core/model/app' );
        var app = new App();
        app.addone({data:{  name    : 'k1k1k1k' ,
                            seq     : 10 ,
                            isrun   : 1 ,
                            descs   : 'kakakak',
                            optype  : 'type' ,
                            utime   : BFunc.getTime(),
                            ctime   : BFunc.getTime()

        },
        callback:function(err, result){
            BLog.debug('add.......'+err+' '+result);
        }});
        res.send('add');
    });

    router.get('/testup', function(req, res, next) {
        var App = require( BASE_PATH + 'core/model/app' );
        var app = new App();


        app.updateone({data:{  name    : 'k1k1k1k2' ,
            seq     : 11 ,
            isrun   : 0 ,
            descs   : 'kakakak2',
            optype  : 'type2' ,
            utime   : BFunc.getTime()

        },
        wheres:{id:5},

        callback:function(err, result){
            BLog.debug('update.....');
        }});
        res.send('up');
    });

    router.get('/testdel', function(req, res, next) {
        var App = require( BASE_PATH + 'core/model/app' );
        var app = new App();

        app.deleteone( {wheres:{id:6}, callback:function(err, result){
            BLog.debug('delete.....');
        }});
        res.send('del');
    });


    router.get('/testadd2', function(req, res, next) {
        var app = BFunc.model( 'app' );
        app.additem({data:{  name    : 'k1k1k1k' ,
            seq     : 10 ,
            isrun   : 1 ,
            descs   : 'kakakak',
            optype  : 'type' ,
            utime   : BFunc.getTime(),
            ctime   : BFunc.getTime()

        },
            callback:function(err, result){
                BLog.debug('add.......');
            }});
        res.send('add');
    });

    router.get('/testup2', function(req, res, next) {
        var app = BFunc.model( 'app' );


        app.updateitem({data:{  name    : 'k1k1k1k2' ,
            seq     : 11 ,
            isrun   : 0 ,
            descs   : 'kakakak2',
            optype  : 'type2' ,
            utime   : BFunc.getTime()

        },
            wheres:{id:5},

            callback:function(err, result){
                BLog.debug('update.....');
            }});
        res.send('up');
    });

    router.get('/testdel2', function(req, res, next) {
        var app = BFunc.model( 'app' );

        app.deleteitem( {wheres:{id:10}, callback:function(err, result){
            BLog.debug('delete.....');
        }});
        res.send('del');
    });

    router.get('/time', function (req,res,next) {
        console.log(Date.parse(new Date()));
        res.send(Date.parse(new Date()));
    });

    /**
     * redis
     */
    router.get('/redis',function(req,res,next){
        var redis = BFunc.import('bredis');
        console.log('redis start');
        redis.hmset('lisi',{name:'lisi',age:23},function(error,result){
            if(error){
                console.log(error);
            }
        })
    })

};
