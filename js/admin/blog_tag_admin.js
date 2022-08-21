/*后台管理-标签管理-添加标签按钮弹出模态框*/
$('#add_tag_modal_admin')
    .modal('setting', 'closable', false).modal({
    blurring: true,
    inverted: true
}).modal({
    closable  : false,
    onDeny    : function(){},
    onApprove : function() {}
}).modal('attach events', '#add_tag_button_admin', 'show');

/*后台管理-标签管理-对标签添加表单进行验证*/
$('#add_tag_form_admin').form({
    fields: {
        tagName: {
            identifier: 'tagName',
            rules: [{
                type: 'empty',
                prompt: '请输入标签名'
            }]
        },
        tagColor: {
            identifier: 'tagColor',
            rules: [{
                type: 'empty',
                prompt: '请选择标签颜色'
            }]
        }
    }
});

/*后台管理-标签管理-标签颜色下拉框*/
$('#add_tag_color_dropdown_admin').dropdown({
    on: 'hover'
});
$('#update_tag_color_dropdown_admin').dropdown({
    on: 'hover'
});

/*给删除按钮绑定点击事件*/
function deleteTag(tagId,tagName,pageNum) {
    if (confirm("确认删除[" + tagName + "]标签吗？")) {
        $.ajax({
            url: "/admin/tag/" + tagId + "/" + pageNum,
            type: "POST",
            data:"_method=DELETE",
            success:function (result) {
                console.log(result);
                $.ajax({
                    url:"/admin/tags?pageNum=" + pageNum,
                    type:"GET",
                    dataType:"html",
                })
            }
        });
    }
}

/*修改按钮绑定点击事件，弹出模态框*/
function editTag(tagId,tagName,tagColor,pageNum) {
    //将标签数据填充到模态框
    $("input[name='tagId']").remove();
    $("input[name='pageNum']").remove();
    $("input[name='oldTagName']").remove();
    $('<input>').attr('type','hidden').attr('name','tagId').attr('value',tagId).appendTo("#update_tag_form_admin");
    $('<input>').attr('type','hidden').attr('name','pageNum').attr('value',pageNum).appendTo("#update_tag_form_admin");
    $('<input>').attr('type','hidden').attr('name','oldTagName').attr('value',tagName).appendTo("#update_tag_form_admin");
    $("#update_tagName_input").val(tagName);
    $("#update_tagColor_input").text(tagColor);
    //弹出修改模态框
    $('#update_tag_modal_admin')
        .modal('setting', 'closable', false).modal({
        blurring: true,
        inverted: true
    }).modal({
        closable  : false,
        onDeny    : function(){},
        onApprove : function() {}
    }).modal('show');
}