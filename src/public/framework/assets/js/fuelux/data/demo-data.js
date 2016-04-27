var DataSourceTree = function(options) {
	this._data 	= options.data;
	this._delay = options.delay;
}

DataSourceTree.prototype.data = function(options,callback) {
	var self = this;
	var $data = null;

	if(!("name" in options) && !("type" in options)){
		$data = this._data;//the root tree
		callback({ data: $data });
		return;
	}else if("type" in options && options.type == "folder") {
		if("sub" in options && "children" in options.sub){
			$data = options.sub.children;
		}else{
			$data = {}//no data
		}
	}
	
	if($data != null)//网络请求
		setTimeout(function(){
			
			console.log(options);
			
			
			//进行网络请求
			$data = tree_data1;
			
			callback({ data: $data });
			} , parseInt(Math.random() * 500) + 200);
};

var treeDataSource;

var tree_data = {
	'permission' : {id : 1 , name: '权限管理', type: 'folder'}	,
	'home' : {id : 2 , name: '首页', type: 'item'}
}

var tree_data1 = {
	'resource' : {id : 3 , name: '资源管理', type: 'item'},
	'role' : {id : 4 , name: '角色管理', type: 'item'},
	'user' : {id : 5 , name: '权限管理', type: 'item'}
}


