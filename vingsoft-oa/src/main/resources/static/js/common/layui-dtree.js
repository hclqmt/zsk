/**
 * layui dtree封装
 * @author mrtang
 * @returns
 * 
 * 左边的树
 * var dtree = new $DTree('/sysDept/getDeptTree');
 * dtree.setCheckbar(false);
 * dtree.setElem("slTree");
 * dtree.initLeftTree();
 * 
 * 下拉树
 * var dtree = new $DTree('/sysDept/getDeptTree');
 * dtree.setIds("deptId","deptName");
 * dtree.setCheckbar(false);
 * dtree.setElem("slTree");
 * dtree.initSelectTree();
 * 
 * 弹出树一（返回值）
 * var dtree = new $DTree('/sysDept/getDeptTree?ids='+id, "选择部门","270px","70%");
 * dtree.setIds("deptId","deptName");
 * dtree.setCheckbarType("only");
 * dtree.openTree();
 * 
 * 弹出树二（保存值）
 * var dtree = new $DTree('/sysUser/getUserRoles/'+id, "分配角色","270px","70%");
 * dtree.setType(2,'/sysUser/saveUserRoles');
 * dtree.setData({"userid":id});
 * dtree.openTree();
 */
(function() {
	var $DTree = function(url, title, width, height) {
		this.title = title == null ? "dtree" : title; // 弹窗标题
		this.width = width == null ? "400px" : width; // 弹窗宽度
		this.height = height == null ? "80%" : height; // 弹窗高度
		this.dataUrl = url; // 获取数据url
		this.saveUrl = null; // 保存数据url
		this.data = null; // 保存数据时的额外参数 json格式：{"id":1,"name":"思甜"}
		this.type = 1; // 树的类型：1 将值返回给上级页面； 2 将值传到保存数据url进行保存
		// 扩展信息
		this.ids = null;
		this.names = null;
		this.checkbar = true;
		// 默认就是all，其他的值为： no-all半选 p-casc单向级联 self独立 only单选
		this.checkbarType = "all";
		// 默认展开层级，当该值大于level时，则会展开树的节点，直到不大于当前待展开节点的level。
		this.initLevel = 3;
		this.icon = "5";
		this.elem = "slTree";
		this.chooseType = "";
	};

	$DTree.prototype = {
		/****************************设置属性Start****************************/
		setElem : function(elem){
			this.elem = elem;
		},
		/**
		 * 默认将数据返回上级页面，设置type方法可修改为保存数据方式
		 */
		setType : function(type, saveUrl) {
			this.type = type;
			this.saveUrl = saveUrl;
		},
		/**
		 * 设置额外参数
		 */
		setData : function(data) {
			this.data = data;
		},
		/**
		 * 设置上级页面元素id
		 */
		setIds : function(ids, names) {
			this.ids = ids;
			this.names = names;
		},
		/**
		 * 设置是否开启复选框
		 */
		setCheckbar : function(checkbar){
			this.checkbar = checkbar;
		},
		/**
		 * 设置dtree树的类型
		 */
		setCheckbarType : function(checkbarType) {
			this.checkbarType = checkbarType;
		},
		/**
		 * 设置展开层级
		 */
		setInitLevel : function(initLevel) {
			this.initLevel = initLevel;
		},
		setIcon : function(icon){
			this.icon = icon;
		},
		/**
		 * 设置选择节点类型
		 */
		setChooseType : function(chooseType){
			this.chooseType = chooseType;
		},
		/****************************设置属性End****************************/
		/****************************弹窗——树start****************************/
		/**
		 * 打开树弹窗
		 */
		openTree : function() {
			// 判断设置是否正确
			if (this.type == 1) {
				if (this.ids == null || this.names == null) {
					layer.msg("请配置接收数据的元素", {
						icon : 2
					});
					return false;
				}
			} else if (this.type == 2) {
				if (this.saveUrl == null) {
					layer.msg("请配置保存数据url地址", {
						icon : 2
					});
					return false;
				}
			} else {
				layer.msg("未知的dtree类型", {
					icon : 2
				});
				return false;
			}

			var dtreeObj = layui.dtree;
			var obj = this;
			var index = layer.open({
				type : 1, // type:0 也行
				title : this.title,
				area : [ this.width, this.height ],
				content : '<ul id="openTree" class="dtree" data-id="0"></ul>',
				btn : [ '确认选择' ],
				success : function(layero, index) {
					dtreeObj.render({
						elem : "#openTree",
						url : Feng.ctxPath + obj.dataUrl,
						method : "get",
						async : false,
						dataStyle : "layuiStyle", // 使用layui风格的数据格式
						dataFormat : "list", // 配置data的风格为list
						response : {
							message : "msg",
							statusCode : 0
						}, // 修改response中返回数据的定义
						checkbar : obj.checkbar, // 开启复选框
						checkbarType : obj.checkbarType,
						initLevel : obj.initLevel
					});
				},
				yes : function(index, layero) {
					var flag = true;
					var val = [];
					var params = dtreeObj.getCheckbarNodesParam("openTree"); // 获取选中值
					var chooseTypeChn = '';
					if('dept'==obj.chooseType){
						chooseTypeChn = '部门';
					}else if('user'==obj.chooseType){
						chooseTypeChn = '人员';
					}else{
						chooseTypeChn = obj.chooseType;
					}


					if (params.length == 0) {
						layer.msg("请至少选择一个节点", {
							icon : 2
						});
						flag = false;
					}else{
				    	  if(obj.chooseType!=""){
				    		  for(var key in params){
							        var param = params[key];
							        if(param.nodeId.indexOf(obj.chooseType)>=0){
							        	val.push(param); 
							        }
						      }
				    	  }else{
				    		  val = params;
				    	  }
				    	  if(val.length == 0){
						        layer.msg("请至少选择一个"+chooseTypeChn+"类型的节点",{icon:2});
						        flag = false;
					      }
				      }
					if(val.length==0){
						flag = false;
					}else{
						var ids = [], names = [];
						for ( var key in val) {
							var param = val[key];
							 ids.push(param.nodeId.replace(obj.chooseType,""));
							 names.push(param.context);
						}
						if (obj.type == 1) {
							flag = obj.getDataToParent(ids, names);
						} else if (obj.type == 2) {
							flag = obj.saveData(ids, names);
						}
					}
					
					if (flag) {
						layer.close(index);
					}
				}
			});
		},
		/**
		 * 将选中的数据传给上级页面
		 */
		getDataToParent : function(ids, names) {
			$("#" + this.ids).val(ids.join(","));
			$("#" + this.names).val(names.join(","));
			return true;
		},
		/**
		 * 保存数据
		 */
		saveData : function(ids, names) {
			var flag = false;
			var data = {};
			data["ids"] = ids.join(",");
			data["names"] = names.join(",");
			data["data"] = this.data;
			$.ajax({
				type : "POST",
				url : Feng.ctxPath + this.saveUrl,
				data : JSON.stringify(data),
				contentType : "application/json;charsetset=UTF-8",
				dataType : 'json',
				cache : false,
				async : false,
				success : function(data) {
					// console.log(data);
					var msg = data.msg;
					if (1 == data.state) {
						layer.msg(msg, {
							icon : 1
						});
						flag = true;
					} else {
						layer.msg(msg, {
							icon : 2
						});
					}
				}
			});
			return flag;
		},
		/****************************弹窗——树end****************************/
		/****************************下拉框——树start****************************/
		/**
		 * 初始化下拉框树
		 */
		initSelectTree : function(){
			if (this.ids == null || this.names == null) {
				layer.msg("请配置接收数据的元素", {
					icon : 2
				});
				return false;
			}
			var obj = this;
			var dtreeObj = layui.dtree;
			dtreeObj.render({
				elem: "#"+obj.elem,
				url : Feng.ctxPath + obj.dataUrl,
				method : "get",
				async : false,
				dataStyle : "layuiStyle", // 使用layui风格的数据格式
				dataFormat : "list", // 配置data的风格为list
				response : {
					message : "msg",
					statusCode : 0
				}, // 修改response中返回数据的定义
				checkbar : obj.checkbar, // 开启复选框
				chooseType : obj.chooseType,//选择类型
				checkbarType : obj.checkbarType,
				initLevel : obj.initLevel,
				icon: obj.icon,
				accordion:true
			});
			//绑定节点点击事件
			dtreeObj.on("node(slTree)", function(node){
				if(node.param.nodeId.indexOf(obj.chooseType)>=0){
					$("#"+obj.ids).val(node.param.nodeId.replace(obj.chooseType,""));
					$("#"+obj.names).val(node.param.context);
					$("#"+obj.names).toggleClass("layui-form-selected");
					$("#divTree").toggleClass("layui-show layui-anim layui-anim-upbit");
				}
			});
		},
		/**
		 * 打开下拉树
		 */
		openSelectTree : function(){
			$("#"+this.names).toggleClass("layui-form-selected");
			$("#divTree").toggleClass("layui-show layui-anim layui-anim-upbit");
		},
		/****************************弹窗——树end****************************/
		/**
		 * 初始化左边的树
		 */
		initLeftTree : function(){
			var obj = this;
			var timer = window.setInterval(function(){
				var dtreeObj = layui.dtree;
				if(dtreeObj==null||dtreeObj=="undefined"){
					return false;
				}else{
					//去掉定时器的方法  
				    window.clearInterval(timer); 
				}
				dtreeObj.render({
					elem: "#"+obj.elem,
					url : Feng.ctxPath + obj.dataUrl,
					method : "get",
					async : false,
					dataStyle : "layuiStyle", // 使用layui风格的数据格式
					dataFormat : "list", // 配置data的风格为list
					response : {
						message : "msg",
						statusCode : 0
					}, // 修改response中返回数据的定义
					checkbar : obj.checkbar, // 开启复选框
					checkbarType : obj.checkbarType,
					chooseType : obj.chooseType,//选择类型
					initLevel : obj.initLevel,
					icon: obj.icon,
					accordion:true
				});
				//绑定节点点击事件
				dtreeObj.on("node(slTree)", function(node){
						layui.use([ 'table' ], function() {
							// 执行重载
							var table = layui.table;
							table.reload('Reload', {
								page : {
									curr : 1
								// 重新从第 1 页开始
								},
								where : {
									nodeId : node.param.nodeId.replace(obj.chooseType,"")
								}
							});
						});
				});
			},100);
		}
	}
	
	window.$DTree = $DTree;
}());