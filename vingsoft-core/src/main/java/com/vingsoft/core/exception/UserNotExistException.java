package com.vingsoft.core.exception;

/**
 * 

* <p>Title: UserNotExistException</p>  

* <p>Description: 自定义用户不存在异常</p>  

* @author MrTang

* @date 2018年11月28日
 */

public class UserNotExistException extends RuntimeException {

	/**
	 * 
	 */
	private static final long serialVersionUID = 1L;
	
	private String id;

	public UserNotExistException(String id) {
		super("user not exist");
		this.id = id;
	}

	public String getId() {
		return id;
	}

	public void setId(String id) {
		this.id = id;
	}
	
	
}
