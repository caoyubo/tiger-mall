/**
 * Created by dragon on 15-6-24.
 * 全局配置
 */

/**
 * 分页设置
 */
function setPageNum(resPage){
	var pageNumbers = new Array();
	for (i=1; i<=resPage.data.totalPages; i++) {
		var pageNum = new Object();
		pageNum.number = i;
		if (i == resPage.data.currentPage){
			pageNum.clazz = "active";
		} 
		pageNumbers.push(pageNum);
	}
	return pageNumbers;
};

/**
 * 分页代码
 * @param total_size 有多少条记录
 * @param curr_page 当前页数
 * @param page_size 每页多少条
 * @returns {string}
 */
function page(total_size,curr_page,page_size){


	total_size = parseInt(total_size) || 1;
	curr_page  = parseInt(curr_page) || 1;
	page_size  = parseInt(page_size) || 20;
	var total_page = Math.ceil(total_size/page_size);

	var html = '<ul class="pagination">'
		+ '<li class="paginate_button disabled" aria-controls="sample-table-2" tabindex="0">'
		+ '<a>共<span class="red"> ' + total_page + ' </span>页</a></li>';

	var display_class = '';
	var pre_page = curr_page - 1;
	if(total_page<=1 || curr_page<=1){
		display_class = 'disabled';
		html += '<li class="disabled"><a  aria-label="Previous"><span aria-hidden="true">&laquo;</span></a></li>';
	}else{
		html += '<li  ng-click="pageSkip('+(curr_page-1)+')"><a aria-label="Previous"><span aria-hidden="true"> &laquo; </span></a></li>';
	}

	var showpage_size = 1;

	var per_page_num = curr_page -1 ;
	var next_page_num = curr_page+1;
	var tmp_html = '<li class="active disabled" ><a>'+curr_page+'</a></li>';
	while(true){
		if(showpage_size>=5){
			break;
		}
		var flag = false;
		if(per_page_num >0 ){
			tmp_html = '<li  ng-click="pageSkip('+per_page_num+')"><a>'+per_page_num+'</a></li>' + tmp_html;
			per_page_num--;
			showpage_size++;
			flag = true;
		}
		if(next_page_num <= total_page){
			tmp_html = tmp_html + '<li  ng-click="pageSkip('+next_page_num+')"><a>'+next_page_num+'</a></li>' ;
			next_page_num++;
			showpage_size++;
			flag = true;
		}
		if(!flag){
			break;
		}
	}
	html += tmp_html;

	if(curr_page>=total_page){
		//display_class = 'disabled';
		html += '<li class="disabled"><a  aria-label="Previous"><span aria-hidden="true">&raquo;</span></a></li>';
	}else{
		html += '<li ng-click="pageSkip('+(curr_page+1)+')"><a  aria-label="Previous"><span aria-hidden="true">&raquo;</span></a></li>';
	}


	html += '</ul>';

	return html;
}

/**
 * 拼接url
 * @param url
 * @param params
 * @returns {string}
 */
function getUrl(url,params){
	if(!params){
		return url;
	}
	url += '?';
	for(var k in params){
		if(!params[k]){
			continue;
		}
		url += k + '=' + params[k] + '&';
	}
	url = url.substr(0,url.length-1);
	return url;
}

/**
 * 得到格式化的时间格式
 * @author jiaming
 * @date 2015-07-13
 * @param time 时间戳 单位：秒或毫秒
 * @param format 返回时间格式 默认格式是2015-05-10 10：04：20
 * @return String 日期字符串
 */
function getDateFormat(time,format){
	if(time.toString().length == 10){
		time = time * 1000;
	}
	format = format || "yyyy-MM-dd hh:mm:ss";
	Date.prototype.format = function(format) {
		var date = {
			"M+": this.getMonth() + 1,
			"d+": this.getDate(),
			"h+": this.getHours(),
			"m+": this.getMinutes(),
			"s+": this.getSeconds(),
			"q+": Math.floor((this.getMonth() + 3) / 3),
			"S+": this.getMilliseconds()
		};
		if (/(y+)/i.test(format)) {
			format = format.replace(RegExp.$1, (this.getFullYear() + '').substr(4 - RegExp.$1.length));
		}
		for (var k in date) {
			if (new RegExp("(" + k + ")").test(format)) {
				format = format.replace(RegExp.$1, RegExp.$1.length == 1
					? date[k] : ("00" + date[k]).substr(("" + date[k]).length));
			}
		}
		return format;
	};
	return new Date(time).format(format);
};

/**
 * 克隆对象
 * @param obj
 * @returns {Clone}
 */
function cloneObj(obj){
	var o = {};
	for(var a in obj){
		o[a] = obj[a];
	}
	return o;
}
