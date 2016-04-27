var DataSourceTree = function(options) {
	this._data 	= options.data;
}
DataSourceTree.prototype.data = function(options,callback) {
	var self = this;
	var $data = null;

	if(!("name" in options) && !("type" in options)){
		$data = this._data;//the root tree
		callback({ data: $data });
		return;
	}
	
	//网络请求,更新子菜单
	roleMains.findTree({"pid":options.id})
	.then(function(success){
		callback({ data: success.data });
	},function(error){
		alert(error.mes);
	});
};

var treeDataSource;
var roleMains;
