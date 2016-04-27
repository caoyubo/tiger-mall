/**
 * Created by dragon on 15-6-24.
 */

var mainApp = angular.module("mainApp", 
		[
		 	"ui.router", "Routing", "BaseService"
		]
);

mainApp.config(function($stateProvider, $urlRouterProvider, routerProvider, $httpProvider,$locationProvider) {

	$stateProvider.state('index', {
		url : '/index',
		views : {
			'' : {
				templateUrl : '/templates/root.html'
			},
			'pageHome@index' : {
				templateUrl : '/templates/home/home.html'
			}
		}
	});

    $urlRouterProvider.otherwise(grobalConfig.default_router);

	routerProvider.setCollectionUrl(grobalUrl.userMenu);
	$locationProvider.html5Mode({enabled: true,requireBase: false});

	$httpProvider.defaults.headers.put['Content-Type'] = 'application/x-www-form-urlencoded';
    $httpProvider.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded;charset=utf-8';  
    $httpProvider.defaults.headers.post['Accept'] = 'application/json, text/javascript, */*; q=0.01';  
    $httpProvider.defaults.headers.post['X-Requested-With'] = 'XMLHttpRequest';  

	// Override $http service's default transformRequest
	$httpProvider.defaults.transformRequest = [function(data) {
	    /**
	     * The workhorse; converts an object to x-www-form-urlencoded serialization.
	     * @param {Object} obj
	     * @return {String}
	     */
	    var param = function(obj) {
	        var query = '';
            var name, value, fullSubName, subName, subValue, innerObj, i;
            for (name in obj) {
                value = obj[name];
                if (value instanceof Array) {
                    for (i = 0; i < value.length; ++i) {
                        subValue = value[i];
                        fullSubName = name + '[' + i + ']';
                    innerObj = {};
                    innerObj[fullSubName] = subValue;
                    query += param(innerObj) + '&';
                }
            } else if (value instanceof Object) {
                for (subName in value) {
                    subValue = value[subName];
                    fullSubName = name + '[' + subName + ']';
                    innerObj = {};
                    innerObj[fullSubName] = subValue;
                    query += param(innerObj) + '&';
                }
            } else if (value !== undefined && value !== null) {
                query += encodeURIComponent(name) + '='
                        + encodeURIComponent(value) + '&';
                }
            }
            return query.length ? query.substr(0, query.length - 1) : query;
        };
 
        return angular.isObject(data) && String(data) !== '[object File]' ? param(data) : data;
	}];
});

