/**
 * Created by ljm on 2015/10/20.
 */

function addCart(chunk,req,res) {
    var result = JSON.parse(chunk);
    console.log("addCart:");
    console.log(result);
    if (result.code == "0") {
       res.redirect("/cart/cartList");

    } else {

    }
}

function findCart(chunk,req,res) {
    var result = JSON.parse(chunk);
    console.log("findCart:");
    console.log(result);
    if (result.code == "0") {
        var carts = result.data;
        res.render("order/cart",{
            user : req.session.user,
            carts : carts
        });

    } else {
        /*res.render("order/cartList",{
            user : req.session.user
        });*/
    }
}

function delCart(chunk,req,res) {
    var result = JSON.parse(chunk);
    console.log("delCart:");
    console.log(result);
    if (result.code == "0") {
        res.redirect("/cart/cartList");

    } else {
       res.redirect("/cart/cartList");
    }
}

function updateCartNumber(chunk,req,res) {
    var result = JSON.parse(chunk);
    console.log("delCart:");
    console.log(result);
    res.json(result);
}

exports.addCart = addCart;
exports.findCart = findCart;
exports.delCart = delCart;
exports.updateCartNumber = updateCartNumber;
