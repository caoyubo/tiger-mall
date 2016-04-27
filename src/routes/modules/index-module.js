/**
 * Created by marlowe on 2015/10/14.
 */
function index(chunk,res,req){
    console.log(chunk);
    var result = JSON.parse(chunk);
    if( typeof result.success != "undefined") {
        var session = result.data;
        req.session.sid = session;
        res.render("index",{
            docs:result
        });
    }else{
       // console.log('21212');
        res.render("index");
    }
}


exports.index = index;