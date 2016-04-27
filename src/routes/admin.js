/**
 * 主路由
 * @author blank
 * @date 20150619
 * @param app
 */

module.exports = function (bfw , router ) {

	router.use(function(req, res, next){
		next();
	});

    /**
     * api路由
     */
    router.all('/api/:act/:op?', function(req, res, next) {
        BLog.debug( 'api deal... ' + req.params.act + ' ' +  req.params.op );
        req.params.op = req.params.op || 'index';

        BFunc.controller(bfw , req , res, next);
        //next();
    });


    /**
     * 所有地址路由
     */
    router.get('/*', function(req, res, next) {

        var data = {
            title: BLang.get('system_title') ? BLang.get('system_title') : '管理系统',
            member: {uname: 'blank'}
        };

        bfw.output( req , res , data , 'template' , 'admin' );
    });
};
