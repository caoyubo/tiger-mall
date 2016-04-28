/**
 *  装载全局模块
 * @module bfw
 * @author blank
 * @date   20150609
 * @version 1.0
 */

var fs 		  = require("fs");
var path      = require( 'path' ) ;
var projectid = '' ;

exports.init = function( pid ){
	projectid = pid || '';

	//工具类
	global._ 		= require( 'underscore' );

	global.ghttpheader = require('./httpheader');  //请求头获取模块
	global.async = require("async");
	//公用参数
	globalParam();
	
	//配置文件
	global.BConfig 	= require( './bconfig' );
	//BConfig.init( pid );
	
	//语言包
	global.BLang   	= require( './blanguage' );
	

	var berror     	= require( './berror' );
	//异常类型
	global.BServerError 	= berror.BServerError;

	global.BError 	= berror.createError;


	//log 工具
	global.BLog 	= require( './blogger' );
	global.md5 = require('md5');

	//通用函数
	global.BFunc    = require( './bfunction' );

	//父类model
	global.BaseModel= BFunc.lib( 'bmodel' );

	//一些常量
	global.Bdefine = require(CONF_PATH + 'define');

	//dubbo请求工具
	global.BDubbo   = require('./bdubbo');

	//redis工具
	global.BRedis   = require('./bredis');

	//工具类
	global.BUtil    = require('../../core/common/butil');

	// 请求参数
	global.BHttpheader = require('./bhttpheader');  //请求头获取模块

}

/**
 * 全局变量
 */
function globalParam(){
	global.BASE_PATH = path.join(__dirname , '/../../' );
	global.CORE_PATH = BASE_PATH + '/framework/core/';

	//配置文件路径
	//blank 20151027 修改路径
	if(fs.existsSync('/apps/project/node/conf/' + projectid + '/' + 'config.js')){
		global.CONF_PATH = '/apps/project/node/conf/' + projectid + '/';
	}else{
		global.CONF_PATH = BASE_PATH + '../conf/';
	}
	/*
	 if ( projectid != '' ){
	 global.CONF_PATH = '/apps/project/node/conf/' + projectid + '/';
	 }else{
	 global.CONF_PATH = BASE_PATH + 'conf/';
	 }
	 */

}


