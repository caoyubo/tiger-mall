/**
 * 主路由
 * @author blank
 * @date 20150619
 * @param app
 */

module.exports = function (bfw , router ) {
	var httpreson = require("./modules/index-module");
	var con = BConfig.conf('conf');
	/*router.use(function(req, res, next){
		BLog.debug( 'begin......' );
		next();
	});*/
	router.get('/', function(req, res, next) {
		global.async.parallel([
			function(callback) {
				var port = con.apiPorts;
				var urls = "/goodsclass/find/"+ con.appid;
				var reson = function resonClass(chunk, req, res) {
					callback(null, chunk);
				}
				global.ghttpheader.httpSendDateToGet(req, res, urls, reson,port);
			}
		], function (err, results) {
			if(err){
				console.log("error!!!!!!");
			}else{
				var goodsClass = null;
				for(var i in results){
					if(JSON.parse(results[i]).code == "0"){
						if(i == 0){
							goodsClass = JSON.parse(results[i]).data
						}
					}
				}
				if(goodsClass!=null){
					console.log("goodsClass:");
					console.log(goodsClass);
					var user = req.session.user;
					res.render("index",{
						user : user,
						goodsClass : goodsClass
					});
				}
			}
		});
	});

	 //登陆
	router.get('/user',function(req,res){
		res.redirect("http://"+con.httpurl+":"+con.ports+"/oauth2/authorize?response_type="+con.response_type+"&client_id="+con.client_id+"&redirect_uri="+con.url+"user/center&state="+con.state);
	})


	/**
	 * api路由
	 */

	/*router.get('/:act/:op?', function(req, res, next) {
		BLog.debug( 'api deal... ' + req.params.act + ' ' +  req.params.op );
		BFunc.controller(bfw , req , res, next);
		//next();
	});
*/

};
