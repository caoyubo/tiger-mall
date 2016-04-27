/**
 * Created by marlowe on 2015/10/28.
 */
var con = BConfig.conf('conf');
function  protocolf(chunks,req,res){
    console.log(chunks);
    var result = JSON.parse(chunks);
    if(result.data==1){
        res.json(result);   //添加成功
    }else{
         var step = result.data.step;
        if(step==1){
            res.redirect('/merchant/company');
        }else if(step==2){
            res.redirect('/merchant/billing');
        }else if(step == 3){
            res.redirect('/merchant/shop');
        }
    }
}

function  shop(chunks,req,res){
    var result = JSON.parse(chunks).data;
    res.render('merchant/shop',{
        layout:'shopLayout',
        user:req.session.user,
        shoptitle:con.shoptitle,
        keywords:con.keywords,
        description:con.description,
        title:'店铺信息',
        content :result
    });
}
/*
 * marlowe
 * ajax 公共函数
 */
function  public(chunks,req,res){
    var result =  JSON.parse(chunks);
    var code = result.code;
    var content = result.data;
    res.json(result);
}
exports.shop = shop;
exports.protocolf = protocolf;
exports.public = public;