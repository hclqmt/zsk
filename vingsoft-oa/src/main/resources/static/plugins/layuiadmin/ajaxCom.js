//定义模块
layui.define(['form','laypage'], function(exports){

    var form = layui.form; //只有执行了这一步，部分表单元素才会自动修饰成功
    var $ = layui.$;
    var laypage = layui.laypage;

    var obj = {
        getAjazList: function (count,type,sysUserId,ele) {
            laypage.render({
                elem: ele //注意，这里的 test1 是 ID，不用加 # 号
                ,count: count //数据总数，从服务端得到
                ,layout: ['prev', 'page', 'next','skip']
                ,jump: function(obj, first){
                    if(first){
                        return;
                    }
                    $.ajax({
                        url:'${ctxPath}/doc/sysUser/getList?page='+obj.curr+"&limit="+obj.limit+"&sysUserId="+sysUserId
                        +"&type="+type,
                        type:'get',
                        dataType:'html',
                        success:function(res){
                            console.log(res);
                            $("#container").html('');
                            $("#container").html(res);
                        },
                        error: function (res) {
                            console.log(res)
                        }
                    })

                }
            });
        }
    }

    //输出模块
    exports('ajaxCom', obj);
});