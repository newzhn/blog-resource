/*后台管理-分类管理-添加分类按钮弹出模态框*/
$('#add_type_modal_admin')
    .modal('setting', 'closable', false).modal({
    blurring: true,
    inverted: true
}).modal({
    closable  : false,
    onDeny    : function(){},
    onApprove : function() {}
}).modal('attach events', '#add_type_button_admin', 'show');

/*后台管理-分类-对分类添加表单进行验证*/
$('#add_type_form_admin').form({
    fields: {
        typename: {
            identifier: 'typeName',
            rules: [{
                type: 'empty',
                prompt: '请输入分类名'
            }]
        }
    }
});

//日期格式化方法
function renderTime(date) {
    var dateee = new Date(date).toJSON();
    return new Date(+new Date(dateee) + 8 * 3600 * 1000).toISOString().replace(/T/g, ' ').replace(/\.[\d]{3}Z/, '')
}

//在页面加载时发送ajax请求获取员工分页数据
$(function (){
    getTypes();
});

//发送请求获取typeList数据
function getTypes() {
    $.ajax({
        url:"/admin/typeList",
        type:"GET",
        success:function (result) {
            build_type_table(result);
        }
    });
}

//根据id发送ajax请求获取分类信息,并填充到修改模态框中
function getType(typeId) {
    $.ajax({
        url: "/admin/type/" + typeId,
        type:"GET",
        success:function (result) {
            var type = result.data.type;
            $("#update_typeId").attr("value", typeId);
        }
    });
}

//解析显示分类数据
function build_type_table(result) {
    $("#type_table tbody").empty();
    var types = result.data.types;
    $.each(types, function(index,item) {
        var typeIdTd = $("<td></td>").append(item.typeId);
        var typeNameTd = $("<td></td>").append(item.typeName);
        var createTimeTd = $("<td></td>").append(renderTime(item.createTime));
        var blogNumTd = $("<td></td>").append(item.blogNum);
        var blogReadingTd = $("<td></td>").append(item.blogReading);
        var editButton = $("<button></button>").addClass("ui mini yellow button edit_type_button_admin")
            .append("编辑");
        var deleteButton = $("<button></button>").addClass("ui mini red button delete_type_button_admin")
            .append("删除");
        editButton.attr("type_id",item.typeId);
        deleteButton.attr("type_id",item.typeId);
        var btnTd = $("<td></td>").append(editButton).append(" ").append(deleteButton);
        $("<tr></tr>").append(typeIdTd)
            .append(typeNameTd)
            .append(createTimeTd)
            .append(blogNumTd)
            .append(blogReadingTd)
            .append(btnTd).appendTo("#type_table tbody");
    });
}

//清除元素所有样式和内容
function reset_element(element) {
    $(element)[0].reset();
    //清空样式
    $(element).find("*").removeClass("has-error has-success");
    $(element).find(".help-block").text("");
}

//给删除按钮绑定点击事件
$(document).on("click",".delete_type_button_admin",function () {
    var delTypeName = $(this).parents("tr").find("td:eq(1)").text();
    if (confirm("确认删除[" + delTypeName + "]分类吗？")) {
        $.ajax({
            url:"/admin/type/" + $(this).attr("type_id"),
            type:"DELETE",
            success:function (result) {
                if (result.code == 100) {
                    //删除成功 刷新当前页面
                    getTypes();
                } else if (result.code == 200) {
                    alert("服务器内部原因导致删除失败");
                }
            }
        });
    }
});

//给修改按钮绑定点击事件
$(document).on("click",".edit_type_button_admin",function () {
    var editTypeName = $(this).parents("tr").find("td:eq(1)").text();
    $("#update_typeName").val(editTypeName);
    //获取选中分类信息
    getType($(this).attr("type_id"));
    //弹出修改模态框
    $('#update_type_modal_admin')
        .modal('setting', 'closable', false).modal({
        blurring: true,
        inverted: true
    }).modal({
        closable  : false,
        onDeny    : function(){},
        onApprove : function() {}
    }).modal('show');
});

