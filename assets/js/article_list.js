$(function () {
    var layer = layui.layer;
    var form = layui.form;
    template.defaults.imports.dateFormat = function (date) {
        var dt = new Date(date);
        var y = padZero(dt.getFullYear());
        var m = padZero(dt.getMonth() + 1);
        var d = padZero(dt.getDate());
        var hh = padZero(dt.getHours());
        var mm = padZero(dt.getMinutes());
        var ss = padZero(dt.getSeconds());
        return y + '-' + m + '-' + d + '-' + ' ' + hh + ':' + mm + ':' + ss
    }
    // 补零函数
    function padZero(n) {
        return n > 9 ? n : '0' + n
    }
    var q = {
        pagenum: 1,//页码值
        pagesize: 2,//每页显示多少条数据
        cate_id: '',//	文章分类的 Id
        state: '',//文章的状态，可选值有：已发布、草稿
    }
    initTable();
    //初始化文章列表
    function initTable() {
        $.ajax({
            method: 'get',
            url: '/my/article/list',
            data: q,
            success: function (res) {
                console.log(res);
                var str = template("tpl-table", res);
                $('tbody').html(str);
                renderPage(res.total);
            }
        })
    }
    initCate();
    function initCate() {
        //发送ajax
        $.ajax({
            method: 'GET',
            url: '/my/article/cates',
            success: function (res) {
                if (res.status !== 0) {
                    return layer.msg(res.message);
                }
                var htmlStr = template('tpl-cate', res);
                $('[name=cate_id]').html(htmlStr);
                form.render();
            }
        })
    }
    $('#form-search').on('submit', function (e) {
        e.preventDefault();
        var cate_id = $('[name=cate_id]').val();
        var state = $('[name=state]').val();
        // console.log(cate_id);
        // console.log(state);
        q.cate_id = cate_id;
        q.state = state;
        initTable();
    })
    //分页功能
    function renderPage(total) {
        layui.use('laypage', function () {
            var laypage = layui.laypage;

            //执行一个laypage实例
            laypage.render({
                elem: 'test1' //注意，这里的 test1 是 ID，不用加 # 号
                , count: total //数据总数，从服务端得到
                , limit: q.pagesize //每页显示几条
                , curr: q.pagenum //默认第几页
                , layout: ['count', 'limit', 'prev', 'page', 'next', 'skip']
                , limits: [2, 3, 5, 10]
                , jump: function (obj, first) {
                    //obj包含了当前分页的所有参数，比如：
                    // console.log(obj.curr); //得到当前页，以便向服务端请求对应页的数据。
                    // console.log(obj.limit); //得到每页显示的条数
                    q.pagenum = obj.curr;
                    q.pagesize = obj.limit;
                    //首次不执行
                    if (!first) {
                        initTable();
                    }
                }
            });
        });
    }
    //删除功能
    $('tbody').on('click', '#btn_del', function () {
        var id = $(this).attr('data-id');
        layer.confirm('是否确认删除?', { icon: 3, title: '确认删除' }, function (index) {
            //发送ajax
            $.ajax({
                method: 'GET',
                url: '/my/article/delete/' + id,
                success: function (res) {
                    if (res.status !== 0) {
                        return layer.msg(res.message);
                    }
                    layer.msg('恭喜你删除文章成功！');
                    if ($('.btn_del').length == 1 && q.pagenum > 1) q.pagenum--;
                    //删除成功重新渲染页面
                    initTable();
                }
            })
            layer.close(index);
        });
    })


})
