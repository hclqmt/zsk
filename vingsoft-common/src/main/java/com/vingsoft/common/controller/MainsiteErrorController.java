package com.vingsoft.common.controller;

import javax.servlet.http.HttpServletRequest;

import org.springframework.boot.web.servlet.error.ErrorController;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.servlet.ModelAndView;

/**
 * 

* <p>Title: MainsiteErrorController</p>  

* <p>Description: 错误页处理</p>  

* @author MrTang

* @date 2018年11月23日
 */

@RestController
public class MainsiteErrorController implements ErrorController {
	
	@GetMapping("/error")
	public ModelAndView handleError (HttpServletRequest request) {
		//获取statusCode:401,404,500
        Integer statusCode = (Integer) request.getAttribute("javax.servlet.error.status_code");
        ModelAndView mav = new ModelAndView("/error/"+statusCode);
		return mav;
	}

	@Override
	public String getErrorPath() {
		// TODO Auto-generated method stub
		return "/error";
	}

}
