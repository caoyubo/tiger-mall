/**
 * tiger-mall
 * @author marlowe 
 * @date   20151113
 * @version 1.0.0
 */

//设置项目ID
var projectid = process.env.APP_PROJECTID || 'tiger-mall' ;

// 运行框架
require('./framework/bfw').run(projectid);
