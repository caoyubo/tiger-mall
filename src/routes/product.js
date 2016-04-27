/**
 * Created by ljm on 2015/10/10.
 */

module.exports = function (bfw , router ) {
    var httpreson = require("./modules/list-module");
    var con = BConfig.conf('conf');
    /*
     * @marlowe
     * list
     */
    router.get('/list', function(req, res, next) {

        global.async.parallel([
            function(callback) {
                var port = con.apiPorts;
                var urls = "/goodsclass/find/"+ con.appid;
                var reson = function resonClass(chunk, req, res) {
                    callback(null, chunk);
                }
                global.ghttpheader.httpSendDateToGet(req, res, urls, reson,port);
            },
            function(callback){
                var pageNum = req.query.pageNum;
                if(pageNum == undefined){
                    pageNum = 1;
                }
                var json={
                    appid:con.appid,
                    pageSize:con.pageSize,
                    currentPage:pageNum
                };
                var data = JSON.stringify(json);
                console.log(data);
                var port = con.apiPorts;
                var urls = '/goods/get';
                //var httprespons = httpreson.list;
                var reson = function resonClass(chunk, req, res) {
                    callback(null, chunk);
                }
                global.ghttpheader.httpSendDateToGetrestpost(res, req, urls, reson, data,port);
            }
        ], function (err, results) {
            if(err){
                console.log("error!!!!!!");
            }else{
                var goodsClass = null;
                var goodsInfo = null;
                for(var i in results){
                    if(JSON.parse(results[i]).code == "0"){
                        if(i == 0){
                            goodsClass = JSON.parse(results[i]).data
                        }
                        if(i == 1){
                            goodsInfo = JSON.parse(results[i]).data
                        }
                    }
                }
                if(goodsClass!=null&&goodsInfo!=null){
                    console.log("goodsClass:");
                    console.log(goodsClass);
                    var user = req.session.user;
                    res.render("list",{
                        user : user,
                        goodsClass : goodsClass,
                        goodsInfo : goodsInfo
                    });
                }
            }
        });
    });


    /*
     * marlowe
     * 产品详情
     *  list find
     */
    router.get('/detail', function(req, res, next) {

        global.async.parallel([
            function(callback) {
                var port = con.apiPorts;
                var urls = "/goodsclass/find/"+ con.appid;
                var reson = function resonClass(chunk, req, res) {
                    callback(null, chunk);
                }
                global.ghttpheader.httpSendDateToGet(req, res, urls, reson,port);
            },
            function(callback){
                var port = con.apiPorts;
                var id = req.query.id;
                var urls = '/goods/find/'+id;
                console.log("detailUrl:"+urls);
               // var httprespons = httpreson.detail;
                var reson = function resonClass(chunk, req, res) {
                    callback(null, chunk);
                }
                global.ghttpheader.httpSendDateToGet(req, res, urls, reson,port);
            }
        ], function (err, results) {

            if(err){
                console.log("error");
            }else{
                console.log("error:"+err);

                var goodsClass = null;
                var goods = null;
                var specs = null;
                var gallery = null;
                var specs2 = null;
               for(var i in results){
                   if(JSON.parse(results[i]).code == "0"){
                       if(i == 0){
                           goodsClass = JSON.parse(results[i]).data
                       }
                       if(i == 1){
                           goods = JSON.parse(results[i]).data.goods;
                           specs = JSON.parse(results[i]).data.specs;
                           gallery = JSON.parse(results[i]).data.gallery;

                       }
                   }
               }
                console.log("goods:");
                console.log(goods);
                console.log(goods.spec);
                console.log("specs:");
                console.log(specs);
                console.log("gallery:");
                console.log(gallery);

                if(goodsClass!=null&&goods!=null&&specs!=null&&gallery!=null){
                    res.render("detail",{
                        user : req.session.user,
                        goodsClass : goodsClass,
                        goods : goods,
                        specs : specs,
                        gallery : gallery
                    });
                }
            }
        });
    });

}
