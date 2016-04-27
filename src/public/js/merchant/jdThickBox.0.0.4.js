/*
	jdThickbox
*/
(function($) {
    $.extend($.browser, {
        client: function() {
            return {
                width: document.documentElement.clientWidth,
                height: document.documentElement.clientHeight,
                bodyWidth: document.body.clientWidth,
                bodyHeight: document.body.clientHeight
            };
        },
        scroll: function() {
            return {
                width: document.documentElement.scrollWidth,
                height: document.documentElement.scrollHeight,
                bodyWidth: document.body.scrollWidth,
                bodyHeight: document.body.scrollHeight,
                left: document.documentElement.scrollLeft + document.body.scrollLeft,
                top: document.documentElement.scrollTop + document.body.scrollTop
            };
        },
        screen: function() {
            return {
                width: window.screen.width,
                height: window.screen.height
            };
        },
        isIE6: $.browser.msie && $.browser.version == 6,
        isMinW: function(val) {
            return Math.min($.browser.client().bodyWidth, $.browser.client().width) <= val;
        },
        isMinH: function(val) {
            return $.browser.client().height <= val;
        }
    })
})(jQuery);
(function($) {
    $.fn.jdPosition = function(option) {
        var s = $.extend({
            mode: null
        }, option || {});
        switch (s.mode) {
        default:
        case "center":
            var ow = $(this).outerWidth(),
                oh = $(this).outerHeight();
            var w = $.browser.isMinW(ow),
                h = $.browser.isMinH(oh);
	
			//var left = $.browser.scroll().left + Math.max(($.browser.client().width - ow) / 2, 0) + "px";
			//var top = (!$.browser.isIE6) ? (h ? $.browser.scroll().top : ($.browser.scroll().top + Math.max(($.browser.client().height - oh) / 2, 0) + "px")) : (($.browser.scroll().top <= $.browser.client().bodyHeight - oh) ? ($.browser.scroll().top + Math.max(($.browser.client().height - oh) / 2, 0) + "px") : ($.browser.client().height - oh)/2 + "px") ;
			
			$.page = function (){}
			$.page.doc = function(){
				return document.compatMode == "BackCompat" ? document.body : document.documentElement;
			}
			$.page.clientWidth = function(){
				return $.page.doc().clientWidth;
			}
			$.page.clientHeight = function(){
				return $.page.doc().clientHeight;
			}
			$.page.docWidth = function(){
				return Math.max($.page.doc().clientWidth,$.page.doc().scrollWidth);		 
			}
			$.page.docHeight = function(){
				return Math.max($.page.doc().clientHeight,$.page.doc().scrollHeight);		 
			}
			var scrollbarWidth = $.page.docHeight() != $.page.clientHeight() ? 16 :0;
			var top = ( $.page.clientHeight() - oh ) / 2;
			var left = ( $.page.clientWidth() - scrollbarWidth - (ow) ) / 2;
            // 滚动条滚动到下面时，弹层也应该在当前可视区域的中间
            top = $.browser.scroll().top + top;
            $(this).css({
                left: left,
                top: top
            });
            break;
        case "auto":
            break;
        case "fixed":
            break
        }
    }
})(jQuery);
(function($) {
    $.fn.jdThickBox = function(option, callback) {
        if (typeof option == "function") {
            callback = option;
            option = {}
        };
        var s = $.extend({
            type: "text",
            source: null,
            width: null,
            height: null,
            title: null,
            _frame: "",
            _div: "",
            _box: "",
            _con: "",
            _loading: "thickloading",
            close: false,
            _close: "",
            _fastClose: false,
            _close_val: "×",
            _titleOn: true,
            _title: "",
            _autoReposi: false,
            _countdown: false,
            hideClose: false
        }, option || {});
        var object = (typeof this != "function") ? $(this) : null;
        var timer;
        var close = function() {
            clearInterval(timer);
            $(".thickframe").add(".thickdiv").hide();
            $(".thickbox").empty().remove();
            if (s._autoReposi) {
                $(window).unbind("resize.jdThickBox").unbind("scroll.jdThickBox")
            }
        };
        if (s.close) {
            close();
            return false
        };
        var reg = function(str) {
            if (str != "") {
                return str.match(/\w+/)
            } else {
                return ""
            }
        };
        var init = function(element) {
            if ($(".thickframe").length == 0 || $(".thickdiv").length == 0) {
                $("<iframe class='thickframe' id='" + reg(s._frame) + "' marginwidth='0' marginheight='0' frameborder='0' scrolling='no'></iframe>").appendTo($(document.body));
                $("<div class='thickdiv' id='" + reg(s._div) + "'></div>").appendTo($(document.body))
            } else {
                $(".thickframe").add(".thickdiv").show()
            };
            $("<div class='thickbox' id='" + reg(s._box) + "'></div>").appendTo($(document.body));
            if (s._titleOn) initTitle(element);
            $("<div class='thickcon' id='" + reg(s._con) + "' style='width:" + s.width + "px;height:" + s.height + "px;'></div>").appendTo($(".thickbox"));
            if (s._countdown) initCountdown();
            $(".thickcon").addClass(s._loading);
            reposi();
            initClose();
            inputData(element);
            if (s._autoReposi) {
                $(window).bind("resize.jdThickBox", reposi).bind("scroll.jdThickBox", reposi)
            };
            if (s._fastClose) {
                $(document.body).bind("click.jdThickBox", function(e) {
                    e = e ? e : window.event;
                    var tag = e.srcElement ? e.srcElement : e.target;
                    if (tag.className == "thickdiv") {
                        $(this).unbind("click.jdThickBox");
                        close()
                    }
                })
            }
        };
        var initCountdown = function() {
            var x = s._countdown;
            $("<div class='thickcountdown' style='width:" + s.width + "'><span id='jd-countdown'>" + x + "</span>Ãëºó×Ô¶¯¹Ø±Õ</div>").appendTo($(".thickbox"));
            timer = setInterval(function() {
                x--;
                $("#jd-countdown").html(x);
                if (x == 0) {
                    x = s._countdown;
                    close()
                }
            }, 1000)
        };
        var initTitle = function(element) {
            s.title = (s.title == null && element) ? element.attr("title") : s.title;
            $("<div class='thicktitle' id='" + reg(s._title) + "' style='width:" + s.width + "'><span>" + s.title + "</span></div>").appendTo($(".thickbox"))
        };
        var initClose = function() {
            if (s._close != null) {
                var _close1 = $("<a href='#' class='thickclose' id='" + reg(s._close) + "'>" + s._close_val + "</a>").appendTo($(".thickbox"));
                if(s.hideClose){_close1.hide();}
                $(".thickclose").one("click", function() {
                    close();
                    return false
                })
            }
        };
        var inputData = function(element) {
            s.source = (s.source == null) ? element.attr("href") : s.source;
            switch (s.type) {
            default:
            case "text":
                $(".thickcon").html(s.source);
                $(".thickcon").removeClass(s._loading);
                if (callback) {
                    callback()
                };
                break;
            case "html":
                $(s.source).clone().appendTo($(".thickcon")).show();
                $(".thickcon").removeClass(s._loading);
                if (callback) {
                    callback()
                };
                break;
            case "image":
                s._index = (s._index == null) ? object.index(element) : s._index;
                $(".thickcon").append("<img src='" + s.source + "' width='" + s.width + "' height='" + s.height + "'>");
                s.source = null;
                $(".thickcon").removeClass(s._loading);
                if (callback) {
                    callback()
                };
                break;
            case "ajax":
            case "json":
                if (callback) {
                    callback(s.source, $(".thickcon"), function() {
                        $(".thickcon").removeClass(s._loading)
                    })
                };
                break;
            case "iframe":
                $("<iframe src='" + s.source + "' marginwidth='0' marginheight='0' frameborder='0' scrolling='no' style='width:" + s.width + "px;height:" + s.height + "px;border:0;'></iframe>").appendTo($(".thickcon"));
                $(".thickcon").removeClass(s._loading);
                if (callback) {
                    callback()
                };
                break
            }
        };
        var reposi = function() {
            var w1 = $(".thickcon").outerWidth(),
                h1 = (s._titleOn ? $(".thicktitle").outerHeight() : 0) + $(".thickcon").outerHeight();
            $(".thickbox").css({
                width: w1 + "px",
                height: h1 + "px"
            });
            $(".thickbox").jdPosition({
                mode: "center"
            });
            if ($.browser.isIE6) {
                var ow = $(".thickbox").outerWidth(),
                    oh = $(".thickbox").outerHeight();
                var w2 = $.browser.isMinW(ow),
                    h2 = $.browser.isMinH(oh);
                $(".thickframe").add(".thickdiv").css({
                    width: w2 ? ow : "100%",
                    height: Math.max($.browser.client().height, $.browser.client().bodyHeight) + "px"
                })
            }
        };
        if (object != null) {
            object.click(function() {
                init($(this));
                return false
            })
        } else {
            init()
        }
    };
    $.jdThickBox = $.fn.jdThickBox
})(jQuery);

function jdThickBoxclose() {
    $(".thickclose").trigger("click");
}; 

function thickBoxResize(){
    var h = $(".thickcon>div").height();
    $(".thickcon").height(h+20);
    $(".thickbox").height(h+80);
}
