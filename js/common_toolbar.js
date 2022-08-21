/*通用工具条回到顶部按钮点击事件*/
$('#common_toTopButton').click(function () {
    $(window).scrollTo(0,500);
});

/*通用工具条对博客框体监测*/
var waypoint = new Waypoint({
    element: document.getElementById('waypoint'),
    handler: function(direction) {
        if (direction == 'down') {
            $('#common_toolbar').show(300);
        } else {
            $('#common_toolbar').hide(300);
        }
    }
})