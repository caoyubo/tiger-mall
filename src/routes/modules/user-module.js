/**
 * Created by marlowe on 2015/10/14.
 */
var con = BConfig.conf('conf');
function userKey(chunk,req,res){
    var result = JSON.parse(chunk);
    if( result.r == "1") {
        var user = result.data;
        console.log("user:");
        console.log(user);
        req.session.user = user;
        console.log(req.session.user);
        res.render("center/center",{
            layout:"centerLayout",
            user:user,
            shoptitle:con.shoptitle,
            keywords:con.keywords,
            description:con.description,
            title:'会员中心',
        });
    }else{
        // console.log('21212');
        res.render("center/center",{layout:"centerLayout"});
    }
}

function logout(chunk,req,res){

    var result = JSON.parse(chunk);
    console.log("logout:");
    console.log(result);
    if( result.r == "1") {
       req.session.user = undefined;
       res.redirect("/");
    }else{
        // console.log('21212');

    }
}

function userModify(chunk,req,res){

    var result = JSON.parse(chunk);
    console.log("userModify:");
    console.log(result);
    if( result.r == "1") {
        var user = result.data;
        console.log("user:");
        console.log(user);
        req.session.user = user;
        console.log(req.session.user);
        res.redirect("/user/info");
    }else{
        // console.log('21212');
        res.redirect("/user/info");
    }
}
/*
 @require  nodejs  cookies
 @copyright  marlowe
 */
function getCookies(req, urls, sid, res) {
    var Cookies = {};
    req.headers.cookie && req.headers.cookie.split(';').forEach(function (Cookie) {
        var parts = Cookie.split('=');
        Cookies[parts[0].trim()] = ( parts[1] || '' ).trim();
    });
    return Cookies;
}

function getClientIp(req) {
    return req.headers['x-forwarded-for'] ||
        req.connection.remoteAddress ||
        req.socket.remoteAddress ||
        req.connection.socket.remoteAddress;
};


/**
 *进行AES编码
 * @param data
 * @param key
 * @param iv
 * @returns {*}
 */
function aes_encoding(data,key,iv){
    console.log(data);
    var algorithm = 'aes-128-cbc';
    var crypto      = require('crypto');
    var cipher = crypto.createCipheriv(algorithm, key, iv)
    var encrypted = cipher.update(data, 'binary', 'base64')
    encrypted += cipher.final('base64');
    return encrypted;
}

//收获地址
function addressFind(chunks,req,res){
    var result =  JSON.parse(chunks);
    var code = result.code;
    var content = result.data;
    if(code == '0'){
        res.render("center/user/address",{
            shoptitle:con.shoptitle,
            keywords:con.keywords,
            description:con.description,
            title:'收获地址',
            layout:"userLayout",
            user : req.session.user,
            content : content,
        });
    }else{
        res.redirect('/');
    }
}

/*
* marlowe
* ajax 公共函数
 */
function  public(chunks,req,res){
    var result =  JSON.parse(chunks);
    var code = result.code;
    var content = result.data;
    res.json(result);
}
/*
* marlowe
* 增加收获地址
* updata 2015-10-27
 */
function  addressAdd(chunks,req,res){
    var result =  JSON.parse(chunks);
    console.log(result);
    var code = result.code;
    if(code == '0'){
        console.log(code);
        res.json(result);
    }else{
        res.redirect('/');
    }
}
exports.addressAdd = addressAdd;
exports.public = public;
exports.addressFind = addressFind;
exports.aes_encoding = aes_encoding;
exports.getClientIp = getClientIp;
exports.getCookies = getCookies;
exports.userKey = userKey;
exports.logout = logout;
exports.userModify = userModify;