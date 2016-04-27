/**
 * Created by marlowe on 2015/11/5.
 */
$(function(){
    var compantupdate = $('.compantupdate').text();
    $('.compantupdate').text(formatterDate(compantupdate));
    var isPass = $('.isPass').text();
    if(isPass==0){
        $('.isPass').text('未审核');
    }else{
        $('.isPass').text('审核通过');
    }


    $(".shopupdate").each(function(){
        $(this).text(formatterDate($(this).text()))
    });

    $(".enable").each(function(){
     var enable =   $(this).text();
        if(enable=='false'){
            $(this).text('未审核');
        }else{
            $(this).text('审核通过');
        }
    });

})