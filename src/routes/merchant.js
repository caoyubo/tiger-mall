/**
 * Created by marlowe on 2015/10/22.
 * merchant  商家模块
 */
var con = BConfig.conf('conf');
module.exports = function (bfw, router) {
    var httpreson = require("./modules/merchant-module");
    //申请入驻商家业务类型
    router.get('/index', function (req, res, next) {
        res.render("merchant/merchant", {
            layout: 'shopLayout',
            user: req.session.user,
            shoptitle: con.shoptitle,
            keywords: con.keywords,
            description: con.description,
            title: '选择入驻商家类型',
        });
    });

    //继续入驻
    router.get('/protocol', function (req, res, next) {
        var port = con.userApiPorts;
        var uid = req.session.user.uid;
        var urls = '/enter/find/step/' + uid;
        var httprespons = httpreson.protocolf;
        global.ghttpheader.httpSendDateToGet(req, res, urls, httprespons, port);
    });

    //联系信息
    router.get('/contact', function (req, res, next) {
        res.render("merchant/contact", {
            layout: 'shopLayout',
            user: req.session.user,
            shoptitle: con.shoptitle,
            keywords: con.keywords,
            description: con.description,
            title: '联系信息',
        });
    });

    //联系信息提交
    router.get('/enter/add/contact', function (req, res, next) {
        var port = con.userApiPorts;
        var urls = '/enter/add/contact';
        var json = {
            uid: req.session.user.uid,
            userName: req.query.userName,
            contactPhone: req.query.contactPhone,
            email: req.query.email,
        };
        data = JSON.stringify(json);
        var httprespons = httpreson.protocolf;
        global.ghttpheader.httpSendDateToGetrestpost(res, req, urls, httprespons, data, port);
    });

    //公司信息
    router.get('/company', function (req, res, next) {
        res.render('merchant/company', {
            layout: 'shopLayout',
            user: req.session.user,
            shoptitle: con.shoptitle,
            keywords: con.keywords,
            description: con.description,
            title: '公司信息',
        });
    })

    //公司信息提交
    router.post('/add/company', function (req, res, next) {
        var port = con.userApiPorts;
        var urls = '/enter/add/company';
        var json = {
            uid: req.session.user.uid,
            companyName: req.body.companyName,
            bussinessLicenseRegistNumber: req.body.bussinessLicenseRegistNumber,
            legalRepresentative: req.body.legalRepresentative,
            idCard: req.body.idCard,
            idCardUrl: req.body.idCardUrl,
            bussinessLicenseCountryId: req.body.bussinessLicenseCountryId,
            bussinessLicenseCountry: req.body.bussinessLicenseCountry,
            bussinessLicenseProvinceId: req.body.bussinessLicenseProvinceId,
            bussinessLicenseProvince: req.body.bussinessLicenseProvince,
            bussinessLicenseCityId: req.body.bussinessLicenseCityId,
            bussinessLicenseCity: req.body.bussinessLicenseCity,
            bussinessLicenseDistrictId: req.body.bussinessLicenseDistrictId,
            bussinessLicenseDistrict: req.body.bussinessLicenseDistrict,
            bussinessLicenseAddress: req.body.bussinessLicenseDistrict,
            foundDate: req.body.foundDate,
            bussinessStartDate: req.body.bussinessStartDate,
            bussinessEndDate: req.body.bussinessEndDate,
            registeredCapital: req.body.registeredCapital,
            bussinessRange: req.body.bussinessRange,
            bussinessLicenseUrl: req.body.bussinessLicenseUrl,
            companyCountryId: req.body.companyCountryId,
            companyCountry: req.body.companyCountry,
            companyProvinceId: req.body.companyProvinceId,
            companyProvince: req.body.companyProvince,
            companyCityId: req.body.companyCityId,
            companyCity: req.body.companyCity,
            companyDistrictId: req.body.companyDistrictId,
            companyDistrict: req.body.companyDistrict,
            companyAddress: req.body.companyAddress,
            companyPhone: req.body.companyPhone,
            companyEmergencyContact: req.body.companyEmergencyContact,
            companyEmergencyContactMobile: req.body.companyEmergencyContactMobile,
            organizationCodeCertificate: req.body.organizationCodeCertificate,
            organizationCodeCertificateStartDate: req.body.organizationCodeCertificateStartDate,
            organizationCodeCertificateEndDate: req.body.organizationCodeCertificateEndDate,
            organizationCodeCertificateUrl: req.body.organizationCodeCertificateUrl,
        };
        data = JSON.stringify(json);
        var httprespons = httpreson.public;
        global.ghttpheader.httpSendDateToGetrestpost(res, req, urls, httprespons, data, port);
    })


    //结算信息
    router.get('/billing', function (req, res, next) {
        res.render('merchant/billing', {
            layout: 'shopLayout',
            user: req.session.user,
            shoptitle: con.shoptitle,
            keywords: con.keywords,
            description: con.description,
            title: '结算信息',
        });
    });

    //添加公司纳税信息
    router.post('/add/tax', function (req, res, next) {
        var port = con.userApiPorts;
        var urls = '/enter/add/tax';
        var json = {
            uid: req.session.user.uid,
            taxpayerId: req.body.taxpayerId,
            taxpayerTypeId: req.body.taxpayerTypeId,
            taxTypeTaxCodeId: req.body.taxTypeTaxCodeId,
            taxEnrolCertificateUrl: req.body.taxEnrolCertificateUrl,
            generalTaxpayerQualificationUrl: req.body.generalTaxpayerQualificationUrl,
            bankCardAccountName: req.body.bankCardAccountName,
            bankCardAccount: req.body.bankCardAccount,
            bankBranchNumber: req.body.bankBranchNumber,
            bankCountryId: req.body.bankCountryId,
            bankCountry: req.body.bankCountry,
            bankProvinceId: req.body.bankProvinceId,
            bankProvince: req.body.bankProvince,
            bankCityId: req.body.bankCityId,
            bankCity: req.body.bankCity,
            bankDistrictId: req.body.bankDistrictId,
            bankDistrict: req.body.bankDistrict,
            bankAccountLicenceUrl: req.body.bankAccountLicenceUrl,
        };
        data = JSON.stringify(json);
        var httprespons = httpreson.public;
        global.ghttpheader.httpSendDateToGetrestpost(res, req, urls, httprespons, data, port);
    });


    //店铺信息
    router.get('/shop', function (req, res, next) {
        var port = con.shopApiPorts;
        var urls = '/region/all/country';
        var httprespons = httpreson.shop;
        global.ghttpheader.httpSendDateToGet(req, res, urls, httprespons, port);
    })


    //店铺信息
    router.post('/shop/add', function (req, res, next) {
        var port = con.shopApiPorts;
        var urls = '/shop/add';
        var json = {
            userId: req.session.user.uid,
            shopCategoryId: req.body.shopCategoryId,
            appId: con.appid,
            userName: req.body.userName,
            shopName: req.body.shopName,
            description: req.body.description,
            logo: req.body.logo,
            telephone: req.body.telephone,
            address: req.body.address,
            pdefault:req.body.pdefault,
        };
        data = JSON.stringify(json);
        var httprespons = httpreson.public;
        global.ghttpheader.httpSendDateToGetrestpost(res, req, urls, httprespons, data, port);
    })

    //审核
    router.get('/audit', function (req, res, next) {
        async.parallel([
            function (callback) {
                var port = con.shopApiPorts;
                var t1 = function resonIntroduce(chunk, res, req) {
                    callback(null, chunk);
                };
                var json = {
                    uid: req.session.user.uid,
                    pdefault:'false',
                };
                data = JSON.stringify(json);
                var urls =  '/shop/find/user/shop/default';
                global.ghttpheader.httpSendDateToGetrestpost(req, res, urls, t1, data, port);
            },
            function (callback) {
                var port = con.userApiPorts;
                var t1 = function resonIntroduce(chunk, res, req) {
                    callback(null, chunk);
                }
                var urls =  "/enter/find/uid/"+req.session.user.uid;
                global.ghttpheader.httpSendDateToGet(res, req, urls, t1, port);
            }
        ], function (err, result) {
            if (JSON.parse(result[0]).success == false) {
                var callbackurl = global.urls + "/";
                res.redirect(callbackurl);
                return;
            }
            if (JSON.parse(result[1]).success == false) {
                var callbackurl = global.urls + "/";
                res.redirect(callbackurl);
                return;
            }
            var shop = JSON.parse(result[0]).data;
            var company = JSON.parse(result[1]).data;
            console.log(shop);
            console.log(company);
            res.render('merchant/audit', {
                layout: 'shopLayout',
                user: req.session.user,
                shoptitle: con.shoptitle,
                keywords: con.keywords,
                description: con.description,
                title: '入驻审核',
                shop:shop,
                company:company,
            })
        });
    })

    /*
     * 商家入驻店铺查询
     * @marlowe
     * update 2015-11-4
     */
    router.get('/shop/find/user', function (req, res, next) {
        var port = con.shopApiPorts;
        var uid =  req.session.user.uid;
        var urls = '/shop/find/user/default/'+uid;
        var httprespons = httpreson.public;
        global.ghttpheader.httpSendDateToGet(req, res, urls, httprespons, port);
    })

}

