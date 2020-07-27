/**  

* <p>Title: DTreeNode.java</p>  

* <p>Description: </p>    

* <p>Company: www.vingsoft.com</p>  

* @author MrTang

* @date 2019年1月4日  

* @version 1.0  

*/  
package com.vingsoft.common.node.otree;

import java.util.List;


/**  

* <p>Title: DTreeNode</p>  

* <p>Description: </p>  

* @author MrTang

* @date 2019年1月4日  

*/
public class OTreeNode {

	private Status status;
	
	private List<Data> data;

	/**
	 * @return the status
	 */
	public Status getStatus() {
		return status;
	}

	/**
	 * @param status the status to set
	 */
	public void setStatus(Status status) {
		this.status = status;
	}

	/**
	 * @return the data
	 */
	public List<Data> getData() {
		return data;
	}

	/**
	 * @param data the data to set
	 */
	public void setData(List<Data> data) {
		this.data = data;
	}
}
