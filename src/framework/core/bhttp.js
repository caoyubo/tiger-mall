/**
 * http 模块
 * @module bfw
 * @author blank
 * @date   20150608
 * @version 1.0
 */

 
var bhttp  = {} ;

var urlutil    	= require('url');
var querystring = require('querystring');
var request 	= require('request');
//允许请求列表
var methodlist  = [ 'get' , 'post' ];

//入口参数
var utilparam = {
         			req 		: null ,
         			res 		: null ,
         			method      : 'GET' ,
         			url 		: '' ,
         			params 		: null ,
         			headers 	: null,
         			callback 	: function (error, response, data){
					}
				};

/**
 * http 工具方法
 * @method httputil
 */
function httputil( param ){
	var p = {} ;
	_.extend( p , utilparam  );
	_.extend( p , param  );
	
	//BLog.debug( p );
	
	var options = getOptions( p.req , p.method , p.url , p.params , p.headers);
	request(options, p.callback );
}


function getOptions(req , method ,  url , params , headers){
	//设置默认的UA，cookie 
	var options = {
			headers: {
				//'User-Agent'	: req['headers'][ 'user-agent' ],
				//'cookie'        : req.headers.cookie,
				'Content-Type'	: 'application/x-www-form-urlencoded;charset=utf-8' 
		}
	};
	method = method || 'get' ;
	method = method.toUpperCase();
	
	options.method = method;
	options.url    = url ;
	
	//参数调整
	if ( params ){
		if (method == 'GET' ){
			var urlinfo  = urlutil.parse(url);
			//var tmpquery = urlinfo.query;
			
			var urlstr   = urlinfo.protocol + '//' + urlinfo.host + urlinfo.pathname ;
			var paramsstr= querystring.stringify(_.extend( querystring.parse( urlinfo.query ) , params ));
			
			options.url = urlstr + '?' + paramsstr;
            console.log(urlinfo);
			
		}else if((method == 'POST' )){
			options.form = params;
		}
	}
	
	if ( headers ){
		options.headers = _.extend( options.headers , headers);
	}
	
	return options;
}


/**
 * http get方法
 * @method get
 */
bhttp.get = function ( param ){
	param.method = 'GET' ;
	httputil( param ); 
}

/**
 * http post方法
 * @method post
 */
bhttp.post = function ( param ){
	param.method = 'POST' ;
	httputil( param );
}

/**
 * http 指定方法请求
 * @method request
 */
bhttp.request = function ( param ){
	param.method = param.method || 'get' ;
	if (_.indexOf(methodlist , param.method ) == -1 ){
		param.method = 'get';
	}
	httputil( param );
}


exports.bhttp = bhttp ; 
