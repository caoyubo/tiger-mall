/**
 * Created by marlowe on 2015/10/29.
 */
$(function(){
    region_all_country();

})
/*
* 添加公司信息
* @marlowe
 */
function  companyAdd(){
        var PhoneReg = /^0{0,1}(13[0-9]|15[0-9]|153|156|18[7-9])[0-9]{8}$/; //手机正则
        var tele = /^((0\d{2,3})-)(\d{7,8})(-(\d{3,}))?$/;
        var $companyName = $('input[name=companyName]');
        var $bussinessLicenseRegistNumber  = $('input[name=bussinessLicenseRegistNumber]');
        var $legalRepresentative = $('input[name=legalRepresentative]');
        var $iDCard = $('input[name=iDCard]');
        var provinceDiv = $("#provinceDiv option:selected").attr("value");
        var cityDiv = $("#cityDiv option:selected").attr("value");
        var countyDiv = $("#countyDiv option:selected").attr("value");
        var district = $("#district option:selected").attr("value");
        var $bussinessLicenseAddress = $('input[name=bussinessLicenseAddress]');
        var $foundDate = $('input[name=foundDate]');
        var $bussinessStartDate = $('input[name=bussinessStartDate]');
        var $bussinessEndDate = $('input[name=bussinessEndDate]');
        var $registeredCapital = $('input[name=registeredCapital]');
        var $bussinessRange = $('input[name=bussinessRange]');
        var $companyAddress = $('input[name=companyAddress]');
        var $companyPhone =$('input[name=companyPhone]');
        var $companyEmergencyContact = $('input[name=companyEmergencyContact]');
        var $companyEmergencyContactMobile  = $('input[name=companyEmergencyContactMobile]');
        var $organizationCodeCertificate = $('input[name=organizationCodeCertificate]');
        var $organizationCodeCertificateStartDate = $('input[name=organizationCodeCertificateStartDate]');
        var $organizationCodeCertificateEndDate =$('input[name=organizationCodeCertificateEndDate]');
        if ($companyName.val() == '') {
            $.tooltip('公司名称还没填呢...');
            $companyName.focus();
        }else if ($bussinessLicenseRegistNumber.val() == '') {
            $.tooltip('营业执照注册号还没填呢...');
            $bussinessLicenseRegistNumber.focus();
        }else if ($legalRepresentative.val() == '') {
            $.tooltip('法定代表人还没填呢...');
            $legalRepresentative.focus();
        } else if ($iDCard.val() == '') {
            $.tooltip('身份证还没填呢...');
            $iDCard.focus();
        }else if (provinceDiv== 0 || cityDiv == 0 || countyDiv==0 ||district==0) {
            $.tooltip('营业执照所在地还没选择呢...');
        }else if ($bussinessLicenseAddress.val() == '') {
            $.tooltip('营业执照详细地址还没填呢...');
            $bussinessLicenseAddress.focus();
        }else if ($foundDate.val() == '') {
            $.tooltip('成立日期还没填呢...');
            $foundDate.focus();
        }else if ($bussinessStartDate.val() == '' || $bussinessEndDate.val() == '') {
            $.tooltip('营业期限还没选择呢...');
            $bussinessStartDate.focus();
        }else if ($registeredCapital.val() == '' ) {
            $.tooltip('注册资本还没填呢...');
            $registeredCapital.focus();
        }else if ($bussinessRange.val() == '' ) {
            $.tooltip('经营范围还没填呢...');
            $bussinessRange.focus();
        }else if ($companyAddress.val() == '') {
            $.tooltip('公司详细地址还没填呢...');
            $companyAddress.focus();
        }else if ($companyPhone.val() == '') {
            $.tooltip('公司电话还没填呢...');
            $companyPhone.focus();
        } else if (!tele.test($companyPhone.val())) {
            $.tooltip('公司电话格式错咯...');
            $companyPhone.focus();
        }else if ($companyEmergencyContact.val() == '') {
            $.tooltip('公司紧急联系人还没填呢...');
            $companyEmergencyContact.focus();
        }else if ($companyEmergencyContactMobile.val() == '') {
            $.tooltip('公司紧急联系人手机还没填呢...');
            $companyEmergencyContactMobile.focus();
        }else if (!PhoneReg.test($companyEmergencyContactMobile.val())) {
            $.tooltip('公司紧急联系人手机格式错咯...');
            $companyEmergencyContactMobile.focus();
        }else if ($organizationCodeCertificate.val() == '') {
            $.tooltip('组织机构代码还没填呢...');
            $organizationCodeCertificate.focus();
        }else if ($organizationCodeCertificateStartDate.val() == '') {
            $.tooltip('组织结构代码有效起始日期还没填呢...');
            $organizationCodeCertificateStartDate.focus();
        }else if ($organizationCodeCertificateEndDate.val() == '') {
            $.tooltip('组织结构代码终止日期还没填呢...');
            $organizationCodeCertificateEndDate.focus();
        }else {
            // console.log($("#company").serialize());
            var urls = '/merchant/add/company';
            $.ajax({
                url: urls,
                type: 'post',
                data:{
                    companyName:$companyName.val(),
                    bussinessLicenseRegistNumber:$bussinessLicenseRegistNumber.val(),
                    legalRepresentative:$legalRepresentative.val(),
                    bussinessLicenseCountryId:$("#provinceDiv option:selected").attr("value"),
                    bussinessLicenseCountry:$("#provinceDiv").find("option:selected").text(),
                    bussinessLicenseProvinceId:$("#cityDiv option:selected").attr("value"),
                    bussinessLicenseProvince:$("#cityDiv").find("option:selected").text(),
                    bussinessLicenseCityId:$("#countyDiv option:selected").attr("value"),
                    bussinessLicenseCity:$("#countyDiv").find("option:selected").text(),
                    bussinessLicenseDistrictId:$("#district option:selected").attr("value"),
                    bussinessLicenseDistrict:$("#district").find("option:selected").text(),
                    bussinessLicenseAddress:$bussinessLicenseAddress.val(),
                    foundDate:$foundDate.val(),
                    bussinessStartDate:$bussinessStartDate.val(),
                    bussinessEndDate:$bussinessEndDate.val(),
                    registeredCapital:$registeredCapital.val(),
                    bussinessRange:$bussinessRange.val(),
                    bussinessLicenseUrl:'26416546.jpg',
                    companyAddress:$companyAddress.val(),
                    companyPhone:$companyPhone.val(),
                    companyEmergencyContact:$companyEmergencyContact.val(),
                    companyEmergencyContactMobile:$companyEmergencyContactMobile.val(),
                    organizationCodeCertificate:$organizationCodeCertificate.val(),
                    organizationCodeCertificateStartDate:$organizationCodeCertificateStartDate.val(),
                    organizationCodeCertificateEndDate:$organizationCodeCertificateEndDate.val(),
                    organizationCodeCertificateUrl:'32114.jpg',
                    companyCountryId:$("#provinceDiv2 option:selected").attr("value"),
                    companyCountry:$("#provinceDiv2").find("option:selected").text(),
                    companyProvinceId:$("#cityDiv2 option:selected").attr("value"),
                    companyProvince:$("#cityDiv2").find("option:selected").text(),
                    companyCityId: $("#countyDiv2 option:selected").attr("value"),
                    companyCity: $("#countyDiv2").find("option:selected").text(),
                    companyDistrictId:$("#district2 option:selected").attr("value"),
                    companyDistrict:$("#district2").find("option:selected").text(),
                    idCard:$iDCard.val(),
                    idCardUrl:$('input[name=idCardUrl]').val(),
                },
                success: function (data) {
                    console.log(data);
                    $.tooltip(data.mes + '，2秒后自动关闭', 2000, true, function () {
                        window.location.href = "/merchant/billing";
                    });
                },
                error: function (xmlHTTPRequest, status, error) {
                    $.tooltip('请求出错啦！！！');
                }
            });
        }
}
/*
 * 根据父级ID查询子类  省
 * @marlowe
 * update 2015-10-27
 */
