/*初始化markdown编辑器*/
var contentEditor,contentEditor2;
$(function() {
    contentEditor = editormd("blog-md-content", {
        width   : "100%",
        height  : 550,
        syncScrolling : "single",
        path    : "https://cdn.jsdelivr.net/gh/newzhn/blog-resource/lib/editormd/lib/"
    });
    contentEditor2 = editormd("blog-md-content2", {
        width   : "100%",
        height  : 550,
        syncScrolling : "single",
        path    : "https://cdn.jsdelivr.net/gh/newzhn/blog-resource/lib/editormd/lib/"
    });
});

/*后台管理-博客查询-博客分类下拉框*/
$('#blog_type_dropdown_admin').dropdown({
    on: 'hover'
});

/*后台管理-博客查询-博客阅读量下拉框*/
$('#blog_reading_dropdown_admin').dropdown({
    on: 'hover'
});

/*后台管理-添加博客-博客所属分类下拉框*/
$('#add_blog_type_dropdown_admin').dropdown({
    on: 'hover'
});

/*后台管理-添加博客-博客所属标签下拉框*/
$('#add_blog_tag_dropdown_admin').dropdown({
    on: 'hover'
});

/*后台管理-修改博客-博客所属分类下拉框*/
$('#update_blog_type_dropdown_admin').dropdown({
    on: 'hover'
});

/*后台管理-修改博客-博客所属标签下拉框*/
$('#update_blog_tag_dropdown_admin').dropdown({
    on: 'hover'
});

/*后台管理-修改博客-清除按钮点击事件*/
$('#clear_button')
    .on('click', function() {
        $('#title_input').val("");
        $('#blog_type_dropdown_admin').dropdown('clear');
        $('#blog_reading_dropdown_admin').dropdown('clear');
    });
$('#clear_checkbox').checkbox('attach events', '#clear_button', 'uncheck');


/*后台管理-博客管理-对博客添加表单进行验证*/
$('#add_blog_form_admin').form({
    fields: {
        title: {
            identifier: 'title',
            rules: [{
                type: 'empty',
                prompt: '请输入博客标题'
            }]
        }
    }
});

/*条件查询+分页查询*/
function page(obj) {
    $("[name='pageNum']").val($(obj).data("page"));
    loadData();
}

/*条件查询点击事件*/
$("#search-btn").click(function () {
    $("[name='pageNum']").val(1);
    loadData();
});
function loadData() {
    $("#table-container").load(/*[[@{/admin/blogs}]]*/"/admin/blogs",{
        pageNum : $("[name='pageNum']").val(),
        title : $("[name='title']").val(),
        typeId : $("[name='typeId']").val(),
        readingOrder : $("[name='readingOrder']").val(),
        isTop : $("[name='istop']").val()
    });
}

/*删除超链接点击事件*/
$(function () {
    $("#delete_button").click(function () {
        var href = $(this).attr("href");
        $("#delete_form").attr('action', href).submit();
        return false;
    });
});
