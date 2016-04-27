/**
 * Created by ljm on 2015/11/13.
 */

function payment(){
    var cartIds = [];
        $("input[name=cartId]").each(function(index,element){
            var cartId = $(this).val();
            cartIds.push(cartId);
        });

    var url = "/order/payment?cartIds="+cartIds;
    var callback_url = "http://marlowe.tiger.com:50002/order/orderList";//回调函数
    $.ajax({
        type : "GET",
        url : url,
        success : function(result){
            if(result.code == "0"){
                var data = result.data;
                data.callback_url = callback_url;//设置回调函数
                console.log(JSON.stringify(data));
                var url = "http://gateway.yn.com/integration/pay?data="+JSON.stringify(data);
                //var url = "/order/pay?data="+JSON.stringify(data);
                alert(url);
                location.href =  url;
            }else{
                alert("下单失败");
            }
        }
    });

}