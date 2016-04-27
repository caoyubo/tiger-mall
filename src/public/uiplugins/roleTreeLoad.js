$(document).ready(function(){
	//加载树
	$('#roleTree').ace_tree({
		dataSource: treeDataSource ,
		multiSelect:true,
		loadingHTML:'<div class="tree-loading"><i class="ace-icon fa fa-refresh fa-spin blue"></i></div>',
		'open-icon' : 'ace-icon tree-minus',
		'close-icon' : 'ace-icon tree-plus',
		'selectable' : true,
		'selected-icon' : 'ace-icon fa fa-check',
		'unselected-icon' : 'ace-icon glyphicon glyphicon-ok'
	});

	
	//树回调
	$('#roleTree').on('updated', function(e, result) {
		//result.info  >> an array containing selected items
		//result.item
		//result.eventType >> (selected or unselected)
		console.log("e:"+e);
		console.log("result:"+result);
	})
	.on('selected', function(e) {
		console.log("e:"+e);
	})
	.on('unselected', function(e) {
		console.log("e:"+e);
	})
	.on('opened', function(e) {
		console.log("e:"+e);
	})
	.on('closed', function(e) {
		console.log("e:"+e);
	});
	
});