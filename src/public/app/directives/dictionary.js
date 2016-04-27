/**
 * 构造字典item
 */
console.log('dictionary');
mainApp.directive('dictionaryItem', function () {
    return {
        restrict:'E',
        replace: true,
        template:"<tr><td>"+
            "<a href='#' class='navbar-brand'>"+
            "<small><i class='glyphicon glyphicon-th-large'></i>test</small>"+
            "</a>"+
        "</td></tr>"
    };
});