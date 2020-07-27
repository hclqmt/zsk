/**  

* <p>Title: MenuNode.java</p>  

* <p>Description: </p>   

* <p>Company: www.vingsoft.com</p>  

* @author mrtang

* @date Feb 28, 2019  

* @version 1.0  

*/  
package com.vingsoft.common.node;

import java.util.List;

/**  

* <p>Title: MenuNode</p>  

* <p>Description: 菜单节点</p>  

* @author mrtang

* @date Feb 28, 2019  

*/
public class MenuNode {
	
	/**
	 * 菜单id
	 */
	private Integer id;
	/**
	 * 菜单名称
	 */
	private String name;
	/**
	 * 菜单编码
	 */
	private String code;
	/**
	 * 菜单图标
	 */
	private String icon;
	/**
	 * 菜单url地址
	 */
	private String url;
	/**
	 * 菜单类型：0系统；1一级菜单；2二级菜单；3三级菜单；4按钮；5其他
	 */
	private Integer type;
	/**
	 * 子级菜单
	 */
	private List<MenuNode> childs;
	
	
	public Integer getId() {
		return id;
	}
	public void setId(Integer id) {
		this.id = id;
	}
	public String getName() {
		return name;
	}
	public void setName(String name) {
		this.name = name;
	}
	public String getCode() {
		return code;
	}
	public void setCode(String code) {
		this.code = code;
	}
	public String getIcon() {
		return icon;
	}
	public void setIcon(String icon) {
		this.icon = icon;
	}
	public String getUrl() {
		return url;
	}
	public void setUrl(String url) {
		this.url = url;
	}
	public Integer getType() {
		return type;
	}
	public void setType(Integer type) {
		this.type = type;
	}
	public List<MenuNode> getChilds() {
		return childs;
	}
	public void setChilds(List<MenuNode> childs) {
		this.childs = childs;
	}
}
