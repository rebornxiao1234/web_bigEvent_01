//拦截所有ajax请求
//处理参数
$.ajaxPrefilter(function (params) {
    params.url = 'http://ajax.frontend.itheima.net' + params.url
})