/*地址转二维码*/
/*var qrcode = new QRCode("qrcode_image", {
    text: "http://jindo.dev.naver.com/collie",
    width: 90,
    height: 90,
    colorDark : "#00a7e0",
    colorLight : "#ffffff",
    correctLevel : QRCode.CorrectLevel.H
});*/

/*pc和移动端导航栏适配功能*/
$('#menuToggle').click(function () {
   $('.m-item').toggleClass('m-mobile-hide');
});

/*导航栏分类下拉框点击事件*/
$('#selectDropDown').dropdown({
   action: 'hide'
});

/*左侧卡片折叠菜单点击事件*/
$('#common_me_accordion').accordion();

/*后台管理-导航栏用户按钮下拉框事件*/
$('#user_dropdown_admin').dropdown();