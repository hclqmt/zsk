/**
 * layui notice封装
 * @author mrtang
 * @returns
 * var notice = new $Notice();
 * notice.hint("通知...");
 */
(function() {
	var $Notice = function() {
		//主题类型，可选warm,danger,custom,default,默认default 
		this.type = "default";
		//notice内容
		this.title = null;
		//图标，支持所有layui内置图标
		this.icon = null;
		//内容显示位置，可选left，right，center。默认居中center 
		this.align = "center";
		//开启自动移除，默认true
		this.autoClose = true;
		//自动移除时间，默认3000
		this.time = 3000;
		//是否允许点击移除，默认true
		this.click = true;
		//是否显示系统级通知，默认false
		this.desktop = false;
	};
	$Notice.prototype = {
		setType : function(type){
			this.type = type;
		},
		setIcon : function(icon){
			this.icon = icon;
		},
		setAlign : function(align){
			this.align = align;
		},
		setAutoClose : function(autoClose){
			this.autoClose = autoClose;
		},
		setTime :function(time){
			this.time = time;
		},
		setClick :function(click){
			this.click = click;
		},
		setDesktop : function(desktop){
			this.desktop = desktop;
		},
		hint : function(title){
			var notice = layui.notice;
			var obj = this;
			notice.init({
                type: obj.type,
                autoClose: obj.autoClose,
                icon: obj.icon,
                align: obj.align,
                time: obj.time,
                click: obj.click,
                desktop: obj.desktop,
                title: title
            });
		}
	}
	window.$Notice = $Notice;
}());
