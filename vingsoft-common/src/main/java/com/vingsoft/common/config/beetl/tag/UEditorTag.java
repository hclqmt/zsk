/**  
 * <p>Title: UEditorTag.java</p>  
 * <p>Description: </p>   
 * <p>Company: www.vingsoft.com</p> 
 *
 * @author mrtang
 * @date Mar 10, 2019  
 * @version 1.0  
 *
 */  
package com.vingsoft.common.config.beetl.tag;

import java.io.IOException;
import java.util.Map;

import org.beetl.core.GeneralVarTagBinding;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.context.annotation.Scope;
import org.springframework.stereotype.Component;

import com.vingsoft.common.annotation.BeetlTagName;


/**  
 * <p>Title: UEditorTag</p>  
 * <p>Description: 百度编辑器标签</p>  
 *
 * @author mrtang
 * @date Mar 10, 2019  
 *
 */
@Component
@Scope("prototype")
@BeetlTagName("UEditor")
@SuppressWarnings("unchecked")
public class UEditorTag extends GeneralVarTagBinding {

	private static Logger logger = LoggerFactory.getLogger(UEditorTag.class);

	/* (non-Javadoc)  
	 * <p>Title: render</p>  
	 * <p>Description: </p>  
	 *  
	 * @see org.beetl.core.Tag#render()  
	 *
	 */
	@Override
	public void render() {
		StringBuilder result = new StringBuilder();
		
		try {
			Map<String, String> attrs = (Map<String, String>) args[1];
			String name = attrs.get("name"); //字段名称
			String value = attrs.get("value");	//字段值
			
			result.append("<!-- 加载编辑器的容器 -->");
			result.append("<script id=\""+name+"_editor\" type=\"text/plain\">");
			result.append(value);
			result.append("</script>");
			result.append("<textarea style='display: none;' id=\""+name+"\" name=\""+name+"\">"+value+"</textarea>");
			result.append("<!-- 实例化编辑器 -->");
			result.append("<script type=\"text/javascript\">");
			result.append("var ue = UE.getEditor('"+name+"_editor');");
			result.append("//监听编辑器 失去焦点时将文本内容赋值给textarea文本域\n");
			result.append("UE.getEditor('"+name+"_editor').addListener('blur',function(editor){\n");
			result.append("var content = UE.getEditor('"+name+"_editor').getContent();\n");
			result.append("$('#"+name+"').val(content);\n");
			result.append("});\n");
			result.append("</script>");
			
			this.ctx.byteWriter.writeString(result.toString());
		} catch (IOException e) {
			logger.error(e.getMessage());
			e.printStackTrace();
		}
	}
}
