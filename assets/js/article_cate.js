$(function () {
    //文章类别列表展示
    initArticleList();
    //显示添加文章分类列表
    var layer = layui.layer;
    var form = layui.form;
    $('#btnAdd').on('click', function () {
        indexAdd = layer.open({
            type: 1,
            title: '添加文章分类',
            area: ['500px', '260px'],
            content: $('#dialog_add').html(),
        });
    })
    //使用事件委托给提交按钮添加事件
    var indexAdd = null;
    $('body').on('submit', '#form-add', function (e) {
        e.preventDefault();
        //发送ajax
        $.ajax({
            method: 'POST',
            url: '/my/article/addcates',
            data: $('#form-add').serialize(),
            success: function (res) {
                if (res.status !== 0) {
                    return layer.msg(res.message);
                }
                //添加成功需要重新渲染页面数据
                initArticleList();
                layer.msg('恭喜你添加成功！');
                layer.close(indexAdd);
            }
        })
    })
    //修改
    var indexEdit = null;
    $('tbody').on('click', '#btn_edit', function () {
        indexEdit = layer.open({
            type: 1,
            title: '添加文章分类',
            area: ['500px', '260px'],
            content: $('#dialog_edit').html(),
        });
        //获取id。发送ajax获取数据，渲染到页面
        var id = $(this).attr('data-id');
        // console.log(id);
        $.ajax({
            method: 'GET',
            url: '/my/article/cates/' + id,
            success: function (res) {
                form.val("form-edit", res.data);
            }
        })
    })
    $('body').on('submit', '#form-edit', function (e) {
        e.preventDefault();
        //发送ajax
        $.ajax({
            method: 'POST',
            url: '/my/article/updatecate',
            data: $('#form-edit').serialize(),
            success: function (res) {
                if (res.status !== 0) {
                    return layer.msg(res.message);
                }
                //添加成功需要重新渲染页面数据
                initArticleList();
                layer.msg('恭喜你修改成功！');
                layer.close(indexEdit);
            }
        })
    })
    //删除
    $('tbody').on('click', '#btn_del', function () {
        var id = $(this).attr('data-id');
        layer.confirm('是否确认删除?', { icon: 3, title: '确认删除' }, function (index) {
            //发送ajax
            $.ajax({
                method: 'GET',
                url: '/my/article/deletecate/' + id,
                success: function (res) {
                    if (res.status !== 0) {
                        layer.msg(res.message);
                    }
                    //删除成功重新渲染页面
                    initArticleList();
                    layer.msg('恭喜你删除成功！');
                    layer.close(index)
                }
            })
        });
    })
})
//渲染页面函数
function initArticleList() {
    //发送ajax
    $.ajax({
        url: '/my/article/cates',
        success: function (res) {
            var str = template('tpl-art-cate', res)
            $('tbody').html(str);
        }
    })
}