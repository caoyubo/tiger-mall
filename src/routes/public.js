/**
 * Created by marlowe on 2015/11/3.
 * 公共路由
 */
var multipart = require('connect-multiparty');
var fs = require('fs');
var path = require('path');
var con = BConfig.conf('conf');
var httpreson = require("./modules/merchant-module");
module.exports = function (bfw, router) {
    /*
     * @marlowe
     *  根据父级ID查询子类型
     *  update 2015-11-3
     */
    router.get('/dic/children', function (req, res, next) {
        var port = con.userApiPorts;
        var pid = req.query.pid;
        var urls = '/dic/children/' + pid;
        var httprespons = httpreson.public;
        global.ghttpheader.httpSendDateToGet(req, res, urls, httprespons, port);
    });


    /*
     * @marlowe
     *  2.7根据父区域ID查询和父级分类ID子分类
     *  update 2015-11-3
     */
    router.get('/shop/category/pid/region', function (req, res, next) {
        var port = con.shopApiPorts;
        var pid = req.query.pid;
        var region = req.query.regionId;
        var urls = '/shop/category/region/' + region + '/appId/' + con.appid + '/pid/' + pid;
        var httprespons = httpreson.public;
        global.ghttpheader.httpSendDateToGet(req, res, urls, httprespons, port);
    });
    /*
     *图片上传
     * @marlowe
     * update 2015-11-4
     */
    router.post('/upload/idCardUrl', multipart(), function (req, res) {
        //get filename
        console.error(req.files);
        console.info("******************************图片上传 ******************************");
        var authorizeImgReq = req.files.category;
        console.log(req.files.category.path);
        var filename = authorizeImgReq.originalFilename || path.basename(authorizeImgReq.path);
        var mime = returnMime(authorizeImgReq.originalFilename);
        var targetPath = returnTargetPath(mime);
        var targetPathName = returnTargetPathName(con.imgUrls + targetPath);
        console.log(req.files.category.path);
        mkdirsSync(targetPathName, '777');
        console.log(req.files.category.path);
        fs.createReadStream(req.files.category.path).pipe(fs.createWriteStream(con.imgUrls + targetPath));
        var imgId = authorizeImgReq.fieldName;
        console.log(con.imgServer + targetPath);
        res.json({code: 200, success: true, data: {url: con.imgServer + targetPath}});
        console.info("****************************** 图片上传结束 ******************************");
    });


}


//文件路径
function returnTargetPath(mime) {
    var firstRandom = parseInt(10 * Math.random());
    var secondRandom = Math4Random(4);
    var thirdRandom = Math4Random(4);
    var targetFileName = firstRandom + '_' + secondRandom + '_' + thirdRandom + mime;
    var targetPath = "/" + firstRandom + "/" + secondRandom + "/" + thirdRandom + "/" + targetFileName;
    return targetPath;
}

function returnTargetPathName(targetPath) {
    var targetPathName = targetPath.substring(con.imgUrls.length + 1, targetPath.lastIndexOf('/') + 1);
    console.log(con.imgUrls.length + 1);
    console.log(targetPath.lastIndexOf('/') + 1);
    console.log("targetPathName" + targetPathName);
    return targetPathName;
}

function returnMime(path) {
    return path.substr(path.lastIndexOf('.'));
}

function Math4Random(max) {
    var num = '';
    for (var i = 0; i < max; i++) {
        num += Math.floor(Math.random() * 10);
    }
    return num;
}

function mkdirsSync(dirpath, mode) {
    if (!fs.existsSync(dirpath)) {
        var pathtmp = con.imgUrls;
        dirpath.split('/').forEach(function (dirname) {
            if (pathtmp) {
                pathtmp = path.join(pathtmp, dirname);
            }
            else {
                pathtmp = dirname;
            }
            if (!fs.existsSync(pathtmp)) {
                if (!fs.mkdirSync(pathtmp, mode)) {
                    return false;
                }
            }
        });
    }
    return true;
}
