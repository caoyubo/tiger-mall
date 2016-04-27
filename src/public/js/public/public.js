/**
 * Created by marlowe on 2015/10/29.
 */
/*
 * 所有国家
 * @marlowe
 * update 2015-10-26
 */
function region_all_country() {
    var urls = '/user/region/all';
    $.ajax({
        url: urls,
        type: 'GET',
        success: function (result) {
            var region = '';
            region += '<option value="0">请选择</option>';
            $.each(result.data, function (n, datas) {
                region += '<option  value=' + datas.id + '>' + datas.regionName + '</td> '
            });
            $("#provinceDiv").append(region);
            $("#provinceDiv2").append(region);
        },
        error: function (xmlHTTPRequest, status, error) {
            $.tooltip('请求出错啦！！！');
        }
    });
}

/*
 * 根据父级ID查询子类  省
 * @marlowe
 * update 2015-10-27
 */
function regionPid() {
    var pid = $('#provinceDiv').val();
    console.log(pid);
    var urls = '/user/region/pid';
    $.ajax({
        url: urls,
        type: 'GET',
        data: {pid: pid},
        success: function (result) {
            $("#cityDiv").empty();
            var region = '';
            region += '<option value="0">请选择</option>';
            $.each(result.data, function (n, datas) {
                region += '<option value=' + datas.id + '>' + datas.regionName + '</td> '
            });
            $("#cityDiv").append(region);
        },
        error: function (xmlHTTPRequest, status, error) {
            $.tooltip('请求出错啦！！！');
        }
    });
}


/*
 * 根据父级ID查询子类  市
 * @marlowe
 * update 2015-10-27
 */
function cityRegionPid() {
    var pid = $('#cityDiv').val();
    console.log(pid);
    var urls = '/user/region/pid';
    $.ajax({
        url: urls,
        type: 'GET',
        data: {pid: pid},
        success: function (result) {
            console.log(result)
            $("#countyDiv").empty();
            var region = '';
            region += '<option value="0">请选择</option>';
            $.each(result.data, function (n, datas) {
                region += '<option value=' + datas.id + '>' + datas.regionName + '</td> '
            });
            $("#countyDiv").append(region);
        },
        error: function (xmlHTTPRequest, status, error) {
            $.tooltip('请求出错啦！！！');
        }
    });
}
/*
 * 根据父级ID查询子类   区
 * @marlowe
 * update 2015-10-27
 */
function districtPid() {
    var pid = $('#countyDiv').val();
    console.log(pid);
    var urls = '/user/region/pid';
    $.ajax({
        url: urls,
        type: 'GET',
        data: {pid: pid},
        success: function (result) {
            console.log(result)
            $("#district").empty();
            var region = '';
            $.each(result.data, function (n, datas) {
                region += '<option value=' + datas.id + '>' + datas.regionName + '</td> '
            });
            $("#district").append(region);
        },
        error: function (xmlHTTPRequest, status, error) {
            $.tooltip('请求出错啦！！！');
        }
    });
}
/*
 * @marlowe
 * 身份证验证
 * update 2015-10-29
 */
function validateIdCard() {
    var idCard = $('input[name=iDCard]').val();
    //15位和18位身份证号码的正则表达式
    var regIdCard = /^(^[1-9]\d{7}((0\d)|(1[0-2]))(([0|1|2]\d)|3[0-1])\d{3}$)|(^[1-9]\d{5}[1-9]\d{3}((0\d)|(1[0-2]))(([0|1|2]\d)|3[0-1])((\d{4})|\d{3}[Xx])$)$/;
    //如果通过该验证，说明身份证格式正确，但准确性还需计算
    if (regIdCard.test(idCard)) {
        if (idCard.length == 18) {
            var idCardWi = new Array(7, 9, 10, 5, 8, 4, 2, 1, 6, 3, 7, 9, 10, 5, 8, 4, 2); //将前17位加权因子保存在数组里
            var idCardY = new Array(1, 0, 10, 9, 8, 7, 6, 5, 4, 3, 2); //这是除以11后，可能产生的11位余数、验证码，也保存成数组
            var idCardWiSum = 0; //用来保存前17位各自乖以加权因子后的总和
            for (var i = 0; i < 17; i++) {
                idCardWiSum += idCard.substring(i, i + 1) * idCardWi[i];
            }
            var idCardMod = idCardWiSum % 11;//计算出校验码所在数组的位置
            var idCardLast = idCard.substring(17);//得到最后一位身份证号码
            //如果等于2，则说明校验码是10，身份证号码最后一位应该是X
            if (idCardMod == 2) {
                if (idCardLast == "X" || idCardLast == "x") {
                    return true;
                    $.tooltip('恭喜通过验证啦！', 2500, true);
                } else {
                    return false;
                    $.tooltip('身份证号码错误...');
                }
            } else {
                //用计算出的验证码与最后一位身份证号码匹配，如果一致，说明通过，否则是无效的身份证号码
                if (idCardLast == idCardY[idCardMod]) {
                    $.tooltip('恭喜通过验证啦！', 2500, true);
                    return true;
                } else {
                    return false;
                    $.tooltip('身份证号码错误...');
                }
            }
        }
    } else {
        $.tooltip('身份证格式不正确...');
        return false;
    }
}


/*
 * 字典查询
 *2.4根据父级ID查询子类型
 * @marlowe
 * update 2015-11-3
 */
function dicChildren(pid, typename) {
    var urls = '/public/dic/children/';
    $.ajax({
        url: urls,
        type: 'GET',
        data: {pid: pid},
        success: function (result) {
            console.log(result);
            $("#" + typename).empty();
            var region = '';
            region += '<option value="0">请选择</option>';
            $.each(result.data, function (n, datas) {
                region += '<option value=' + datas.id + '>' + datas.value + '</td> '
            });
            $("#" + typename).append(region);
        },
        error: function (xmlHTTPRequest, status, error) {
            $.tooltip('请求出错啦！！！');
        }
    });
}


/*
 * 图片上传
 * @marlowe
 * update 2015-10-29
 */
function uploadFile(idname, urlname) {
    var formData = new FormData($("#" + idname)[0]);
    $.ajax({
        url: '/public/upload/idCardUrl',
        type: 'POST',
        data: formData,
        async: false,
        cache: false,
        contentType: false,
        processData: false,
        success: function (data) {
            console.log(data);
            if (200 === data.code) {
                $('input[name=' + urlname + ']').val(data.data.url);
                $.tooltip('图片上传成功了哦！，2秒后自动关闭', 2000, true);
            } else {
                $.tooltip('图片上传失败啦！');
            }
            //console.log('imgUploader upload success, data:', data);
        },
        error: function () {
            $.tooltip('与服务器通信发生错误啦！');
        }
    });
}
/*
 * 格式化时间
 * @marlowe
 * update 2015-11-5
 */
function formatterDate(time) {
    var datetime = new Date();
    datetime.setTime(time);
    var year = datetime.getFullYear();
    var month = datetime.getMonth() + 1 < 10 ? "0" + (datetime.getMonth() + 1) : datetime.getMonth() + 1;
    var date = datetime.getDate() < 10 ? "0" + datetime.getDate() : datetime.getDate();
    return year + "-" + month + "-" + date;
}

