jQuery.extend(jQuery.validator.messages, {
	required: "��������ֶ�",
	remote: "���������ֶ�",
	email: "��������ȷ��ʽ�ĵ����ʼ�",
	url: "������Ϸ�����ַ",
	date: "������Ϸ�������",
	dateISO: "������Ϸ������� (ISO).",
	number: "������Ϸ�������",
	digits: "ֻ����������",
	creditcard: "������Ϸ������ÿ���",
	equalTo: "���ٴ�������ͬ��ֵ",
	accept: "������ӵ�кϷ���׺�����ַ���",
	maxlength: jQuery.validator.format("������һ����������� {0} ���ַ���"),
	minlength: jQuery.validator.format("������һ������������ {0} ���ַ���"),
	rangelength: jQuery.validator.format("������һ�����Ƚ��� {0} �� {1} ֮����ַ���"),
	range: jQuery.validator.format("������һ������ {0} �� {1} ֮���ֵ"),
	max: jQuery.validator.format("������һ�����Ϊ {0} ��ֵ"),
	min: jQuery.validator.format("������һ����СΪ {0} ��ֵ")
});


jQuery.validator.addMethod("isZipCode", function(value, element) {
    var pattern = /^[0-9]{6}$/;
    if(this.optional(element) || (pattern.test(value))) {
         $(element).attr("class","input_txt");
        return true;
    }else {
        $(element).attr("class","input_txt2");
        return false;
    }
}, "����ȷ��д������������");
//ƥ����26��Ӣ����ĸ��ɵ��ַ���
jQuery.validator.addMethod("isLetter", function(value, element) {
    var pattern = new RegExp("^[A-Za-z]+$");
    if(this.optional(element) || (pattern.test(value))) {
         $(element).attr("class","input_txt");
        return true;
    }else {
        $(element).attr("class","input_txt2");
        return false;
    }
},"����дֻ��Ӣ����ɵ��ַ���");
//ƥ����26��Ӣ����ĸ��������ɵ��ַ���
jQuery.validator.addMethod("isLetterAndInt", function(value, element) {
    var pattern = new RegExp("^[A-Za-z0-9]+$");
    if(this.optional(element) || (pattern.test(value))) {
        $(element).attr("class","input_txt");
        return true;
    }else {
        $(element).attr("class","input_txt2");
        return false;
    }
},"ֻ�ܰ���Ӣ����ĸ������");
// �ֻ�������֤
jQuery.validator.addMethod("isMobile", function(value, element) {
     var length = value.length;
     var mobile = /^(((13[0-9]{1})|(14[0-9]{1})|(15[0-9]{1})|(17[0-9]{1})|(18[0-9]{1}))+\d{8})$/;
     if(this.optional(element) || (length == 11 && mobile.test(value))) {
        $(element).attr("class","input_txt");
        return true;
    }else {
        $(element).attr("class","input_txt2");
        return false;
    }
 }, "����ȷ��д�����ֻ�����");

 // �绰������֤  �绰�����ʽ010-12345678
 jQuery.validator.addMethod("isTel", function(value, element) {
     var tel = /^(\d{3,4}-)?\d{7,9}$/;
     if(this.optional(element) || (tel.test(value))) {
          $(element).attr("class","input_txt");
        return true;
    }else {
        $(element).attr("class","input_txt2");
        return false;
    }
 }, "����ȷ��д���ĵ绰����");
 // ����ͨ�õ绰�����ʽ��֤ 
 jQuery.validator.addMethod("isJdTel", function(value, element) {
     var tel = /^[0-9\-()����]{7,18}$/;
     if(this.optional(element) || (tel.test(value))) {
          $(element).attr("class","input_txt");
        return true;
    }else {
        $(element).attr("class","input_txt2");
        return false;
    }
 }, "����ȷ��д���ĵ绰����");
 // ��ϵ�绰(�ֻ�/�绰�Կ�)��֤
 jQuery.validator.addMethod("isPhone", function(value,element) {
     var length = value.length;
     var mobile = /^(((13[0-9]{1})|(14[0-9]{1})|(15[0-9]{1})|(17[0-9]{1})|(18[0-9]{1}))+\d{8})$/;
     var tel = /^(\d{3,4}-)?\d{7,9}$/;

     if(this.optional(element) || (tel.test(value) || (length == 11 && mobile.test(value)))) {
         $(element).attr("class","input_txt");
        return true;
    }else {
        $(element).attr("class","input_txt2");
        return false;
    }

 }, "����ȷ��д������ϵ�绰");
 //��֤�������֡�Ӣ����ĸ�����ֺ��»���
 jQuery.validator.addMethod("stringCheck", function(value, element) {
     if(this.optional(element) || /^[\u0391-\uFFE5\w]+$/.test(value)) {
          $(element).attr("class","input_txt");
        return true;
    }else {
        $(element).attr("class","input_txt2");
        return false;
    }
 }, "ֻ�ܰ��������֡�Ӣ����ĸ�����ֺ��»���");
//��֤��� С���������Ը�0��2λ
 jQuery.validator.addMethod("moneyCheck", function(value, element) {
     if(this.optional(element) || /^[1-9][0-9]*(\.)?([0-9]){0,2}$|^[0-9](\.)?([0-9]){0,2}$/.test(value)) {
          $(element).attr("class","input_txt");
        return true;
    }else {
        $(element).attr("class","input_txt2");
        return false;
    }
 }, "����ʽ����");
