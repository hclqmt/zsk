/**  

* <p>Title: DictSelTag.java</p>  

* <p>Description: </p>    

* <p>Company: www.vingsoft.com</p>  

* @author MrTang

* @date 2018年11月29日  

* @version 1.0  

*/  
package com.vingsoft.oa.common.tag;

import com.vingsoft.common.annotation.BeetlTagName;
import com.vingsoft.oa.open.doc.entity.beetsqlmuban.Dictionaryinfo;
import com.vingsoft.oa.open.doc.service.beetsqlmuban.DictionaryinfoService;
import org.beetl.core.GeneralVarTagBinding;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Scope;
import org.springframework.stereotype.Component;

import java.io.IOException;
import java.util.List;
import java.util.Map;


/**  

* @author 
* @date 2020.03.09

*/
@Component
@Scope("prototype")
@BeetlTagName("dictionaryOpt")
@SuppressWarnings("unchecked")
public class DictionaryinfoOptTag extends GeneralVarTagBinding {
	
	private static Logger logger = LoggerFactory.getLogger(DictionaryinfoOptTag.class);
	
	@Autowired
	private DictionaryinfoService dictService;
	
	@Override
	public void render() {
		String result = null;
		
		Map<String,String> attrs = (Map<String, String>) args[1];
		String typeCode = attrs.get("typeCode");	//字典类型
		String name = attrs.get("name");			//选择元素name
		Object obj = attrs.get("dictVal");			//选中的值
		String dictVal = obj+"";					//选中的值
		String elementType = attrs.get("elementType");	//元素类型：select；radio；checkbox
		String disableVal = attrs.get("disableVal");	//禁用的值
		String required = attrs.get("required");		//下拉框必填验证属性
		try {
			if("radio".equals(elementType)) {
				result = packRadioElement(typeCode, name, dictVal, disableVal);
			}else if("checkbox".equals(elementType)) {
				result = packCheckboxElement(typeCode, name, dictVal, disableVal);
			}else {
				result = packSelectElement(typeCode, name, dictVal, disableVal, required);
			}
			this.ctx.byteWriter.writeString(result);
		} catch (IOException e) {
			logger.error(e.getMessage());
		}
	}
	
	/**  
	
	 * <p>Title: packCheckboxElement</p>  
	
	 * <p>Description: 封装Checkbox</p>  
	
	 * @param typeCode
	 * @param name
	 * @param dictVal  
	 * @param disableVal
	 * @param required
	
	 */  
	private String packCheckboxElement(String typeCode, String name, String dictVal, String disableVal) {
		StringBuilder checkbox = new StringBuilder();
		//遍历字典值
		List<Dictionaryinfo> dictList = dictService.findAllByType(typeCode);
		if(dictList!=null&&!dictList.isEmpty()) {
			for (Dictionaryinfo dict : dictList) {
				if(dict.getDictCode().equals(dictVal)) {
					checkbox.append("<input type=\"checkbox\" name=\""+name+"\" value=\""+dict.getDictCode()+"\" title=\""+dict.getDictName()+"\" checked>");
				} else if(dict.getDictCode().equals(disableVal)){
					checkbox.append("<input type=\"checkbox\" name=\""+name+"\" value=\""+dict.getDictCode()+"\" title=\""+dict.getDictName()+"\" disabled>");
				} else {
					checkbox.append("<input type=\"checkbox\" name=\""+name+"\" value=\""+dict.getDictCode()+"\" title=\""+dict.getDictName()+"\">");
				}
			}
		}
		return checkbox.toString();
	}
	
	
	/**  
	
	 * <p>Title: packRadioElement</p>  
	
	 * <p>Description: 封装radio</p>  
	
	 * @param typeCode
	 * @param name
	 * @param dictVal  
	 * @param disableVal
	 * @param required
	
	 */  
	private String packRadioElement(String typeCode, String name, String dictVal, String disableVal) {
		StringBuilder radio = new StringBuilder();
		//遍历字典值
		List<Dictionaryinfo> dictList = dictService.findAllByType(typeCode);
		if(dictList!=null&&!dictList.isEmpty()) {
			for (Dictionaryinfo dict : dictList) {
				if(dict.getDictCode().equals(dictVal)) {
					radio.append("<input type=\"radio\" name=\""+name+"\" value=\""+dict.getDictCode()+"\" title=\""+dict.getDictName()+"\" checked>");
				} else if(dict.getDictCode().equals(disableVal)){
					radio.append("<input type=\"radio\" name=\""+name+"\" value=\""+dict.getDictCode()+"\" title=\""+dict.getDictName()+"\" disabled>");
				} else {
					radio.append("<input type=\"radio\" name=\""+name+"\" value=\""+dict.getDictCode()+"\" title=\""+dict.getDictName()+"\" >");
				}
				radio.append("<div class=\"layui-unselect layui-form-radio layui-form-radioed\"><i class=\"layui-anim layui-icon\"></i><div>"+dict.getDictName()+"</div></div>");
			}
		}
		return radio.toString();
	}

	/**  
	
	 * <p>Title: packSelectElement</p>  
	
	 * <p>Description: 封装select</p>  
	
	 * @param typeCode
	 * @param name
	 * @param dictVal  
	 * @param disableVal
	 * @param required
	
	 */  
	private String packSelectElement(String typeCode, String name, String dictVal, String disableVal, String required) {
		StringBuilder sel = new StringBuilder();
		String verify = null;
		if("true".equals(required)) {
			verify = "lay-verify=\"required\"";
		}
		sel.append("<select name=\""+name+"\" id=\""+name+"\" "+verify+" lay-search>");
		sel.append("<option value=\"\">请选择</option>");
		
		//遍历字典值
		List<Dictionaryinfo> dictList = dictService.findAllByType(typeCode);
		if(dictList!=null&&!dictList.isEmpty()) {
			for (Dictionaryinfo dict : dictList) {
				if(dict.getDictCode().equals(dictVal)) {
					sel.append("<option selected value=\""+dict.getDictCode()+"\">"+dict.getDictName()+"</option>");
				} else if(dict.getDictCode().equals(disableVal)) {
					sel.append("<option disabled value=\""+dict.getDictCode()+"\">"+dict.getDictName()+"</option>");
				} else {
					sel.append("<option value=\""+dict.getDictCode()+"\">"+dict.getDictName()+"</option>");						
				}
			}
		}
		sel.append("</select>");
		return sel.toString();
	}
	
	
}