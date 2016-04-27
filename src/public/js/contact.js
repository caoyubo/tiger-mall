/**
 * Created by marlowe on 2015/10/28.
 */
$(function () {
    //提交并验证表单
    $('#nextStepBtn').click(function () {
        var EmailReg = /^\w+((-\w+)|(\.\w+))*\@[A-Za-z0-9]+((\.|-)[A-Za-z0-9]+)*\.[A-Za-z0-9]+$/; //邮件正则
        var PhoneReg = /^0{0,1}(13[0-9]|15[0-9]|153|156|18[7-9])[0-9]{8}$/; //手机正则
        var $userName = $('input[name=userName]');
        var $contactPhone = $('input[name=contactPhone]');
        var $email = $('input[name=email]');
        if ($userName.val() == '') {
            $.tooltip('联系人还没填呢...');
            $userName.focus();
        } else if ($contactPhone.val() == '') {
            $.tooltip('手机号还没填呢...');
            $contactPhone.focus();
        } else if (!PhoneReg.test($contactPhone.val())) {
            $.tooltip('手机号格式错咯...');
            $contactPhone.focus();
        } else if ($email.val() == '') {
            $.tooltip('邮箱还没填呢...');
            $email.focus();
        } else if (!EmailReg.test($email.val())) {
            $.tooltip('邮箱格式错咯...');
            $email.focus();
        } else {
            var urls = '/merchant/enter/add/contact';
            $.ajax({
                url: urls,
                type: 'get',
                data: {
                    userName: $userName.val(),
                    email: $email.val(),
                    contactPhone: $contactPhone.val(),
                    email: $email.val(),
                },
                success: function (data) {
                    console.log(data);
                    $.tooltip(data.mes + '，2秒后自动关闭', 2000, true, function () {
                        window.location.href = "/merchant/company";
                    });
                },
                error: function (xmlHTTPRequest, status, error) {
                    $.tooltip('请求出错啦！！！');
                }
            });

        }
    });
});