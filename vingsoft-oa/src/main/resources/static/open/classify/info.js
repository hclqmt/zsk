/**
 * 初始化菜单详情
 */
var Info = {
    zTreeInstance : null
};

/**
 * 关闭此对话框
 */
Info.close = function(status,msg) {
	parent.layer.close(window.parent.Manage.layerIndex);
	window.parent.Manage.reload(status,msg);
}

layui.use(['form'], function(){
    var form = layui.form;

    //监听提交(新增)
    form.on('submit(save-btn)', function(data){
      	$.ajax({
            type:"post",
            url:Feng.ctxPath+"/doc/classify/add",
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
            		Info.close("1",result.msg);
            	}else{
            		layer.close(loading);
            		Info.close("0",result.msg);
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
    //监听提交(编辑)
    form.on('submit(edit-btn)', function(data){
      	$.ajax({
            type:"put",
            url:Feng.ctxPath+"/doc/classify/edit",
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
            		Info.close("1",result.msg);
            	}else{
            		layer.close(loading);
            		Info.close("0",result.msg);
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
    
    form.verify({
    	IsIntegerPositive: function(value){
    		if(!/^[+]{0,1}(\d+)$/.test(value)) {
    			return '请填入正整数！';
    		}
        },
        IsIntegerAndEnglishCharacter: function(value){
    		if(!/^[0-9A-Za-z]+$/.test(value)) {
    			return '请输入数字和英文字母组合！';
    		}
        }
    });
    form.render(); //更新全部
});


/**
 * 显示菜单选择的树
 *
 * @returns
 */
Info.showDeptSelectTree = function(id) {
	var dtree = new $DTree('/doc/classify/getClassifyTree?ids='+id, "选择上级分类","270px","90%");
	dtree.setIds("classifyParentUuid","classifyParentName");
	dtree.setCheckbarType("only");
	dtree.openTree();
}

