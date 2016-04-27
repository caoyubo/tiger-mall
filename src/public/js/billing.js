/**
 * Created by marlowe on 2015/11/3.
 */
$(function () {
    region_all_country();
    dicChildren(5,'taxpayerTypeId');
    dicChildren(8,'taxTypeTaxCodeId');
});

function  addTax(){
        var $taxpayerId = $('input[name=taxpayerId]');
        var taxpayerTypeId = $("#taxpayerTypeId option:selected").attr("value");
        var taxTypeTaxCodeId = $("#taxTypeTaxCodeId option:selected").attr("value");
        var provinceDiv = $("#provinceDiv option:selected").attr("value");
        var cityDiv = $("#cityDiv option:selected").attr("value");
        var countyDiv = $("#countyDiv option:selected").attr("value")
        var $bankCardAccountName = $('input[name=bankCardAccountName]');
        var $bankCardAccount =$('input[name=bankCardAccount]');
        var $bankBranchNumber = $('input[name=bankBranchNumber]');
        if ($taxpayerId.val() == '') {
            $.tooltip('纳税人识别号还没填呢...');
            $taxpayerId.focus();
        } else if (taxpayerTypeId == 0) {
            $.tooltip('纳税人类型还没有选择呢...');
        }else if (taxTypeTaxCodeId == 0) {
            $.tooltip('纳税类型税码还没有选择呢...');
        }else if ($bankCardAccountName.val() == '') {
            $.tooltip('银行卡开户名称还没填呢...');
            $bankCardAccountName.focus();
        }else if ($bankCardAccount.val() == '') {
            $.tooltip('公司银行卡账号还没填呢...');
            $bankCardAccount.focus();
        } else if ($bankBranchNumber.val() == '') {
            $.tooltip('公司银行卡账号还没填呢...');
            $bankBranchNumber.focus();
        } else if (provinceDiv == 0) {
            $.tooltip('国家还没有选择呢...');
        } else if (cityDiv == 0) {
            $.tooltip('省还没有选择呢...');
        } else if (countyDiv == 0) {
            $.tooltip('市还没有选择呢...');
        } else if (district == 0) {
            $.tooltip('区还没有选择呢...');
        }   else {
            var urls = '/merchant/add/tax';
            $.ajax({
                url: urls,
                type: 'post',
                data: {
                    taxpayerId:$taxpayerId.val(),
                    taxpayerTypeId: $("#taxpayerTypeId option:selected").attr("value"),
                    taxTypeTaxCodeId:$("#taxTypeTaxCodeId option:selected").attr("value"),
                    taxEnrolCertificateUrl:'jkhfgk.jpg',
                    generalTaxpayerQualificationUrl:'ffghty.jpg',
                    bankCardAccountName:$bankCardAccountName.val(),
                    bankCardAccount:$bankCardAccount.val(),
                    bankBranchNumber:$bankBranchNumber.val(),
                    bankCountryId:$("#provinceDiv option:selected").attr("value"),
                    bankCountry:$("#provinceDiv").find("option:selected").text(),
                    bankProvinceId:$("#cityDiv option:selected").attr("value"),
                    bankProvince:$("#cityDiv").find("option:selected").text(),
                    bankCityId:$("#countyDiv option:selected").attr("value"),
                    bankCity:$("#countyDiv").find("option:selected").text(),
                    bankDistrictId:$("#district option:selected").attr("value"),
                    bankDistrict:$("#district").find("option:selected").text(),
                    bankAccountLicenceUrl:'32131346.jpg',
                },
                success: function (data) {
                    console.log(data);
                    $.tooltip(data.mes + '，2秒后自动关闭', 2000, true, function () {
                        window.location.href = "/merchant/shop";
                    });
                },
                error: function (xmlHTTPRequest, status, error) {
                    $.tooltip('请求出错啦！！！');
                }
            });
        }
}