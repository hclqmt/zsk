package com.vingsoft.common.controller;

import java.util.HashMap;
import java.util.Map;

import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.ControllerAdvice;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.bind.annotation.ResponseStatus;

import com.vingsoft.core.exception.UserNotExistException;


/**
 * 

* <p>Title: ControllerExceptionHandler</p>  

* <p>Description: 处理控制器异常</p>  

* @author MrTang

* @date 2018年11月28日
 */

@ControllerAdvice
public class ControllerExceptionHandler {

	/**
	 * 
	
	 * <p>Title: handlerUserNotExistException</p>  
	
	 * <p>Description: 处理控制器中抛出的UserNotExistException异常</p>  
	
	 * @param ex
	 * @return
	 */
	@ExceptionHandler(UserNotExistException.class)
	@ResponseBody
	@ResponseStatus(HttpStatus.INTERNAL_SERVER_ERROR)
	public Map<String, Object> handlerUserNotExistException(UserNotExistException ex){
		Map<String,Object> message = new HashMap<>();
		message.put("id", ex.getId());
		message.put("msg", ex.getMessage());
		return message;
	}
}
