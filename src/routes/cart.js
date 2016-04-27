/**
 * Created by ljm on 2015/10/12.
 */
/**/
module.exports = function (bfw , router ) {

    var httpreson = require("./modules/cart-module");
    var httpreson2 = require("./modules/user-module");
    var con = BConfig.conf('conf');

    //���ﳵ
    router.get('/cartList', function(req, res, next) {
        var tcookiet = httpreson2.getCookies(req);
        var port = con.apiPorts;
        var urls = "/cart/find/"+con.appid+"/"+tcookiet.burs_urs_uid;
        console.log("cartUrl:"+urls);
        var httprespons = httpreson.findCart;
        global.ghttpheader.httpSendDateToGet(req, res, urls, httprespons,port);
       /* res.render("order/cart",{
            user : req.session.user
        });*/
    });

    /*
     * marlowe
     * ���빺�ﳵ
     *  list find
     */
    router.get('/add', function(req, res, next) {

        //����û���û�е�¼���ȵ�¼
        if(req.session.user ==  undefined){
            res.redirect("http://"+con.httpurl+":"+con.ports+"/oauth2/authorize?response_type="+con.response_type+"&client_id="
            +con.client_id+"&redirect_uri="+con.url+"user/center&state="+con.state);
        }else{
            var json={
                userid : req.query.userid,
                goodsid : req.query.goodsid,
                specid : req.query.specsid,
                goodsnum : req.query.goodsnum
            };
            var data = JSON.stringify(json);
            console.log(data);
            var port = con.apiPorts;
            var urls = '/cart/add';
            var httprespons = httpreson.addCart;
            global.ghttpheader.httpSendDateToGetrestpost(res, req, urls, httprespons,data,port);
        }

    });

    //ɾ�����ﳵ��Ʒ
    router.get('/del', function(req, res, next) {

       var id = req.query.id;
        var urls = '/cart/del/'+id;
        console.log("delCartUrl:" + urls);
        var port = con.apiPorts;
        var httprespons = httpreson.delCart;
        global.ghttpheader.httpSendDateToGet(req, res, urls, httprespons,port);
    });

    //���¹��ﳵ��Ʒ����
    router.get('/updateCartNumber', function(req, res, next) {
        var id = req.query.id;
        var number = req.query.number;
        var port = con.apiPorts;
        var urls = '/cart/updateCartNumber/'+id+"/"+number;
        console.log("updateCartNumberUrl:" + urls);
        var httprespons = httpreson.updateCartNumber;
        global.ghttpheader.httpSendDateToGet(req, res, urls, httprespons,port);
    });

}