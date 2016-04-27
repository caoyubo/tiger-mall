/**
 * Created by marlowe on 2015/10/16.
 */
function list(chunk,req,res){
    var result = JSON.parse(chunk);
    console.log("list:");
    console.log(result);
    if(result.code == "0"){
        var goodsList = result.data.list;
        console.log("goodsList:");
        console.log(goodsList);
        res.render("list",{
            user : req.session.user,
            goodsList : goodsList
        });
    }else{
        /*res.render("list",{
            user:req.session.user
        });*/
    }
}

function detail(chunk,req,res){
    var result = JSON.parse(chunk);
    console.log("detail:");
    console.log(result);
    if(result.code == "0"){
        var goods = result.data.goods;
        var specs = result.data.specs;
        console.log("goods:");
        console.log(goods);
        console.log("specs:");
        console.log(specs);
        console.log(req.session.user);
        res.render("detail",{
            user : req.session.user,
            goods : goods,
            specs : specs
        });
    }else{
        /*res.render("list",{
         user:req.session.user
         });*/
    }
}
exports.list = list;
exports.detail = detail;