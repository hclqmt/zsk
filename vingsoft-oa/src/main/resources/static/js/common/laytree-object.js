/***
 * 对layui dtree封装
 * @author MrTang
 */

(function() {
	/**
	 * url:后台数据地址
	 * btnId:触发点击事件的页面元素id
	 * saveId:保存节点id的页面元素id
	 * saveName:保存节点名称的页面元素id
	 * dtree:dtree树插件对象
	 * checkbar:布尔型，是否多选
	 * checkbarType:多选类型  默认就是all，其他的值为： no-all  p-casc   self  only
	 * title:弹窗标题
	 * width:弹窗宽度
	 * height:弹窗高度
	 */
	var $DTree = function(url,btnId,saveId,saveName,dtree,checkbar,checkbarType,title,width,height,type) {
		this.url = url;
		this.btnId = btnId;
		this.saveId = saveId;
		this.saveName = saveName;
		this.dtree = dtree;
		this.checkbar = checkbar==null?false:checkbar;
		this.checkbarType = checkbarType==null?"all":checkbarType;
		this.title = title==null?"选择树":title;
		this.width = width==null?"400px":width;
		this.height = height==null?"80%":height;
		this.type = type==null?"":type;
		this.afterFunc = null;
	};
	
	$DTree.prototype = {
		/**
		 * 初始化dtree
		 */
		init : function(treeObj) {
			$("#"+treeObj.btnId).click(function(){
				layer.open({
				    type: 1, //type:0 也行
				    title: treeObj.title,
				    area: [treeObj.width, treeObj.height],
				    content: '<ul id="openTree" class="dtree" data-id="0"></ul>',
				    btn: ['确认选择'],
				    success: function(layero, index){
				    /* var aa=	treeObj.dtree.render;
				     console.log(aa);*/
					      var DTree = treeObj.dtree.render({
						        obj: $(layero).find("#openTree"), 
						        url: Feng.ctxPath+treeObj.url,
						        method:"GET",
						        dataFormat: "list",  //配置data的风格为list
						        checkbar: treeObj.checkbar, // 开启复选框
						        checkbarType:treeObj.checkbarType,
						        done: function(data, obj){  //使用异步加载回调
					    	  		
							         var id = $("#"+treeObj.saveId).val();
							         var reportId = getCheckWhenRefalsh(id,treeObj.type);//将刷新前选中的值保存到初始化复选值之后，用于树页面保存刷新前选中的值
							         nodes = "";//清除全局变量
							         if(treeObj.type!=""&&treeObj.checkbar&&reportId.length>0){
							        	 var val = reportId.split(",");
								         var result = "";
								         for(var key in val){
								        	 result += val[key]+treeObj.type+",";
								         }
								         reportId = result;
							         }
							         treeObj.dtree.chooseDataInit("openTree", reportId); // 初始化复选框的值
						        }
					      });
				    },
				    yes: function(index, layero) {
					      var flag = true;
					      if(treeObj.checkbar){
					    	  var params = treeObj.dtree.getCheckbarNodesParam("openTree"); // 获取选中值
					    	  var len = params.length;
					    	  var val = [];
					    	  if(params.length == 0){
							        layer.msg("请至少选择一个节点",{icon:2});
							        flag = false;
						      }else{
					    	  if(treeObj.type!=""){
					    		  for(var key in params){
								        var param = params[key];
								        if(param.nodeId.indexOf(treeObj.type)>0){
								        	val.push(param); 
								        }
							      }
					    	  }else{
					    		  val = params;
					    	  }
						    	  
						    	  if(val.length == 0){
								        layer.msg("请至少选择一个"+treeObj.type+"类型的节点",{icon:2});
								        flag = false;
							      }
						      }
						      
						      var ids = [], names = [];
						      for(var key in val){
							        var param = val[key];
							        ids.push(param.nodeId.replace(treeObj.type,""));
							        names.push(param.context);
						      }
						      $("#"+treeObj.saveId).val(ids.join(","));
						      $("#"+treeObj.saveName).val(names.join(","));
					      }else{
					    	  var param = treeObj.dtree.getNowParam("openTree"); // 获取当前选中节点
					    	  if(treeObj.type!=""&&param.nodeId.indexOf(treeObj.type)<0){
					    		  layer.msg("请至少选择一个"+treeObj.type+"类型的节点",{icon:2});
							      flag = false;
					    	  }
					    	  $("#"+treeObj.saveId).val(param.nodeId.replace(treeObj.type,""));
					          $("#"+treeObj.saveName).val(param.context);
					      }
					      if(flag){
					    	  layer.close(index);
					      }
				    }
				});
			});
		},
		setAfterFunc : function(func){
			this.afterFunc = func;
		}
	};
	window.$DTree = $DTree;
}());

var dtree1=function(options){	// 初始化树
	var dTree = null;
	var id = event.getElemId(options);
	if(id == "") {
		layer.msg("页面中未找到绑定id", {icon:5});
	} else {
		dTree = DTrees[id];
		if(typeof dTree === 'object'){
			dTree.reloadSetting(options);
			dTree.initTreePlus();
			dTree.openTreePlus();
			dTree.init();
			dTree.unbindBrowserEvent();
			dTree.bindBrowserEvent();
		} else {
			// 创建树
			dTree = new DTree(options);
			// 添加到树数组中去
			DTrees[id] = dTree;
			dTree.initTreePlus();
			dTree.openTreePlus();
			dTree.init();
			dTree.bindBrowserEvent();
		}
	}

	return dTree;
}


function getCheckWhenRefalsh(saveId,type){
	debugger
	var saveId1 = "";//用于保存对saveId处理后的值
	if(saveId != "") {//若saveId为空就说明父页面隐藏域无值，可直接与刷新前选中的id拼接，负责要进行处理
		saveId1 = "," + saveId + ",";
	}
	var resultId = saveId;//用于保存隐藏域值与刷新前选中之拼接后的返回值
	if(type == "") {//部门树处理方法
		for(var i = 0; i < nodes.length; i++) {//对子节点进行循环
			var id = nodes[i].nodeId//子节点id
			var isLeaf = nodes[i].isLeaf//是否为子节点
			var userid1 = "," + id + ",";//对id两端拼接‘,’用于判断是否包含隐藏域值，将不包含的id拼接到结果字符串中
			if(saveId1.search(userid1) == -1) {
				resultId += "," + id;
			}
		}
	} else {//非部门树处理方法
		for(var i = 0; i < nodes.length; i++) {//对子节点进行循环
			var id = nodes[i].nodeId//子节点id
			var isLeaf = nodes[i].isLeaf//是否为子节点
			if(isLeaf) {
				var userid = id.substring(0,id.length-4);//截取id值
				var userid1 = "," + userid + ",";//对id两端拼接‘，’用于判断是否包含隐藏域值，将不包含的id拼接到结果字符串中
				if(saveId1.search(userid1) == -1) {
					resultId += "," + userid;
				}
			}
		}
	}
	return resultId;
}


