$(function () {
    // 点击去注册事件注册
    $('#link_reg').on('click', function () {
        $('.login-box').hide();
        $('.reg-box').show();
    });
    // 单击去登陆事件注册
    $('#link_login').on('click', function () {
        $('.login-box').show();
        $('.reg-box').hide();
    });
    //表单验证
    //从layui中获取form对象
    var form = layui.form;
    //从layui中获取layer提示框对象
    var layer = layui.layer;
    //调用form里面的方法
    form.verify({
        pwd: [
            /^[\S]{6,12}$/
            , '密码必须6到12位，且不能出现空格'
        ],
        repwd: function (value) {
            //通过形参拿到确认密码框的内容，还需要拿到密码框的内容进行比较
            var pwd = $('.reg-box [name=password]').val();
            if (pwd != value) {
                return '两次输入密码不一致'
            }
        }
    });
    //注册功能
    $('#form_reg').on('submit', function (e) {
        //阻止表单提交
        e.preventDefault();
        //发送ajax请求
        $.ajax({
            method: 'post',
            url: '/api/reguser',
            // data: $(this).serialize(),
            data: {
                username: $('.reg-box [name=username]').val(),
                password: $('.reg-box [name=password]').val(),
            },
            success: function (res) {
                if (res.status != 0) {
                    layer.msg(res.message);
                } else {
                    layer.msg('注册成功，请登录！');
                    //手动切换到登录表单
                    $('#link_login').click();
                    //重置表单
                    $('#form_reg')[0].reset();
                }

            }
        })

    })
    //登录功能
    $('#form_login').on('submit', function (e) {
        //阻止表单默认提交
        e.preventDefault();
        $.ajax({
            method: 'POST',
            url: '/api/login',
            data: $(this).serialize(),
            success: function (res) {
                if (res.status != 0) {
                    return layer.msg(res.message);
                }
                //提示信息，保存token，跳转页面
                layer.msg('登录成功！');
                //保存token，未来要使用token
                localStorage.setItem('token', res.token);
                //跳转页面到主页
                location.href = '/index.html';
            }
        })
    })
})