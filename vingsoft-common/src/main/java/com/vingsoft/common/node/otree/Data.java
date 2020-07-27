/**  

* <p>Title: Data.java</p>  

* <p>Description: </p>    

* <p>Company: www.vingsoft.com</p>  

* @author MrTang

* @date 2019年1月4日  

* @version 1.0  

*/  
package com.vingsoft.common.node.otree;

/**  

* <p>Title: Data</p>  

* <p>Description: 封装数据列表</p>  

* @author MrTang

* @date 2019年1月4日  

*/
public class Data {
	
	/**  
	
	* <p>Title: </p>  
	
	* <p>Description: </p>  
	  
	
	*/
	public Data() {
		// TODO Auto-generated constructor stub
	}
	
	public Data(String id,String title,String parentId) {
		this.id = id;
		this.title = title;
		this.parentId = parentId;
	}
	
	/**
	 * id
	 */
	private String id;
	/**
	 * 上级id
	 */
	private String parentId;
	/**
	 * 名称
	 */
	private String title;
	/**
	 * 0 未选 1已选 2半选
	 */
	private String checkArr = "0";
	/**
	 * @return the id
	 */
	public String getId() {
		return id;
	}
	/**
	 * @param id the id to set
	 */
	public void setId(String id) {
		this.id = id;
	}
	/**
	 * @return the parentId
	 */
	public String getParentId() {
		return parentId;
	}
	/**
	 * @param parentId the parentId to set
	 */
	public void setParentId(String parentId) {
		this.parentId = parentId;
	}
	/**
	 * @return the title
	 */
	public String getTitle() {
		return title;
	}
	/**
	 * @param title the title to set
	 */
	public void setTitle(String title) {
		this.title = title;
	}

	/**
	 * @return the checkArr
	 */
	public String getCheckArr() {
		return checkArr;
	}

	/**
	 * @param checkArr the checkArr to set
	 */
	public void setCheckArr(String checkArr) {
		this.checkArr = checkArr;
	}
}
