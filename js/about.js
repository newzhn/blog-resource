$('#nameInput').popup({
    /*content: '输入QQ号将自动拉取昵称和头像',*/
    content: '用作评论昵称',
    on: 'focus',
    position: 'top center'
});
$('#emailInput').popup ({
    content: '用于接收回复邮件',
    on: 'focus',
    position: 'top center'
});
$('.comment-form').form({
    fields: {
        title: {
            identifier: 'content',
            rules: [{
                type: 'empty',
                prompt: '请输入评论内容'
            }
            ]
        },
        content: {
            identifier: 'nickname',
            rules: [{
                type: 'empty',
                prompt: '请输入你的昵称或QQ号'
            }]
        },
        type: {
            identifier: 'email',
            rules: [{
                type: 'email',
                prompt: '请填写正确的邮箱地址'
            }]
        }
    }
});

/*评论发表按钮点击事件*/
$('.comment_submit').click(function () {
    var boo = $('.comment-form').form('validate form');
    if (boo) {
        console.log('校验成功');
        postData();
        cancel();
    } else {
        console.log('校验失败');
    }

});

/*评论分页查询*/
function page(obj) {
    $("[name='pageNum']").val($(obj).data("page"));
    loadData();
}

/*发送post请求进行分页查询*/
function loadData() {
    $("#comment-container").load(/*[[@{/comments}]]*/"/comments",{
        pageNum : $("[name='pageNum']").val(),
        blogId : $("[name='blogId']").val()
    });
}

/*发送post添加评论*/
function postData() {
    $("#comment-container").load(/*[[@{/comment}]]*/"/comment",{
        "parentCommentId" : $("[name='parentCommentId']").val(),
        "blogId" : $("[name='blogId']").val(),
        "nickname": $("[name='nickname']").val(),
        "email"   : $("[name='email']").val(),
        "content" : $("[name='content']").val(),
        "pageNum" : $("[name='pageNum']").val()
    },function (responseTxt, statusTxt, xhr) {
        clearContent();
    });
}

/*清除表单内容*/
function clearContent() {
    $("[name='content']").val('');
    $("[name='parentCommentId']").val(-1);
    $("[name='content']").attr("placeholder", "评论千万条,友善第一条");
}

/*回复按钮点击事件*/
function reply(commentId,nickname,pageNum) {
    $("[name='pageNum']").val(pageNum);
    $("#cancel-button").remove();
    var id = "#reply-form" + commentId;
    var span = $("<span></span>").append("取消回复");
    var button = $("<a></a>").attr("id", "cancel-button").attr("onclick","cancel("+commentId+")").attr("type", "button").addClass("m-button m-button--primary m-button--mini").append(span);
    $("#header").append(button);
    $("[name='parentCommentId']").val(commentId);
    $("[name='content']").attr("placeholder", "@" + nickname).focus();
    $(id).addClass("m-margin-top");
    $(id).html($("#post-form"));
}

/*取消回复按钮点击事件方法*/
function cancel(commentId) {
    var id = "#reply-form" + commentId;
    $("[name='pageNum']").val(1);
    $(id).removeClass("m-margin-top");
    $("#cancel-button").remove();
    clearContent();
    $("#send-form").html($("#post-form"));
}