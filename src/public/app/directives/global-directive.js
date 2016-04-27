/**
 * Created by dragon on 15-6-27.
 */

/**
 * 替换下拉
 */
mainApp.directive('leftMenu', function () {
    return {
        restrict:'E',
        replace: true,
        template:"<span class='menu-text'>{{menu.name}}</span>"
    };
});

/**
 *   system Switch
 */
mainApp.directive('systemSwitch', function () {
    return {
        restrict:'E',
        replace: true,
        template:"<ul class='user-menu dropdown-menu dropdown-yellow' >"+
        "<li ng-repeat='sys in systems' ng-click='sysSelect(sys)'>"+
        "<a href='{{sys.url}}'>"+
        "<i class='ace-icon glyphicon glyphicon-flag'></i>"+
        "{{sys.name}}"+
        "</a>"+
        "</li>"+
        "</ul>"

    };
});

/**
 * system title
 */
mainApp.directive('systemTitle', function () {
    return {
        restrict:'E',
        replace: true,
        scope : {
            title : '@'
        },
        template:"<a href='#' class='navbar-brand'>"+
        "<small>"+
        "<i class='glyphicon glyphicon-th-large'></i><c ng-bind='title'/></small>"+
        "</a>"
    };
});

/**
 * user
 */
mainApp.directive('userName', function () {
    return {
        restrict:'E',
        replace: true,
        template:"<span class='user-info'>"+
        "<small>欢迎,</small>"+
        "{{user.name}}"+
        "</span>"
    };
});

mainApp.directive('showmenuTitle',function(){
	return{
		restrict:'AEC',
		replace:true,
		template:"<ul class='breadcrumb'>"+
					"<li>"+
						"<i class='ace-icon {{menuItem.icon}}'>"+
						"</i>"+
						"<a href='#'>"+
							"<a ng-bind='menuItem.name'/>"+
						"</a>"+
					"</li>"+
					"<li ng-show='{{menuItem.leaf}}' class='active'>"+
						"<c ng-bind='subMenuItem.name'/>"+
					"</li>"+
                    "<li ng-repeat='plus in menuItem.plus'>"+
                        "<a href='{{plus.href}}'>"+
                        "<c ng-bind='plus.name'/>"+
                        "</a>"+
                    "</li>"+
				"</ul>"
	};
});


/**
 * 菜单点击
 */
mainApp.directive('changeClass', function () {
    return {
        restrict:'C',
        scope: {},
        link: function(scope, element, attrs) {
        	  element.bind("click", function(x) {
                  if(!element.children().hasClass("submenu")){
                      element.parent().children().removeClass("active");
                      element.parent().children().removeClass('open');
        			  element.siblings().children("ul").children().removeClass("active");
        			  element.addClass("active");
                      element.parent().find('.submenu').css('display', '');
                  }else if(element.children().children().hasClass("active")){
                      element.parent().siblings().removeClass("active");
                      element.parent().children().removeClass("open");
                      element.siblings().find('.submenu').css('display', '');
                      element.addClass("active open");
                  }
              });
        }
    };
});

/**
 * 子菜单点击
 */
mainApp.directive('changesubClass', function () {
    return {
        restrict:'C',
        scope: {},
        link: function(scope, element, attrs) {
        	  element.bind("click", function(x) {
                  element.parent().parent().parent().find('li').removeClass("active");

                  element.addClass("active");
              });
        }
    };
});

/**
 * 格式化时间
 */
mainApp.directive('dateFormat', ['$filter',function($filter) {
    var dateFilter = $filter('date');
    return {
        require: 'ngModel',
        link: function(scope, elm, attrs, ctrl) {

            function formatter(value) {
                return dateFilter(value, 'yyyy-MM-dd'); //format
            }

            function parser() {
                return ctrl.$modelValue;
            }

            ctrl.$formatters.push(formatter);
            ctrl.$parsers.unshift(parser);

        }
    };
}]);


