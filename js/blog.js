/*检测当前客户端是pc端还是移动端*/
/*$(function(){
    //判断是否是手机
    var mobile_flag = isMobile();
    if(mobile_flag){//mobile
        if (!$('#mobile_blog_toc').hasClass('js-toc')) {
            $('#pc_blog_toc').removeClass('js-toc');
            $('#mobile_blog_toc').addClass('js-toc');
        }
    }else{//pc
        if (!$('#pc_blog_toc').hasClass('js-toc')) {
            $('#mobile_blog_toc').removeClass('js-toc');
            $('#pc_blog_toc').addClass('js-toc');
        }
    }
})

function isMobile() {
    var userAgentInfo = navigator.userAgent;
    var mobileAgents = [ "Android", "iPhone", "SymbianOS", "Windows Phone", "iPad","iPod"];
    var mobile_flag = false;
    //根据userAgent判断是否是手机
    for (var v = 0; v < mobileAgents.length; v++) {
        if (userAgentInfo.indexOf(mobileAgents[v]) > 0) {
            mobile_flag = true;
            break;
        }
    }
    var screen_width = window.screen.width;
    var screen_height = window.screen.height;
    //根据屏幕分辨率判断是否是手机
    if(screen_width < 500 && screen_height < 800){
        mobile_flag = true;
    }
    return mobile_flag;
}*/

/*博客详情-文章目录初始化*/
tocbot.init({
// Where to render the table of contents.
    tocSelector: '.js-toc',
// Where to grab the headings to build the table of contents.
    contentSelector: '.js-toc-content',
// Which headings to grab inside of the contentSelector element.
    headingSelector: 'h1, h2, h3, h4, h5, h6',
// For headings inside relative or absolute positioned containers within content.
    hasInnerContainers: true,
});

/*博客详情-赞赏按钮点击事件*/
$('#payButton').popup({
    popup: $('.payImage.popup'),
    on: 'click',
    position: 'top center'
});
$('#payButton').click(function () {
    $('#payButton').toggleClass('basic');
});

/*博客详情-工具条目录按钮点击事件*/
/*$('#blog_toc_button').popup({
    popup: $('#blog_toc'),
    on: 'click',
    position: 'left center'
});*/

/*博客详情-评论信息填写提示框*/
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

/*博客详情-工具条-回到页面顶部*/
$('#blog_toTopButton').click(function () {
    $(window).scrollTo(0,500);
});

/*博客详情-工具条对博客框体监测*/
var waypoint = new Waypoint({
    element: document.getElementById('blog_waypoint'),
    handler: function(direction) {
        if (direction == 'down') {
            $('#blog_toolbar').show(300);
        } else {
            $('#blog_toolbar').hide(300);
        }
    }
})

//评论表单验证
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

