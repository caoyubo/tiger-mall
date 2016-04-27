/**
 * Created by ljm on 2015/10/10.
 */
$(function(){

    //全选全不选操作
    $("#toggle-checkboxes_up").click(function(){
        $("input[name='checkItem']").attr("checked",this.checked);
        $("#toggle-checkboxes_down").attr("checked",this.checked);
        $(".item-single").toggleClass("item-selected");
        changePrice();
    });

    $("#toggle-checkboxes_down").click(function(){
        $("input[name='checkItem']").attr("checked",this.checked);
        $("#toggle-checkboxes_up").attr("checked",this.checked);
        $(".item-single").toggleClass("item-selected");
        changePrice();
    });

    //单个商品的选择操作
    var $checkItem = $("input[name='checkItem']");
    $checkItem.click(function(){
        $("#toggle-checkboxes_up").attr("checked",$checkItem.length == $("input[name='checkItem']:checked").length ? true : false);
        $("#toggle-checkboxes_down").attr("checked",$checkItem.length == $("input[name='checkItem']:checked").length ? true : false);
        $(this).parents(".item-single").toggleClass("item-selected");
        changePrice();
    });
});

    //总价格变动
    function changePrice(){
        //总价
        var total = 0;
        $(".item-single").each(function(index,element){
            var price = parseFloat($(this).find(".p-price strong").text());
            var num = parseInt($(this).find("#changeQuantity").val());
            var rowPrice = price*num;
            $(this).find(".p-sum strong").text(rowPrice);
            if($(this).find("input[name='checkItem']").is(':checked')){
                total += rowPrice;
            }
        });

        $(".sumPrice em").text("￥"+total);
    }

//商品数量减操作
function decrement(id){
    var num = parseInt($("#changeQuantity").val());
    if(num < 2){
        $("#decrement").addClass("disabled");
    }else{
        var url = "/cart/updateCartNumber?id="+id+"&number="+(num-1);

        $.ajax({
            url :url,
            type : "GET",
            success : function(result){
                if(result.code == "0"){
                    num--;
                    $("#changeQuantity").val(num);
                    $("#increment").removeClass("disabled");
                    changePrice();
                }
            }
        });
    }
}

//商品数量增操作
function increment(id){
    var num = parseInt($("#changeQuantity").val());
    if(num < 100){
        var url = "/cart/updateCartNumber?id="+id+"&number="+(num+1);
        $.ajax({
            url :url,
            type : "GET",
            success : function(result){
                if(result.code == "0"){
                    num++;
                    $("#changeQuantity").val(num);
                    $("#decrement").removeClass("disabled");
                    changePrice();
                }
            }
        });
    }else{
        $("#increment").addClass("disabled");

    }
}

//删除商品
function del(id){

    var r = confirm("确定删除此商品吗？");

    if(r == true){
        var url = "/cart/del?id="+id;
        location.href = url;
    }

}

//去结算(获取被选中的商品的购物车ID)
function getCartsIds(){
    var cartsIds = [];
    if($(".item-selected").length == 0){
        alert("请先勾选您要购买的商品");
    }else{
        $(".item-selected").each(function(){
            var cartsId = $(this).find("input[name = checkItem]").val();
            cartsIds.push(cartsId);
        });
    }
    alert(cartsIds);
    return cartsIds;

}


function appendText(carts){
    var html = "";
    for(var i in carts){
        html+=  '<div class="item-single  item-item item-selected  " id="product">'
        +'<div class="item-form">'
        +'<div class="cell p-checkbox">'
        +'<div class="cart-checkbox">'
        +'<input type="checkbox" name="checkItem" value="1152042_1" checked="checked" class="jdcheckbox" />'
        + '<label class="checked">勾选商品</label>'
        + '<span class="line-circle"></span>'
        + '</div>'
        + '</div>'
        +'<div class="cell p-goods">'
        +'<div class="goods-item">'
        +'<div class="p-img">'
        +'<a href="/product/detail?id='+carts[i].goodsid+'"target="_blank"><img alt="'+carts[i].goodsname+'" src="'+carts[i].goodsimg+'" /></a>'
        +'</div>'
        +'<div class="item-msg">'
        +'<div class="p-name">'
        +'<a href="/product/detail?id='+carts[i].goodsid+'" target="_blank">'+carts[i].goodsname+'</a>'
        +'</div>'
        +'<div class="p-extend">'
        +'<span class="promise" _giftcard="giftcard_1152042"> </span>'
        +'<span class="promise" _yanbao="yanbao_1152042_">'
        +'</span>'
        +'</div>'
        +'</div>'
        +'</div>'
        +'</div>'
        +'<div class="cell p-props p-props-new">'
        +'<div class="props-txt" title="125ml*20 礼盒装">'
        +'</div>'
        +'</div>'
        +'<div class="cell p-price">'
        +'<strong>'+carts[i].shopprice+'</strong>'
        +'</div>'
        +'<div class="cell p-quantity">'
        +'<div class="quantity-form">'
        +'<a href="javascript:decrement()"  class="decrement" id="decrement">-</a>'
        +'<input type="text" class="itxt" value="'+carts[i].goodsnum+'" id="changeQuantity" disabled style="background: #fff;" />'
        +'<a href="javascript:increment()"  class="increment" id="increment">+</a>'
        +'</div>'
        +'<div class="ac ftx-03 quantity-txt" _stock="stock_1152042">'
        +'</div>'
        +'</div>'
        +'<div class="cell p-sum">'
        +'<strong>'+carts[i].shopprice+'</strong>'
        +'</div>'
        +'<div class="cell p-ops">'

        +'<a id="remove" class="cart-remove" onclick="del('+carts[i].id+')">删除</a>'
        +'<a href="javascript:void(0);" class="cart-follow" id="follow_8888_1152042_1">移到我的关注</a>'
        +'</div>'
        +'</div>'
        +'<div class="item-extra">'
        +'</div>'
        +'<div class="item-line"></div>'
        +'</div>'
    }
    $(".item-list").html(html);
}




