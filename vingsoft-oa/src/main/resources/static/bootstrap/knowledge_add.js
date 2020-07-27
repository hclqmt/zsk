layui.use(['form','layer','layedit','laydate','upload'],function(){
    var form = layui.form
    layer = parent.layer === undefined ? layui.layer : top.layer,
        laypage = layui.laypage,
        upload = layui.upload,
        layedit = layui.layedit,
        laydate = layui.laydate,
        $ = layui.jquery;

        //创建一个编辑器
        var editIndex = layedit.build('news_content',{
            height : 330
        });
        //用于同步编辑器内容到textarea
        //提交时把值同步到文本域中
        form.verify({
            //content富文本域中的lay-verify值
            content: function(value) {
                return layedit.sync(editIndex);
            }
        });


    //格式化时间
    function filterTime(val){
        if(val < 10){
            return "0" + val;
        }else{
            return val;
        }
    }
    //普通图片上传
    var uploadInst = upload.render({
        elem: '#test1'
        ,url: '/fileUpload/upload'
        ,method: 'get'
        ,headers: {token: 'sasasas'}
        ,before: function(obj){
            //预读本地文件示例，不支持ie8
            obj.preview(function(index, file, result){
                $('#demo1').attr('src', result); //图片链接（base64）
            });
        }
        ,done: function(res){
            //如果上传失败
            if(res.code > 0){
                return layer.msg('上传失败');
            }
            //上传成功
        }
        ,error: function(){
            //演示失败状态，并实现重传
            var demoText = $('#demoText');
            demoText.html('<span style="color: #FF5722;">上传失败</span> <a class="layui-btn layui-btn-xs demo-reload">重试</a>');
            demoText.find('.demo-reload').on('click', function(){
                uploadInst.upload();
            });
        }
    });

        //监听提交(新增)
        form.on('submit(save-btn)', function(data){
            console.log(data)
            $.ajax({
                type:"post",
                url:Feng.ctxPath+"/doc/knowledge/add",
                dataType:"json",
                data:data.field,
                cache:false,
                async:false,
                timeout:60000,
                beforeSend:function(){
                    loading=layer.msg('正在提交', {icon: 16, shade: 0.3, time:0});
                    $(".layui-btn").attr("disabled","disabled");
                },
                success:function(result) {
                    if(result.state == 1){
                        Info.close(result.msg,1);
                    }else{
                        layer.close(loading);
                        Feng.error(result.msg);
                    }
                },
                complete: function () {
                    $(".layui-btn").removeAttr("disabled");
                },
                error:function(err) {
                    layer.close(loading);
                    Feng.error("系统繁忙，请稍后重试！");
                }
            });
            return false;
        });

})


var Info = {
};
/**
 * 关闭此对话框
 */
Info.close = function(msg,icon) {
    parent.layer.close(window.parent.Manage.layerIndex);
    if(msg!=null&&msg.length>0){
        if(icon!=null&&icon>0){
            parent.layer.msg(msg, {icon: icon});
        }else{
            parent.layer.msg(msg);
        }
    }
    window.parent.Manage.instance.reload();
}

Info.showClassifySelectTree = function(id) {
    alert();
    var dtree = new $DTree('/doc/knowledge/getDocKnowledgeTree?ids='+id, "选择分类","270px","70%");
    console.log(dtree);
    dtree.setIds("docClassify","classifyNname");
    dtree.setCheckbarType("only");
    dtree.openTree();
}

