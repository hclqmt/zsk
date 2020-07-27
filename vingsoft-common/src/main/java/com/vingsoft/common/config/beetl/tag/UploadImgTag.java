/**  

* <p>Title: UploadImgTag.java</p>  

* <p>Description: </p>    

* <p>Company: www.vingsoft.com</p>  

* @author MrTang

* @date 2018年12月4日  

* @version 1.0  

*/  
package com.vingsoft.common.config.beetl.tag;

import java.util.Map;

import org.apache.commons.lang.StringUtils;
import org.beetl.core.GeneralVarTagBinding;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Scope;
import org.springframework.stereotype.Component;

import com.vingsoft.common.annotation.BeetlTagName;
import com.vingsoft.fileManage.core.FileManage;


/**  

* <p>Title: UploadImgTag</p>  

* <p>Description: 图片上传标签</p>  

* @author MrTang

* @date 2018年12月4日  

*/
@Component
@Scope("prototype")
@BeetlTagName("uploadImg")
@SuppressWarnings("unchecked")
public class UploadImgTag extends GeneralVarTagBinding {
	
	private static Logger logger = LoggerFactory.getLogger(UploadImgTag.class);
	
	@Autowired
	private FileManage fileManage;

	/* (non-Javadoc)  
	
	 * <p>Title: render</p>  
	
	 * <p>Description: </p>  
	  
	
	 * @see org.beetl.core.Tag#render()  
	
	 */
	@Override
	public void render() {
		StringBuilder img = new StringBuilder();
		Map<String,String> attrs = (Map<String, String>) args[1];
		String name = attrs.get("name");	//字段名
		String value = attrs.get("value");	//字段值 文件唯一码
		if(StringUtils.isBlank(value)) {
			value = "";
		}
		
		//图片属性
		String imgSrc = attrs.get("imgSrc");	
		String imgAlt = attrs.get("imgAlt");	
		
		//获取文件服务器url
		if(StringUtils.isBlank(imgSrc)&&StringUtils.isNotBlank(value)) {
			imgSrc = fileManage.getDownloadURLStr(value);
		}
		
		//使用默认图片回显
		if(StringUtils.isBlank(imgSrc)) {
			imgSrc = "/images/favicon.png";
		}
		try {
			//图片显示
			img.append("<div class=\"layui-upload-list\">");
			img.append("<img class=\"layui-upload-img\" id=\""+name+"_ImgId\" alt=\""+imgAlt+"\" src=\""+imgSrc+"\">");
			img.append("<p id=\""+name+"Text\"></p>");
			img.append("</div>");
			//唯一码
			img.append("<input type=\"hidden\" id=\""+name+"\" name=\""+name+"\" value=\""+value+"\">");
			//上传按钮
			img.append("<button type=\"button\" class=\"layui-btn\" id=\""+name+"_btn\">上传图片</button>");
			
			//js
			img.append("<script type=\"text/javascript\">");
			img.append("var upload = new $Upload(\""+name+"\",\""+name+"_btn\");");
			img.append("upload.setImgId(\""+name+"_ImgId\");");
			img.append("upload.init();");
			img.append("</script>");
			
			this.ctx.byteWriter.writeString(img.toString());
		} catch (Exception e) {
			logger.error(e.getMessage());
		}
	}

}
