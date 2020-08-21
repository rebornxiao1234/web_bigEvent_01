$(function () {
    var form = layui.form;
    form.verify({
        nickname: function (value) {
            if (value.length > 6) {
                return '昵称长度在1~6位之间！'
            }
        }
    })
    //用户渲染
    initUserInfo();
    var layer = layui.layer;
    function initUserInfo() {
        //发送ajax请求     
        $.ajax({
            method: 'GET',
            url: '/my/userinfo',
            success: function (res) {
                if (res.status !== 0) {
                    return layer.msg(res.message);
                }
                //成功后渲染页面
                // console.log(res);
                form.val('formUserInfo', res.data)
            }
        })
    }
    //表单重置 
    $('#btnReset').on('click', function (e) {
        e.preventDefault();
        initUserInfo();
    })
    //修改用户信息
    $('.layui-form').on('submit', function (e) {
        //阻止默认提交
        e.preventDefault();
        //发送ajax
        $.ajax({
            method: 'POST',
            url: '/my/userinfo',
            data: $(this).serialize(),
            success: function (res) {
                if (res.status !== 0) {
                    return layer.msg(res.message);
                }
                //成功
                layer.msg('修改用户信息成功');
                window.parent.getUserInfo();
            }
        })
    })
})