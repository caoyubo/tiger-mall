/**
 * Created by ljm on 2015/10/12.
 */

module.exports = function (bfw , router ) {

    //����
    router.get('/order', function(req, res, next) {

        res.render("order/order",{});
    });

    //֧��
    router.get('/payment', function(req, res, next) {

        res.render("order/payment",{});
    });


    //�����б�
    router.get('/orderList', function(req, res, next) {
       // BLog.debug('ffffff');
        res.render("center/orderList",{layout:"centerLayout"});
    });


    //ȡ��������¼
    router.get('/refundList', function(req, res, next) {

        res.render("center/refundList",{layout:"centerLayout"});
    });

    //�ҵ�����
    router.get('/myComments', function(req, res, next) {

        res.render("center/myComments",{layout:"centerLayout"});
    });

}