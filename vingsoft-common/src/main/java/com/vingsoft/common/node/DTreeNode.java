/**  

* <p>Title: DTreeNode.java</p>  

* <p>Description: </p>   

* <p>Company: www.vingsoft.com</p>  

* @author mrtang

* @date Feb 27, 2019  

* @version 1.0  

*/  
package com.vingsoft.common.node;

/**  

* <p>Title: DTreeNode</p>  

* <p>Description: dtree组件，节点</p>  

* @author mrtang

* @date Feb 27, 2019  

*/
public class DTreeNode {
	/**
	 * ID
	 */
	private String id;
	/**
	 * 标题
	 */
	private String title;
	/**
	 * 上级ID
	 */
	private String parentId;
	/**
	 * 图标样式
	 */
	private String iconClass;
	/**
	 * 是否选中 0未选中 1选中
	 */
	private String checkArr;
	public String getId() {
		return id;
	}
	public void setId(String id) {
		this.id = id;
	}
	public String getTitle() {
		return title;
	}
	public void setTitle(String title) {
		this.title = title;
	}
	public String getParentId() {
		return parentId;
	}
	public void setParentId(String parentId) {
		this.parentId = parentId;
	}
	public String getIconClass() {
		return iconClass;
	}
	public void setIconClass(String iconClass) {
		this.iconClass = iconClass;
	}
	public String getCheckArr() {
		return checkArr;
	}
	public void setCheckArr(String checkArr) {
		this.checkArr = checkArr;
	}
}
