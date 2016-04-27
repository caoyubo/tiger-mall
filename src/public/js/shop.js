/**
 * Created by marlowe on 2015/11/3.
 */
$(function () {
    findUserDefault();
    $("#nextStepBtn").click(function () {
        var PhoneReg = /^0{0,1}(13[0-9]|15[0-9]|153|156|18[7-9])[0-9]{8}$/; //手机正则
        var $telephone = $('input[name=telephone]');
        var provinceDiv = $("#provinceDiv option:selected").attr("value");
        var shopCategoryRegionId = $("#shopCategoryRegionId option:selected").attr("value");
        var $userName = $('input[name=userName]');
        var $shopName = $('input[name=shopName]');
        var $description = $('input[name=description]');
        var $address = $('input[name=address]');
        if (provinceDiv == 0 || shopCategoryRegionId == 0) {
            $.tooltip('店铺分类还没选择呢...');
        } else if ($userName == '') {
            $.tooltip('申请人名称还没填呢...');
            $userName.focus();
        } else if ($shopName == '') {
            $.tooltip('店铺名称还没填呢...');
            $userName.focus();
        } else if ($description == '') {
            $.tooltip('店铺描述还没填呢...');
            $description.focus();
        } else if (!PhoneReg.test($telephone.val())) {
            $.tooltip('联系方式格式错咯...');
            $telephone.focus();
        } else if ($address == '') {
            $.tooltip('商店所在地还没填呢...');
            $address.focus();
        } else {
            console.log(shopCategoryRegionId);
            var shopCategorysid = $("#shopCategoryRegionsid option:selected").attr("value");
            console.log(shopCategorysid);
            if (shopCategorysid != undefined) {
                var shopCategoryRegionId = shopCategorysid;
            }
            console.log(shopCategoryRegionId);
            var urls = '/merchant/shop/add';
            $.ajax({
                url: urls,
                type: 'post',
                data: {
                    shopCategoryId: shopCategoryRegionId,
                    userName:$userName.val(),
                    shopName:$shopName.val(),
                    description:$description.val(),
                    logo:'03211464.jpg',
                    telephone:$telephone.val(),
                    address:$address.val(),
                    pdefault:$('input[name=pdefault]').val(),
                },
                success: function (data) {
                    console.log(data);
                    $.tooltip(data.mes + '，2秒后自动关闭', 2000, true, function () {
                        window.location.href = "/merchant/audit";
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
 *@marlowe
 *
 */
function shopCategoryRegion(typename, regionname) {
    var regionId = $("#" + regionname + " option:selected").attr("value");
    var pid = $("#" + regionname + " option:selected").attr("title");
    console.log(pid);
    var urls = '/public/shop/category/pid/region';
    $.ajax({
        url: urls,
        type: 'GET',
        data: {
            pid: pid,
            regionId: regionId
        },
        success: function (result) {
            console.log(result);
            $("#" + typename).empty();
            if (result.data == null) {
                $("#" + typename).css("display", "none", "float", "left");
            } else {
                $("#" + typename).empty();
                var region = '';
                region += '<option value="0">请选择</option>';
                $.each(result.data, function (n, datas) {
                    region += '<option value=' + datas.id + '  title=' + datas.id + ' >' + datas.name + '</td> '
                });
                $("#" + typename).append(region);
                $("#" + typename).css("display", "block", "float", "left");
            }

        },
        error: function (xmlHTTPRequest, status, error) {
            $.tooltip('请求出错啦！！！');
        }
    });
}


/*
* 店铺查询
* @marlowe
* update 2015-11-4
 */
function  findUserDefault(){
    var urls = '/merchant/shop/find/user';
    $.ajax({
        url: urls,
        type: 'GET',
        success: function (result) {
            console.log(result);
            var code = result.code;
            if(code==0){
                var data = result.data;
                if(data!=null){
                    $('input[name=pdefault]').val(false);
                }
            }else{
                $('input[name=pdefault]').val(true);
            }
        },
        error: function (xmlHTTPRequest, status, error) {
            $.tooltip('请求出错啦！！！');
        }
    });
}