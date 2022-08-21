/*首页工具条-回到页面顶部*/
$('#index_toTopButton').click(function () {
    $(window).scrollTo(0,500);
});

/*首页工具条对博客框体监测*/
var waypoint = new Waypoint({
    element: document.getElementById('index_waypoint'),
    handler: function(direction) {
        if (direction == 'down') {
            $('#index_toolbar').show(300);
        } else {
            $('#index_toolbar').hide(300);
        }
    }
})

/*首页局部刷新分页查询*/
function page(obj) {
    $("[name='pageNum']").val($(obj).data("page"));
    loadData();
}

function loadData() {
    $("#blog-container").load(/*[[@{/home}]]*/"/home",{
        pageNum : $("[name='pageNum']").val(),
    });
}