//��֤email
jQuery.validator.addMethod("isMail", function(value, element) {
    if(this.optional(element) || /^[A-Za-z0-9]+([-_.][A-Za-z0-9]+)*@([A-Za-z0-9]+[-.])+[A-Za-z0-9]{2,5}$/.test(value)) {
        $(element).attr("class","input_txt");
        return true;
    }else {
        $(element).attr("class","input_txt2");
        return false;
    }
}, "ֻ�ܰ���Ӣ����ĸ�����ֺ��»���");
//����Ч������
jQuery.validator.addMethod("isInt", function(value, element) {
    if(this.optional(element) || (/^([1-9][0-9]*)$/.test(value) && value*1 < 1000000000)) {
        $(element).attr("class","input_txt");
        return true;
    }else {
        $(element).attr("class","input_txt2");
        return false;
    }
}, "��������Ч����");
//��֤����
jQuery.validator.addMethod("checkPriceNoFj", function(value, element) {
    return this.optional(element) || /^([1-9][0-9]*)$|^0$/.test(value) || /^(?!0(\.0+)?$)([1-9][0-9]{0,9}|0)(\.[0]{1,3})?$/.test(value);
}, "���ֻ����������");
//���д������Ч������
jQuery.validator.addMethod("isMaxZeroInt", function(value, element) {
    return this.optional(element) || /^[1-9][0-9]*$/.test(value);
}, "���������������");
//����Ч������,С�������λ ����0
jQuery.validator.addMethod("isWeight", function(value, element) {
    return this.optional(element) || /^(?!0(\.0+)?$)([1-9][0-9]{0,9}|0)(\.[0-9]{1,3})?$/.test(value);
}, "��������Ч������");

jQuery.validator.addMethod("zh_CnLength",function(value,element,param){
    value = value.replace(/(^\s*)|(\s*$)/g, "");
    String.prototype.getBytes = function() {
        var cArr = this.match(/[^\x00-\xff]/ig);
        return this.length + (cArr == null ? 0 : cArr.length);
    }
    var length = value.getBytes();
    if(length>param){
        $(element).attr("class","input_txt2");
        return false;
    }
    $(element).attr("class","input_txt");
    return true;
},"������һ����������� {0} ���ַ�,һ����������������");

jQuery.validator.addMethod("selectRequired", function(value, element) {
    var value = $(element).val() + '';
    if(value == '' || value == '0' || value == '-1' || value == '��ѡ��') {
        return false;
    }
    return true;
}, "��ѡ��ѡ��");

jQuery.validator.addMethod("isImg", function(value, element) {

    if(value == '') {
        return true;
    }

    //Ϊ�˱���ת�巴б�ܳ����⣬���ｫ�������ת��
    var re = /(\\+)/g;
    var filename=value.replace(re,"#");
    //��·���ַ������м��н�ȡ
    var one=filename.split("#");
    //��ȡ���������һ�������ļ���
    var two=one[one.length-1];
    //�ٶ��ļ������н�ȡ����ȡ�ú�׺��
    var three=two.split(".");
    //��ȡ��ȡ�����һ���ַ�������Ϊ��׺��
    var last=three[three.length-1];

    //�����Ҫ�жϵĺ�׺������
    var tp ="jpg,png,gif";
    //���ط��������ĺ�׺�����ַ����е�λ��
    var rs=tp.indexOf(last.toLowerCase());
    //������صĽ�����ڻ����0��˵�����������ϴ����ļ�����
    if(rs>=0){
        return true;
    }else{
        return false;
    }

}, "��ʽ�������ϴ���׺Ϊjpg,png,gif��ͼƬ�ļ�");

jQuery.validator.addMethod("isExcel", function(value, element) {
    if(value == '') {
        return true;
    }

    //Ϊ�˱���ת�巴б�ܳ����⣬���ｫ�������ת��
    var re = /(\\+)/g;
    var filename=value.replace(re,"#");
    //��·���ַ������м��н�ȡ
    var one=filename.split("#");
    //��ȡ���������һ�������ļ���
    var two=one[one.length-1];
    //�ٶ��ļ������н�ȡ����ȡ�ú�׺��
    var three=two.split(".");
    //��ȡ��ȡ�����һ���ַ�������Ϊ��׺��
    var last=three[three.length-1];

    //�����Ҫ�жϵĺ�׺������
    var tp ="xls,xlsx";
    //���ط��������ĺ�׺�����ַ����е�λ��
    var rs=tp.indexOf(last.toLowerCase());
    //������صĽ�����ڻ����0��˵�����������ϴ����ļ�����
    if(rs>=0){
        return true;
    }else{
        return false;
    }
}, "��ʽ�������ϴ���׺Ϊxls,xlsx��Excel�ļ�");

function trim(str){  //ɾ���������˵Ŀո�
    return str.replace(/(^\s*)|(\s*$)/g, "");
}

jQuery.validator.addMethod("sellerRequired", function(value, element) {
    if(trim(value) == '') {
        $(element).attr("class","input_txt2");
        return false;
    }
    $(element).attr("class","input_txt");
    return true;
}, "������");

//��֤email
jQuery.validator.addMethod("isqq", function(value, element) {
    if(this.optional(element) || /^([1-9]{1})([0-9]{4,13})$/.test(value)) {
        $(element).attr("class","input_txt");
        return true;
    }else {
        $(element).attr("class","input_txt2");
        return false;
    }
}, "QQ��ʽ���ԣ�������5-14������");