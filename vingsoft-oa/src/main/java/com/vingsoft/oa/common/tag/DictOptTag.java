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
import com.vingsoft.oa.open.doc.entity.SysDict;
import com.vingsoft.oa.open.doc.service.SysDictService;
import org.beetl.core.GeneralVarTagBinding;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Scope;
import org.springframework.stereotype.Component;
import org.springframework.util.StringUtils;

import java.io.IOException;
import java.util.List;
import java.util.Map;

/**  

* <p>Title: DictSelTag</p>  

* <p>Description: 字典选择项标签</p>  

* @author MrTang

* @date 2018年11月29日  

*/
@Component
@Scope("prototype")
@BeetlTagName("dictOpt")
@SuppressWarnings("unchecked")
public class DictOptTag extends GeneralVarTagBinding {
	
	private static Logger logger = LoggerFactory.getLogger(DictOptTag.class);
	
	@Autowired
	private SysDictService dictService;
	
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
		String filter = attrs.get("filter");	
		String disabled = attrs.get("disabled");	//全部禁用，针对下拉框查看頁面使用
		try {
			if("radio".equals(elementType)) {
				result = packRadioElement(typeCode, name, dictVal, disableVal, required);
			}else if("checkbox".equals(elementType)) {
				result = packCheckboxElement(typeCode, name, dictVal, disableVal,required);
			}else {
				result = packSelectElement(typeCode, name, dictVal, disableVal, required,filter,disabled);
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
	private String packCheckboxElement(String typeCode, String name, String dictVal, String disableVal,String required) {
		String lay_disabled="";
		String verify = "";
		if("disabled".equals(disableVal)){
			lay_disabled=" disabled=\"disabled\"";
		}
		if("true".equals(required)) {
			verify = "lay-verify=\"otherReq\"";
		}
		StringBuilder checkbox = new StringBuilder();
		//遍历字典值
		List<SysDict> dictList = dictService.findAllByType(typeCode);
		if(dictList!=null&&!dictList.isEmpty()) {
			for (SysDict dict : dictList) {
				if(dict.getValue().equals(dictVal)) {
					checkbox.append("<input type=\"checkbox\"  name=\""+name+"\" value=\""+dict.getValue()+"\" title=\""+dict.getName()+"\" checked "+lay_disabled+">");
				} else if((","+disableVal+",").indexOf(","+dict.getValue()+",")>=0) {
					checkbox.append("<input type=\"checkbox\" name=\""+name+"\" value=\""+dict.getValue()+"\" title=\""+dict.getName()+"\" disabled>");
				} else {
					checkbox.append("<input type=\"checkbox\" name=\""+name+"\" value=\""+dict.getValue()+"\" title=\""+dict.getName()+"\""+lay_disabled+verify+">");
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
	private String packRadioElement(String typeCode, String name, String dictVal, String disableVal,String required) {
		String verify="";
		String lay_disabled="";
		if("true".equals(required)) {
			verify = "lay-verify=\"otherReq\"";
		}
		if("disabled".equals(disableVal)){
			lay_disabled=" disabled=\"disabled\"";
		}
		
		StringBuilder radio = new StringBuilder();
		//遍历字典值
		List<SysDict> dictList = dictService.findAllByType(typeCode);
		if(dictList!=null&&!dictList.isEmpty()) {
			for (SysDict dict : dictList) {
				if(dict.getValue().equals(dictVal)) {
					radio.append("<input type=\"radio\"  lay-filter=\""+name+"_radio\" name=\""+name+"\" value=\""+dict.getValue()+"\" title=\""+dict.getName()+"\" checked "+lay_disabled+">");
				} else if((","+disableVal+",").indexOf(","+dict.getValue()+",")>=0) {
					radio.append("<input type=\"radio\"  lay-filter=\""+name+"_radio\" name=\""+name+"\" value=\""+dict.getValue()+"\" title=\""+dict.getName()+"\" disabled>");
				}else {
					radio.append("<input type=\"radio\"  lay-filter=\""+name+"_radio\" name=\""+name+"\" value=\""+dict.getValue()+"\" title=\""+dict.getName()+"\" "+lay_disabled+verify+" >");
				}
				radio.append("<div class=\"layui-unselect layui-form-radio layui-form-radioed\"><i class=\"layui-anim layui-icon\"></i><div>"+dict.getName()+"</div></div>");
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
	private String packSelectElement(String typeCode, String name, String dictVal, String disableVal, String required,String filter,String disabled) {
		StringBuilder sel = new StringBuilder();
		String verify = null;
		String layfilter = null;
		if("true".equals(required)) {
			verify = "lay-verify=\"required\"";
		}
		if(!StringUtils.isEmpty(filter)) {
			layfilter = "lay-filter=\""+filter+"\"";
		}
		if(!StringUtils.isEmpty(disabled)) {
			disabled = "disabled=\""+disabled+"\"";
		}
		sel.append("<select name=\""+name+"\" id=\""+name+"\" "+disabled+" "+verify+" "+layfilter+" lay-search>");
		sel.append("<option value=\"\">请选择</option>");
		
		//遍历字典值
		List<SysDict> dictList = dictService.findAllByType(typeCode);
		if(dictList!=null&&!dictList.isEmpty()) {
			for (SysDict dict : dictList) {
				if(dict.getValue().equals(dictVal)) {
					sel.append("<option selected value=\""+dict.getValue()+"\">"+dict.getName()+"</option>");
				} else if((","+disableVal+",").indexOf(","+dict.getValue()+",")>=0) {
					sel.append("<option disabled value=\""+dict.getValue()+"\">"+dict.getName()+"</option>");
				} else {
					sel.append("<option value=\""+dict.getValue()+"\">"+dict.getName()+"</option>");						
				}
			}
		}
		sel.append("</select>");
		return sel.toString();
	}
	
	
}