/**
 * Created by ljm on 2015/10/10.
 */

$(function(){
    $(".sm-wrap").click(function(){
        var text = $(".sm-wrap").text();
        if(text == "收起"){
            $(".J_selectorFold").each(function(index,obj){
                if(index > 2){
                    $(this).css("display","none");
                }
            });
            $(".sm-wrap").removeClass("opened");
            $(".sm-wrap").html("更多选项（口味、产地、价位 等）<i></i>");
        }else{
            $(".J_selectorFold").css("display","block");
            $(".sm-wrap").addClass("opened");
            $(".sm-wrap").html("收起<i></i>");
        }

    });
});



function page_jump(pages){
    var pageNum = parseInt($("#page_jump_num").val());
    if(pageNum>parseInt(pages)){
        pageNum = parseInt(pages);
    }

    location.href = "/product/list?pageNum="+pageNum;
}