function regionPid2() {
    var pid = $('#provinceDiv2').val();
    console.log(pid);
    var urls = '/user/region/pid';
    $.ajax({
        url: urls,
        type: 'GET',
        data: {pid: pid},
        success: function (result) {
            $("#cityDiv2").empty();
            var region = '';
            region += '<option value="0">请选择</option>';
            $.each(result.data, function (n, datas) {
                region += '<option value=' + datas.id + '>' + datas.regionName + '</td> '
            });
            $("#cityDiv2").append(region);
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
function cityRegionPid2() {
    var pid = $('#cityDiv2').val();
    console.log(pid);
    var urls = '/user/region/pid';
    $.ajax({
        url: urls,
        type: 'GET',
        data: {pid: pid},
        success: function (result) {
            console.log(result)
            $("#countyDiv2").empty();
            var region = '';
            region += '<option value="0">请选择</option>';
            $.each(result.data, function (n, datas) {
                region += '<option value=' + datas.id + '>' + datas.regionName + '</td> '
            });
            $("#countyDiv2").append(region);
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
function districtPid2() {
    var pid = $('#countyDiv2').val();
    console.log(pid);
    var urls = '/user/region/pid';
    $.ajax({
        url: urls,
        type: 'GET',
        data: {pid: pid},
        success: function (result) {
            console.log(result)
            $("#district2").empty();
            var region = '';
            $.each(result.data, function (n, datas) {
                region += '<option value=' + datas.id + '>' + datas.regionName + '</td> '
            });
            $("#district2").append(region);
        },
        error: function (xmlHTTPRequest, status, error) {
            $.tooltip('请求出错啦！！！');
        }
    });
}




