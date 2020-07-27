/**  

* <p>Title: UploadFileTag.java</p>  

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
import org.springframework.context.annotation.Scope;
import org.springframework.stereotype.Component;

import com.vingsoft.common.annotation.BeetlTagName;


/**  

* <p>Title: UploadFileTag</p>  

* <p>Description: 文件上传标签</p>  

* @author MrTang

* @date 2018年12月4日  

*/
@Component
@Scope("prototype")
@BeetlTagName("uploadFile")
@SuppressWarnings("unchecked")
public class UploadFileTag extends GeneralVarTagBinding {
	
	private static Logger logger = LoggerFactory.getLogger(UploadFileTag.class);

	/* (non-Javadoc)  
	
	 * <p>Title: render</p>  
	
	 * <p>Description: </p>  
	  
	
	 * @see org.beetl.core.Tag#render()  
	
	 */
	@Override
	public void render() {
		StringBuilder file = new StringBuilder();
		Map<String,String> attrs = (Map<String, String>) args[1];
		String name = attrs.get("name");				//字段名
		String value = attrs.get("value");				//字段值
		if(StringUtils.isBlank(value)) {
			value = "";
		}
		
		String fileName = attrs.get("fileName");			//文件名
		String fileNameValue = attrs.get("fileNameValue");	//文件名字段值
		if(StringUtils.isBlank(fileNameValue)) {
			fileNameValue = "";
		}
		
		
		String required = attrs.get("required");		//必填验证属性
		String verify = "";
		if("true".equals(required)) {
			verify = "lay-verify=\"required\"";
		}
		try {
			//文件名
			file.append("<input type=\"text\" id=\""+fileName+"\" name=\""+fileName+"\" "+verify+" value=\""+fileNameValue+"\" readonly=\"readonly\" \r\n" + 
					"style=\" width: 70%;float: left; \" " + 
					"autocomplete=\"off\" class=\"layui-input\">");
			//唯一码
			file.append("<input type=\"hidden\" id=\""+name+"\" name=\""+name+"\" value=\""+value+"\">");
			//按钮
			file.append("<button type=\"button\" class=\"layui-btn\" title=\"上传文件\" "
					+ "style=\" width: 28%;float: right; \" " 
					+ "id=\""+name+"_btn\"><i class=\"layui-icon\">&#xe67c;</i></button>");
			//js
			file.append("<script type=\"text/javascript\">");
			file.append("var upload = new $Upload(\""+name+"\",\""+name+"_btn\");");
			file.append("upload.setFileNameId(\""+fileName+"\");");
			file.append("upload.init();");
			file.append("</script>");
			
			this.ctx.byteWriter.writeString(file.toString());
		} catch (Exception e) {
			logger.error(e.getMessage());
		}
	}

}
