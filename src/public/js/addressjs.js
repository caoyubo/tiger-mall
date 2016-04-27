/**
 * Created by marlowe on 2015/10/26.
 */
$(function () {
    $('.dialog').hDialog({
        title: '新增收货地址',
        width: 760,
        height: 490,
        box: '#HBox',
        beforeShow: function () {
            region_all_country();
        }
    });


    //提交并验证表单
    $('.save-btn').click(function () {
        var EmailReg = /^\w+((-\w+)|(\.\w+))*\@[A-Za-z0-9]+((\.|-)[A-Za-z0-9]+)*\.[A-Za-z0-9]+$/; //邮件正则
        var PhoneReg = /^0{0,1}(13[0-9]|15[0-9]|153|156|18[7-9])[0-9]{8}$/; //手机正则
        var code = /^[1-9][0-9]{5}$/; //邮政编码
        var tele = /^((0\d{2,3})-)(\d{7,8})(-(\d{3,}))?$/;
        var $nickname = $('input[name=consignee]');
        var provinceDiv = $("#provinceDiv option:selected").attr("value");
        var cityDiv = $("#cityDiv option:selected").attr("value");
        var countyDiv = $("#countyDiv option:selected").attr("value");
        var district = $("#district option:selected").attr("value");
        var $email = $('input[name=email]');
        var $telephone = $('input[name=telephone]');
        var $address = $('input[name=address]');
        var $phone = $('input[name=mobile]');
        var $zipCode = $('input[name=zipCode]');
        if ($nickname.val() == '') {
            $.tooltip('收货人还没填呢...');
            $nickname.focus();
        } else if (provinceDiv == 0) {
            $.tooltip('国家还没有选择呢...');
        } else if (cityDiv == 0) {
            $.tooltip('省还没有选择呢...');
        } else if (countyDiv == 0) {
            $.tooltip('市还没有选择呢...');
        } else if (district == 0) {
            $.tooltip('区还没有选择呢...');
        } else if ($zipCode.val() == '') {
            $.tooltip('邮政编码还没填呢...');
            $zipCode.focus();
        } else if (!code.test($zipCode.val())) {
            $.tooltip('邮政编码填错啦...');
            $zipCode.focus();
        } else if ($address.val() == '') {
            $.tooltip('收获地址还没填呢...');
            $address.focus();
        } else if ($phone.val() == '') {
            $.tooltip('手机号还没填呢...');
            $phone.focus();
        } else if (!PhoneReg.test($phone.val())) {
            $.tooltip('手机号格式错咯...');
            $phone.focus();
        } else if ($telephone.val() == '') {
            $.tooltip('固定电话还没填呢...');
            $telephone.focus();
        } else if (!tele.test($telephone.val())) {
            $.tooltip('固定电话格式错咯...');
            $telephone.focus();
        } else if ($email.val() == '') {
            $.tooltip('邮箱还没填呢...');
            $email.focus();
        } else if (!EmailReg.test($email.val())) {
            $.tooltip('邮箱格式错咯...');
            $email.focus();
        } else {
            var urls = '/user/address/add';
            $.ajax({
                url: urls,
                type: 'get',
                data: {
                    consignee: $nickname.val(),
                    email: $email.val(),
                    countryId: $("#provinceDiv option:selected").attr("value"),
                    country: $("#provinceDiv").find("option:selected").text(),
                    provinceId: $("#cityDiv option:selected").attr("value"),
                    province: $("#cityDiv").find("option:selected").text(),
                    cityId: $("#countyDiv option:selected").attr("value"),
                    city: $("#countyDiv").find("option:selected").text(),
                    districtId: $("#district option:selected").attr("value"),
                    district: $("#district").find("option:selected").text(),
                    address: $address.val(),
                    zipCode: $zipCode.val(),
                    telephone: $telephone.val(),
                    mobile: $phone.val(),
                    signBuild: $('input[name=signBuild]').val()
                },
                success: function (data) {
                    console.log(data);
                    $.tooltip(data.mes + '，2秒后自动关闭', 2000, true, function () {
                        $('#HBox').hide();
                        $('#HOverlay').hide();
                        location.reload();
                    });
                },
                error: function (xmlHTTPRequest, status, error) {
                    $.tooltip('请求出错啦！！！');
                }
            });

        }
    });

});
/*
 * 收获地址查询
 * @marlowe
 * update 2015-10-28
 */
function alertUpdateAddressDiag(id) {
    var urls = '/user/address/find/id';
    console.log(id);
    $.ajax({
        url: urls,
        type: 'GET',
        data: {id: id},
        success: function (result) {
            console.log(result);
            console.log(result.data.provinceId);
            $('input[name=consignee]').val(result.data.consignee);
            $('input[name=zipCode]').val(result.data.zipCode);
            $('input[name=address]').val(result.data.address);
            $('input[name=mobile]').val(result.data.mobile);
            $('input[name=signBuild]').val(result.data.signBuild);
            $('input[name=email]').val(result.data.email);
            $('input[name=telephone]').val(result.data.telephone);
            setTimeout(function () {
                $("select[name=provinceDiv]").find("option[value=" + result.data.countryId + "]").attr("selected", true);
                regionPid();
                    setTimeout(function () {
                        $("select[name=cityDiv]").find("option[value=" + result.data.provinceId + "]").attr("selected", true);
                        cityRegionPid();
                        setTimeout(function () {
                            $("select[name=countyDiv]").find("option[value=" + result.data.cityId + "]").attr("selected", true);
                            districtPid();
                            setTimeout(function () {
                                $("select[name=district]").find("option[value=" + result.data.districtId + "]").attr("selected", true);
                            },200);
                        },200)
                    },200);
            }, 200);
        },
        error: function (xmlHTTPRequest, status, error) {
            $.tooltip('请求出错啦！！！');
        }
    });
}


/*
 * 删除收获地址
 * @marlowe
 * update 2015-10-28
 */
function alertDelAddressDiag(id) {
    var urls = '/user/address/delete';
    console.log(id);
    $.ajax({
        url: urls,
        type: 'GET',
        data: {id: id},
        success: function (result) {
            console.log(result)
            $.tooltip(result.mes + '，2秒后自动关闭', 2000, true, function () {
                location.reload();
            });
        },
        error: function (xmlHTTPRequest, status, error) {
            $.tooltip('请求出错啦！！！');
        }
    });
}
/*
 * 使用默认收获地址
 * @marlowe
 * update 2015-10-28
 */
function setDefault(id){
    var urls = '/user/address/default';
    console.log(id);
    $.ajax({
        url: urls,
        type: 'GET',
        data: {id: id},
        success: function (result) {
            console.log(result)
            $.tooltip(result.mes + '，2秒后自动关闭', 2000, true, function () {
               location.reload();
                $('.setDefault').text('默认地址');
            });
        },
        error: function (xmlHTTPRequest, status, error) {
            $.tooltip('请求出错啦！！！');
        }
    });
}

