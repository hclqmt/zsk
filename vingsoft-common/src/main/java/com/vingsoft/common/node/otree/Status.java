/**  

* <p>Title: Status.java</p>  

* <p>Description: </p>    

* <p>Company: www.vingsoft.com</p>  

* @author MrTang

* @date 2019年1月4日  

* @version 1.0  

*/  
package com.vingsoft.common.node.otree;

/**  

* <p>Title: Status</p>  

* <p>Description: 封装数据状态</p>  

* @author MrTang

* @date 2019年1月4日  

*/
public class Status {
	private Integer code = 200;
	private String message = "操作成功";
	/**
	 * @return the code
	 */
	public Integer getCode() {
		return code;
	}
	/**
	 * @param code the code to set
	 */
	public void setCode(Integer code) {
		this.code = code;
	}
	/**
	 * @return the message
	 */
	public String getMessage() {
		return message;
	}
	/**
	 * @param message the message to set
	 */
	public void setMessage(String message) {
		this.message = message;
	}
}
