/**
 * Created by ljm on 2015/11/13.
 */

function settlementCount(chunk,req,res){

    var result = JSON.parse(chunk);
    console.log("settlement:");
    console.log(result);
    if (result.code == "0") {
        var data = result.data;
        res.render("order/order",{
            user : req.session.user,
            data : data
        });

    } else {
        /*res.render("order/cartList",{
         user : req.session.user
         });*/
    }

}

function orderCount(chunk,req,res){

    var result = JSON.parse(chunk);
    console.log("settlement:");
    console.log(result);
    if (result.code == "0") {
        var data = result.data;
        res.render("order/order",{
            user : req.session.user,
            data : data
        });

    } else {
        /*res.render("order/cartList",{
         user : req.session.user
         });*/
    }

}

function paymentCount(chunk,req,res){
    var result = JSON.parse(chunk);
    console.log("payment:");
    console.log(result);

    res.json(result);
}

function payCount(chunk,req,res){
    var result = JSON.parse(chunk);
    console.log("payment:");
    console.log(result);
}

exports.settlementCount = settlementCount;
exports.orderCount = orderCount;

exports.paymentCount = paymentCount;
exports.payCount = payCount;
