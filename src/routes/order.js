/**
 * Created by ljm on 2015/10/12.
 */

module.exports = function (bfw , router ) {

    //订单
    router.get('/order', function(req, res, next) {

        res.render("order/order",{});
    });

    //支付
    router.get('/payment', function(req, res, next) {

        res.render("order/payment",{});
    });


    //订单列表
    router.get('/orderList', function(req, res, next) {
       // BLog.debug('ffffff');
        res.render("center/orderList",{layout:"centerLayout"});
    });


    //取消订单记录
    router.get('/refundList', function(req, res, next) {

        res.render("center/refundList",{layout:"centerLayout"});
    });

    //我的评论
    router.get('/myComments', function(req, res, next) {

        res.render("center/myComments",{layout:"centerLayout"});
    });

}