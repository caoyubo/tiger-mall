/**
 * Created by ljm on 2015/10/22.
 */
/**
 * Created by ljm on 2015/10/8.
 */

$(function(){

    $("#allShop").hover(function(e){
            $("#itemPanel").css("display","block");
    },function(e){});

    $(".dd-inner .item").hover(function(e){
        $(".dd-inner").next(".dorpdown-layer").css("display","none");
        $(".dd-inner").next(".dorpdown-layer").find(".item-sub").removeClass("hover");
        $(".dd-inner .item").removeClass("hover");
        $(this).addClass("hover");
        var index = $(this).index();
        $(".dd-inner").next(".dorpdown-layer").css("display","block");
        $(".dd-inner").next(".dorpdown-layer").find(".item-sub").eq(index).addClass("hover");
    },function(e){
    });

    $("#itemPanel").hover(function(e){
    },function(e){
        $(".dd-inner .item").removeClass("hover");
        $(".dd-inner").next(".dorpdown-layer").css("display","none");
        $(".dd-inner").next(".dorpdown-layer").find(".item-sub").removeClass("hover");
        $(this).css("display","none");
    });


    $(".tab .tab-item").hover(function(){

        $(".tab .tab-item").removeClass("tab-selected");
        $(this).addClass("tab-selected");
        var index = $(this).index();
        $(this).parents(".mt").next(".mc").find(".main").removeClass("main-selected");
        $(this).parents(".mt").next(".mc").find(".main").css("display","none");
        $(this).parents(".mt").next(".mc").find(".main").eq(index).addClass("main-selected");
        $(this).parents(".mt").next(".mc").find(".main").eq(index).css("display","block");
    },function(){

    });

})
