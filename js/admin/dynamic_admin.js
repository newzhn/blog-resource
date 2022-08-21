
/*后台管理-分类管理-添加动态按钮弹出模态框*/
$('#add_dynamic_modal_admin')
    .modal('setting', 'closable', false).modal({
    blurring: true,
    inverted: true
}).modal({
    closable  : false,
    onDeny    : function(){},
    onApprove : function() {}
}).modal('attach events', '#add_dynamic_button_admin', 'show');

/*后台管理-标签管理-对动态添加表单进行验证*/
$('#add_dynamic_form_admin').form({
    fields: {
        title: {
            identifier: 'dynamicName',
            rules: [{
                type: 'empty',
                prompt: '标题：请输入动态内容'
            }]
        }
    }
});
