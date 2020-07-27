package com.vingsoft.oa.common.base;

import java.io.IOException;
import java.io.UnsupportedEncodingException;

import javax.servlet.http.Cookie;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import javax.servlet.http.HttpSession;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.context.annotation.Scope;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Component;
import org.springframework.validation.BindingResult;
import org.springframework.validation.ObjectError;
import org.springframework.web.context.WebApplicationContext;
import org.springframework.web.servlet.ModelAndView;

import com.fasterxml.jackson.databind.ObjectMapper;
import com.vingsoft.core.response.SimpleResponse;
import com.vingsoft.core.support.HttpKit;
import com.vingsoft.fileManage.utils.FileUtil;


@Component
@Scope(scopeName = WebApplicationContext.SCOPE_REQUEST)
public class BaseController {
	
	protected static Logger logger = LoggerFactory.getLogger(BaseController.class);

    protected static String SUCCESS = "SUCCESS";
    protected static String ERROR = "ERROR";

    protected static String REDIRECT = "redirect:";
    protected static String FORWARD = "forward:";
    
    protected static ObjectMapper objectMapper = new ObjectMapper();

    protected static SimpleResponse SIMPLE_RESPONSE = new SimpleResponse();
    
    protected static ModelAndView mav = new ModelAndView();
    

    protected HttpServletRequest getHttpServletRequest() {
        return HttpKit.getRequest();
    }

    protected HttpServletResponse getHttpServletResponse() {
        return HttpKit.getResponse();
    }

    protected HttpSession getSession() {
        return HttpKit.getRequest().getSession();
    }

    protected String getPara(String name) {
        return HttpKit.getRequest().getParameter(name);
    }

    protected void setAttr(String name, Object value) {
        HttpKit.getRequest().setAttribute(name, value);
    }
    
    /**
     * 
    
     * <p>Title: returnJson</p>  
    
     * <p>Description: 将对象转为json返回给前端</p>  
    
     * @param json
     * @throws IOException
     */
    protected void returnJson(Object json) {
    	try {
			this.getHttpServletResponse().setContentType("application/json;charset=UTF-8");
			this.getHttpServletResponse().getWriter().write(objectMapper.writeValueAsString(json));
		} catch (Exception e) {
			logger.error(e.getMessage());
		}
    }
    
    /**
     * 
    
     * <p>Title: validErrors</p>  
    
     * <p>Description: 错误验证</p>  
    
     * @param errors
     * @return
     */
    protected SimpleResponse validErrors(BindingResult errors) {
		if(errors.hasErrors()) {
			//may not be empty
			for (ObjectError error : errors.getAllErrors()) {
				return new SimpleResponse(error.getDefaultMessage());
			}
		}
		return null;
    }

    /**
     * 删除cookie
     */
    protected void deleteCookieByName(String cookieName) {
        Cookie[] cookies = this.getHttpServletRequest().getCookies();
        for (Cookie cookie : cookies) {
            if (cookie.getName().equals(cookieName)) {
                Cookie temp = new Cookie(cookie.getName(), "");
                temp.setMaxAge(0);
                this.getHttpServletResponse().addCookie(temp);
            }
        }
    }

    /**
     * 
     * @Title: renderFile   
     * @Description: 返回前台文件流  
     * @param: @param fileName
     * @param: @param filePath
     * @param: @return      
     * @return: ResponseEntity<byte[]>      
     * @throws
     */
    protected ResponseEntity<byte[]> renderFile(String fileName, String filePath) {
        byte[] bytes = FileUtil.toByteArray(filePath);
        return renderFile(fileName, bytes);
    }

    /**
     * 
     * @Title: renderFile   
     * @Description: 返回前台文件流   
     * @param: @param fileName
     * @param: @param fileBytes
     * @param: @return      
     * @return: ResponseEntity<byte[]>      
     * @throws
     */
    protected ResponseEntity<byte[]> renderFile(String fileName, byte[] fileBytes) {
        String dfileName = null;
        try {
            dfileName = new String(fileName.getBytes("gb2312"), "iso8859-1");
        } catch (UnsupportedEncodingException e) {
            e.printStackTrace();
        }
        HttpHeaders headers = new HttpHeaders();
        headers.setContentType(MediaType.APPLICATION_OCTET_STREAM);
        headers.setContentDispositionFormData("attachment", dfileName);
        return new ResponseEntity<byte[]>(fileBytes, headers, HttpStatus.CREATED);
    }
}
