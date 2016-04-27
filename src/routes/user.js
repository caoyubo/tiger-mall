/**
 * 用户
 * @author jiaming
 * @date 20150729
 * @param app
 */

module.exports = function (bfw , router ) {
    var httpreson = require("./modules/user-module");
    var con = BConfig.conf('conf');
/*
* marlowe
* user_key 验证
 */
    router.get('/center', function(req, res, next) {
        var port = con.ports;
        var tcookiet = httpreson.getCookies(req);
        var aeskey = httpreson.aes_encoding(tcookiet.user_key,con.key,con.uiv);
        console.log(aeskey);
        var json={
            client_id:con.client_id,
            user_key:aeskey,
            uid:tcookiet.burs_urs_uid,
            ip:con.ip,
            sign:global.md5(con.client_id+tcookiet.user_key+tcookiet.burs_urs_uid+con.ip)
        };
        data = require('querystring').stringify(json);
        var urls = '/oauth2/checkUserKey';
        var httprespons = httpreson.userKey;
        global.ghttpheader.httpSendDateTopost(req, res, urls, httprespons,data,port);
    });

    //退出
    router.get('/logout', function(req, res, next) {
        var tcookiet = httpreson.getCookies(req);
        var aeskey = httpreson.aes_encoding(tcookiet.user_key,con.key,con.uiv);
        console.log(aeskey);
           var client_id =con.client_id,
               user_key = aeskey,
               uid = tcookiet.burs_urs_uid,
               ip = con.ip,
               backurl = con.url;

        var urls = "http://"+con.httpurl+":"+con.ports+"/oauth2/logout?client_id="+client_id+"&user_key="+user_key+"&uid="+uid+"&ip="+ip+"&backurl="+backurl;
      req.session.user = "";
       res.redirect(urls);
    });

    //收货地址 address
    router.get('/address', function(req, res, next) {
        var port = con.userApiPorts;
        var uid = req.session.user.uid;
        if(uid == undefined){
            res.redirect('/');
        }else{
            var urls = '/address/find/'+uid;
            var httprespons = httpreson.addressFind;
            global.ghttpheader.httpSendDateToGet(req, res, urls, httprespons, port);
        }
    });

    //国家 region
    router.get('/region/all', function(req, res, next) {
        var port = con.shopApiPorts;
        var urls = '/region/all/country';
        var httprespons = httpreson.public;
        global.ghttpheader.httpSendDateToGet(req, res, urls, httprespons, port);
    });

    //省
    router.get('/region/pid', function(req, res, next) {
        var pid = req.query.pid;
        var port = con.shopApiPorts;
        var urls = '/region/pid/'+pid;
        var httprespons = httpreson.public;
        global.ghttpheader.httpSendDateToGet(req, res, urls, httprespons, port);
    });

    //添加收获地址
    router.get('/address/add', function(req, res, next) {
        var port = con.userApiPorts;
        var urls = '/address/add';
        var json = {
            appId:con.appid,
            uid: req.session.user.uid,
            consignee:req.query.consignee,
            email:req.query.email,
            countryId:req.query.countryId,
            country:req.query.country,
            provinceId:req.query.provinceId,
            province:req.query.province,
            cityId:req.query.cityId,
            city:req.query.city,
            districtId:req.query.districtId,
            district:req.query.district,
            address:req.query.address,
            zipCode:req.query.zipCode,
            telephone:req.query.telephone,
            mobile:req.query.mobile,
            signBuild:req.query.signBuild,
        };
        data = JSON.stringify(json);
        var httprespons = httpreson.addressAdd;
        global.ghttpheader.httpSendDateToGetrestpost(res, req, urls, httprespons,data, port);
    });

    //删除收获地址
    router.get('/address/delete', function(req, res, next) {
        var id = req.query.id;
        var port = con.userApiPorts;
        var urls = '/address/delete/'+id;
        var httprespons = httpreson.public;
        global.ghttpheader.httpSendDateToGet(req, res, urls, httprespons, port);
    });

    //收获地址查询
    router.get('/address/find/id', function(req, res, next) {
        var id = req.query.id;
        var port = con.userApiPorts;
        var urls = '/address/find/id/'+id;
        var httprespons = httpreson.public;
        global.ghttpheader.httpSendDateToGet(req, res, urls, httprespons, port);
    });

    //使用收获地址
    router.get('/address/default', function(req, res, next) {
        var port = con.userApiPorts;
        var urls = '/address/set/default';
        var json={
            id : req.query.id,
            uid: req.session.user.uid,
        };
        data = JSON.stringify(json);
        var httprespons = httpreson.public;
        global.ghttpheader.httpSendDateToGetrestpost(res, req, urls, httprespons,data, port);
    });








    //个人信息
    router.get('/info', function(req, res, next) {
        res.render("center/user/info",{
            shoptitle:con.shoptitle,
            keywords:con.keywords,
            description:con.description,
            title:'个人信息',
            layout:"userLayout",
            user : req.session.user
        });
    });

    //修改个人信息
    router.get('/modify', function(req, res, next) {
        var tcookiet = httpreson.getCookies(req);
        var aeskey = httpreson.aes_encoding(tcookiet.user_key,con.key,con.uiv);

        var json={
            client_id:con.client_id,
            user_key:aeskey,
            uid:tcookiet.burs_urs_uid,
            ip:con.ip,
            uname : req.query.uname,
            name : req.query.name,
            idcard : req.query.idcard,
            qq : req.query.qq,
            sex : req.query.sex,
            birthday : req.query.birthday
        };
        data = require('querystring').stringify(json);
        var urls = '/user/modify';
        var port = con.apiPorts;
        var httprespons = httpreson.userModify;
        global.ghttpheader.httpSendDateTopost(req, res, urls, httprespons,data,port);
    });

};
