$(function () {
    getUserInfo();
    //退出
    var layer = layui.layer;
    $('#btnLogout').on('click', function () {
        layer.confirm('是否确认退出？', { icon: 3, titie: '提示' }, function (index) {
            localStorage.removeItem('token');
            location.href = '/login.html';
            layer.close(index);
        })
    })
})
//获取用户信息
function getUserInfo() {
    //发送ajax请求
    $.ajax({
        url: '/my/userinfo',
        // headers: {
        //     Authorization: localStorage.getItem('token') || '',
        // },
        success: function (res) {
            if (res.status != 0) {
                return layui.layer.msg(res.message);
            }
            renderAvatar(res.data)
        }
    })
}
//渲染用户名和头像
function renderAvatar(user) {
    //用户名
    var name = user.nickname || user.username;
    $('.welcome').html('欢迎你&nbsp;&nbsp;' + name);
    // 用户头像
    if (user.user_pic !== null) {
        //有头像
        $('.layui-nav-img').show().attr('src', user.user_pic);
        $('.user-avatar').hide();
    } else {
        //没有头像
        $('.layui-nav-img').hide();
        var text = name[0].toUpperCase();
        $('.user-avatar').show().html(text);
    }
}