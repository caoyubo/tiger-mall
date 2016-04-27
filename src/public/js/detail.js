/**
 * Created by ljm on 2015/10/8.
 */
$(function(){
    $(".float-nav-wrap .ui-switchable-item").click(function(){
        var index = $(this).index();

        $(".float-nav-wrap .ui-switchable-item").removeClass("curr");
        $(this).addClass("curr");
        $(".float-nav-wrap").next(".mc").find(".ui-switchable-panel").css("display","none");
        $(".float-nav-wrap").next(".mc").find(".ui-switchable-panel").eq(index).css("display","block");


    });

    $("#product-detail .ui-switchable-item").click(function(){

        var index = $(this).index();

        $("#product-detail .ui-switchable-item").removeClass("curr");
        $(this).addClass("curr");
        $("#product-detail").find(".ui-switchable-panel").css("display","none");
        $("#product-detail").find(".ui-switchable-panel").eq(index).css("display","block");


    });

    specGroup();
});

function addAmount(){
    var num = parseInt($("#buy-num").val());
    if(num < 100){
        num ++ ;
        $("#buy-num").val(num);
    }
}

function reduceAmount(){
    var num = parseInt($("#buy-num").val());
    if(num > 1){
        num -- ;
        $("#buy-num").val(num);
    }

}

function modifyAmount(){
    var num = parseInt($("#buy-num").val());

    if(num > 100){
        num = 100;
        $("#buy-num").val(num);
    }else if(num < 1){
        num = 1;
        $("#buy-num").val(num);
    }else if(isNaN(num)){
        num = 1 ;
        $("#buy-num").val(num);
    }

}

//加入购物车
function createCart(){
    var data = $("#formData").serialize();
    //alert(data);
    location.href = "/cart/add?"+data;
}



function selectSpec(obj){
    $(obj).parents(".attrVal").find(".item").removeClass("selected");
    $(obj).parent(".item").addClass("selected");
    specGroup();
}

//查找对应规格的价格
function specGroup(){
    var specs = JSON.parse($("#specs").val());
    var spec = [];
    var price  = 0;
    $(".attrVal").each(function(index,element){
        var specid = $(this).find(".selected").find("input[name=specid]").val();
        var attrid = $(this).find(".selected").find("input[name=attrid]").val();
        var sp = '{"'+specid+'":"'+attrid+'"}';
        spec.push(sp);
    });
    for(var i in specs){
        var content = true;
        for(var j=0;j<spec.length;j++){
            var bool = specs[i].spec.indexOf(spec[j]);
            if(bool<0){
                content = false;
            }
        }
        if(content){
            price = specs[i].shopprice;
            $("#specsid").val(specs[i].id);
            break;
        }
    }
    $("#jd-price").text("￥"+price);
}


