/**
 * layui 上传组件封装
 * @author mrtang
 * @returns
 * var upload = new $Upload(unid,btnid);
 * upload.setImgId("imgid");
 * upload.init();
 */
(function() {
	var $Upload = function(uniqueCodeId,btnId) {
		this.uniqueCodeId = uniqueCodeId;	//存储文件唯一码的页面元素id
		this.btnId = btnId;					//上传按钮ID（作为参数是为了一个页面 可能有多个上传）
		this.imgId = null;					//图片预览元素id
		this.fileNameId = null;				//文件名回显元素id
		this.size = 10*1024;				//上传文件大小，单位KB,这里转为M，默认大小10M
		this.accept = 'file';				//指定允许上传时校验的文件类型，可选值有：images（图片）、file（所有文件）、video（视频）、audio（音频）
	}
	
	$Upload.prototype = {
		setImgId : function(imgId){
			this.imgId = imgId;
		},
		setFileNameId : function(fileNameId){
			this.fileNameId = fileNameId;
		},
		setSize : function(size){
			this.size = size*1024;
		},
		setAccept : function(accept){
			this.accept = accept;
		},
		init : function(){
			var ins = this;//对象实例
			layui.use('upload', function(){
				var upload = layui.upload;
				var uploadInst = upload.render({
				    elem: '#'+ins.btnId
				    ,url: Feng.ctxPath+'/file'
				    ,accept: ins.accept //允许上传的文件类型
				    ,size: ins.size //最大允许上传的文件大小
				    ,before: function(obj){
				    	if(ins.imgId!=null){
					    	//预读本地文件示例，不支持ie8
					    	obj.preview(function(index, file, result){
					    		$('#'+ins.imgId).attr('src', result); //图片链接（base64）
					    	});
				    	}
				    }
				    ,done: function(res){
				    	//如果上传失败
				    	if(res.code > 0){
				    		return layer.msg('上传失败');
				    	}
				    	//上传成功
				    	layer.msg('上传成功');
				    	if(ins.uniqueCodeId!=null){
				    		$("#"+ins.uniqueCodeId).val(res.uniqueCode);
				    	}
				    	if(ins.fileNameId!=null){
				    		$("#"+ins.fileNameId).val(res.fileName);
				    	}
				    }
				    ,error: function(){
				    	if(ins.imgId!=null){
					    	//演示失败状态，并实现重传
					    	var demoText = $('#'+ins.btnId+'Text');
					    	demoText.html('<span style="color: #FF5722;">上传失败</span> <a class="layui-btn layui-btn-xs '+ins.btnId+'-reload">重试</a>');
					    	demoText.find('.'+ins.btnId+'-reload').on('click', function(){
					    		uploadInst.upload();
					    	});
				    	}
				    }
				});
			});
		}
	}
	window.$Upload = $Upload;
}());