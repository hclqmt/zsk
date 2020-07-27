package com.vingsoft.common;

import com.alibaba.fastjson.JSON;
import com.alibaba.fastjson.serializer.SerializerFeature;
import com.vingsoft.oa.open.doc.entity.SysUser;
import com.vingsoft.utils.ContextUtils;
import org.apache.shiro.SecurityUtils;
import org.apache.shiro.subject.Subject;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.web.servlet.ModelAndView;

import javax.servlet.http.HttpServletResponse;
import java.util.HashMap;
import java.util.Map;


/**
 * Controller基类
 */
public class BaseController {

    private Logger logger = LoggerFactory.getLogger(getClass());


    /** 返回状态键名 **/
    private static final String KEY_CODE = "code";
    /** 返回数据键名 **/
    private static final String KEY_DATA = "data";
    /** 返回信息键名 **/
    private static final String KEY_MSG = "msg";

    /** 代表成功的值 **/
    private static final String VALUE_SUCCESS = "200";
    /** 代表错误的值 **/
    private static final String VALUE_ERROR = "300";

    /** 系统异常 **/
    private static final String SYSTEM_ERROR = "999";

    protected static ModelAndView mav = new ModelAndView();

    /**
     * 封装并以json返回成功执行的信息
     * @param response
     * @param data
     * @param msg
     */
    protected void respSuccessMsg(HttpServletResponse response, Object data, String msg) {
        Map<String, Object> map = new HashMap<String, Object>();
        try {
            map.put(KEY_DATA, data);
            map.put(KEY_CODE, VALUE_SUCCESS);
            map.put(KEY_MSG, msg);
            //response.setContentType("application/json");
            response.setContentType("text/html");

            //response输出字符串
            ContextUtils.respString(response, JSON.toJSONString(map,SerializerFeature.WriteMapNullValue,SerializerFeature.WriteNullNumberAsZero));
        } catch (Exception e) {
            logger.error("respSuccessMsg 异常",e);
        }
    }


    protected void respSuccessMsg8(HttpServletResponse response, Object data,Object backId,Boolean isNeedBack, String msg,String code) {
        Map<String, Object> map = new HashMap<String, Object>();
        try {
            map.put(KEY_DATA, data);
            map.put(KEY_CODE, code);
            map.put(KEY_MSG, msg);
            map.put("backId",backId);
            map.put("isNeedBack",isNeedBack);
            //response.setContentType("application/json");
            response.setContentType("text/html");

            //response输出字符串
            ContextUtils.respString(response, JSON.toJSONString(map,SerializerFeature.WriteNullStringAsEmpty,SerializerFeature.WriteNullNumberAsZero));
        } catch (Exception e) {
            logger.error("respSuccessMsg 异常",e);
        }
    }

    protected void respSuccessMsg1(HttpServletResponse response, Object data, String msg) {
        Map<String, Object> map = new HashMap<String, Object>();
        try {
            map.put(KEY_DATA, data);
            map.put(KEY_CODE, VALUE_SUCCESS);
            map.put(KEY_MSG, msg);
            //response.setContentType("application/json");
            //response.setContentType("text/html");
            response.setContentType("application/octet-stream");
            //response输出字符串
            ContextUtils.respString(response, JSON.toJSONString(map));
        } catch (Exception e) {
            logger.error("respSuccessMsg 异常",e);
        }
    }

    /**
     * 封装并以json返回错误执行的信息
     * @param response
     * @param msg
     */
    protected void respErrorMsg(HttpServletResponse response, String msg) {
        Map<String, Object> map = new HashMap<String, Object>();
        try {
            map.put(KEY_CODE, VALUE_ERROR);
            map.put(KEY_MSG, msg);
            //	response.setContentType("application/json");
            // 解決 IE9 JSON 出现下载的问题
            response.setContentType("text/html");
            ContextUtils.respString(response, JSON.toJSONString(map));
        } catch (Exception e) {
            logger.error("respErrorMsg 异常",e);
        }
    }
    /**
     * 封装并以json返回错误执行的信息
     * @param response
     * @param msg
     */
    protected void respErrorMsg(HttpServletResponse response,Object data, String msg) {
        Map<String, Object> map = new HashMap<String, Object>();
        try {
            map.put(KEY_DATA,data);
            map.put(KEY_CODE, VALUE_ERROR);

            map.put(KEY_MSG, msg);
            //	response.setContentType("application/json");
            // 解決 IE9 JSON 出现下载的问题
            response.setContentType("text/html");
            ContextUtils.respString(response, JSON.toJSONString(map));
        } catch (Exception e) {
            logger.error("respErrorMsg 异常",e);
        }
    }
    /** 封装并以json返回错误执行的信息
     * @param response
     * @param msg
     */
    public void respErrorMsg(HttpServletResponse response, String code, String msg) {
        Map<String, Object> map = new HashMap<String, Object>();
        try {
            map.put(KEY_CODE, code);
            map.put(KEY_MSG, msg);
            response.setContentType("text/html");
            //response.setContentType("application/json");
            ContextUtils.respString(response, JSON.toJSONString(map));
        } catch (Exception e) {
            logger.error("respErrorMsg 异常",e);
        }
    }
    /** 封装并以json返回错误执行的信息
     * @param response
     * @param msg
     */
    public void respErrorMsg(HttpServletResponse response, String code, String msg,Object data) {
        Map<String, Object> map = new HashMap<String, Object>();
        try {
            map.put(KEY_DATA,data);
            map.put(KEY_CODE, code);
            map.put(KEY_MSG, msg);
            response.setContentType("text/html");
            //response.setContentType("application/json");
            ContextUtils.respString(response, JSON.toJSONString(map));
        } catch (Exception e) {
            logger.error("respErrorMsg 异常",e);
        }
    }
    /**
     * 获取当前登录的user
     */
    public SysUser getLoginUser() {
        Subject subject = SecurityUtils.getSubject();
        if (subject != null) {
            Object object = subject.getPrincipal();
            if (object != null) {
                return (SysUser) object;
            }
        }
        return null;
    }

    /**
     * 获取当前登录的userId
     */
    public Integer getLoginUserId() {
        SysUser loginUser = getLoginUser();
        return loginUser == null ? null : loginUser.getId();
    }

    /**
     * 获取当前登录的username
     */
    public String getLoginUserName() {
        SysUser loginUser = getLoginUser();
        return loginUser == null ? null : loginUser.getUsername();
    }

}
