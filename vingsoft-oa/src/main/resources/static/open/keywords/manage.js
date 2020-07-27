/**
 * 菜单管理初始化
 */

var Manage = {
	instance:null,
	title:"分类管理",
	elem: "layTable",	//表格id
    url: "/doc/keywords/queryList"			//数据服务地址
};

/**
 * 表格实例
 */
Manage.setInstance = function (instance){
	this.instance = instance;
}

/**
 * 初始化表格的列
 */
Manage.initColumn = function () {
    return [ [
    	{type : 'checkbox',fixed : 'left'},
    	{title : 'ID',field : 'id',align : 'center',unresize : true,sort : true,hide : true},
    	/*{title : '上级菜单',field : 'parentName',align : 'left',hide : true}, */
    	{title : '名称',field : 'name',align : 'center'},
    	{title : '排序',field : 'sort',align : 'center'},
    	{title : '备注',field : 'remark',align : 'center',sort : true}
    	] ];
};


$(function () {
    var defaultColunms = Manage.initColumn();

    var table = null;
    layui.use(['table','form'], function() {
		var form = layui.form;

	    form.render();

		table = layui.table;

		//渲染表格
		var ins = table.render({
		    elem: '#'+Manage.elem,
		    url: Feng.ctxPath + Manage.url,
		    toolbar: '#toolbar'
		    	,defaultToolbar: ['filter']
		    ,height: 350
		    ,page: { // 支持传入 laypage 组件的所有参数（某些参数除外，如：jump/elem） - 详见文档
		    	layout: ['limit', 'count', 'prev', 'page', 'next', 'skip'], // 自定义分页布局
		    	groups: 5, // 只显示 1 个连续页码
		    	first: false, // 不显示首页
		    	last: false // 不显示尾页
		    },
		    cols: defaultColunms,
			done: function(res, curr, count){
				// $("[data-field='status']").children().each(function(){
				// 	if($(this).text()=='1'){
				// 		$(this).text("启用")
				// 	}else if($(this).text()=='0'){
				// 		$(this).text("禁用")
				// 	}
				// });
			},
		    id: 'Reload',
		    limit:10,limits: [5,10,20,30,50,100,200,500],
		    initSort:{
		    	field:'sort',
		    	type:'asc'
		    }
		});

		//设置表格实例
		Manage.setInstance(ins);

		//监听是否启用操作
		form.on('checkbox(ifEnable)', function(obj){
			layer.tips(this.value + ' ' + this.name + '：'+ obj.elem.checked, obj.othis);
	  	});

		//查询
		var $ = layui.$, active = {
		    reload: function(){
		      var name = $('#name');
		      //执行重载
		      table.reload('Reload', {
		        page: {
		          curr: 1 //重新从第 1 页开始
		        }
		        ,where: {
				  	name: name.val(),
		        }
		      });
		    }
		};
		$('#btn-search').on('click', function(){
		    var type = $(this).data('type');
		    active[type] ? active[type].call(this) : '';
		});

		// 头工具栏事件
		table.on('toolbar('+Manage.elem+')', function(obj) {
			var checkStatus = table.checkStatus(obj.config.id);
			switch (obj.event) {
			case 'add':
				var data = checkStatus.data;
				Manage.openAddDept();
				break;
			case 'edit':
				var data = checkStatus.data;
				if(data.length!=1){
					layer.msg('请选中一条记录进行编辑', {icon: 5});
					break;
				}
				Manage.openDeptDetail(data[0].id);
				break;
			case 'delete':
				var data = checkStatus.data;
				if(data.length==0){
					layer.msg('请选中要删除的数据', {icon: 5});
					break;
				}
				layer.confirm('是否删除数据', function(index) {
					var ids = "";
					for(var i=0;i<data.length;i++){
						ids += data[i].id+",";
					}
					ids = ids.substring(0,ids.length-1);
					Manage.delete(ids);
					layer.close(index);
				});
				break;
			};
		});
	});
});


/**
 * 点击添加菜单
 */
Manage.openAddDept = function () {
    var index = layer.open({
        type: 2,
        title: '添加分类',
        area: ['700px', '450px'], //宽高
        fix: false, //不固定
        maxmin: true,
        content: Feng.ctxPath + '/doc/keywords/addKeywords'
    });
    this.layerIndex = index;
};

/**
 * 打开查看菜单详情
 */
Manage.openDeptDetail = function (id) {

    var index = layer.open({
        type: 2,
        title: '分类详情',
        area: ['700px', '450px'], //宽高
        fix: false, //不固定
        maxmin: true,
        content: Feng.ctxPath + '/doc/keywords/editKeywords/' + id
    });
    this.layerIndex = index;

};

/**
 * 删除菜单
 */
Manage.delete = function (id) {

    $.ajax({
        type:"delete",
        url:Feng.ctxPath + "/doc/keywords/delete",
        dataType:"json",
        data:JSON.stringify(id),
        cache:false,
        async:false,
        timeout:60000,
        success:function(result) {
        	if(result.state == 1){
        		Feng.success(result.msg);
        		Manage.reload();
        	}else{
        		Feng.error(result.msg);
        	}
        },
        error:function(err) {
        	Feng.error("系统繁忙，请稍后重试！");
        }
    });

};

/**
 * 刷新
 */
Manage.reload = function(status,msg){
	location.reload();
	if(status=="1"){
		Feng.success(msg);
	}else if(status=="0"){
		Feng.error(msg);
	}
}
