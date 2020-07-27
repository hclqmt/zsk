package com.vingsoft.oa.common.controller;

import com.alibaba.fastjson.JSONObject;
import com.vingsoft.common.BaseController;
import com.vingsoft.common.JsonResult;
import com.vingsoft.oa.open.doc.entity.SysUser;
import com.vingsoft.oa.open.doc.service.SysUserService;
import com.vingsoft.shiro.EndecryptUtil;
import com.vingsoft.utils.ObjectKit;
import com.vingsoft.utils.StringUtil;
import com.wf.captcha.utils.CaptchaUtil;
import org.apache.shiro.SecurityUtils;
import org.apache.shiro.authc.*;
import org.apache.shiro.crypto.hash.SimpleHash;
import org.apache.shiro.util.ByteSource;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.servlet.ModelAndView;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.io.IOException;
import java.util.Date;

@Controller
public class LoginController extends BaseController {

    @Autowired
    private SysUserService sysUserService;

    /**
     * 主页
     */
    @RequestMapping({"/", "/index"})
    public ModelAndView index(Model model) {
        if (getLoginUser() == null) {
            mav.setViewName("redirect:login");
        }else{
            mav.setViewName("redirect:openIndex");
        }
        model.addAttribute("loginUser", getLoginUser());  // 登录用户信息

        //新订单

        return mav;
    }

    /**
     * 登录页
     */
    @GetMapping("/login")
    public String login(@ModelAttribute(value = "requestURI") String requestURI, HttpServletRequest request, Model model) {
        String username = request.getParameter("username");
        String password = request.getParameter("password");
        model.addAttribute("username",username);
        model.addAttribute("password",password);
        model.addAttribute("requestURI",requestURI);
        return "login";
    }

    /**
     * 登录页
     */
    @GetMapping("/register")
    public String register() {
        return "register";
    }

    /**
     * 图形验证码，用assets开头可以排除shiro拦截
     */
    @RequestMapping("/assets/captcha")
    public void captcha(HttpServletRequest request, HttpServletResponse response) {
        try {
            CaptchaUtil.out(4, request, response);
        } catch (IOException e) {
            e.printStackTrace();
        }
    }
    /**
     * 登录
     */
    @ResponseBody
    @PostMapping("/loginInfo")
    public JsonResult doLogin(String username, String password, HttpServletRequest request) {

        if (StringUtil.isBlank(username, password)) {
            return JsonResult.error("账号或密码不能为空");
        }
        try {
            UsernamePasswordToken token = new UsernamePasswordToken(username, password);
            SecurityUtils.getSubject().login(token);
            return JsonResult.ok("登录成功");
        } catch (IncorrectCredentialsException ice) {
            return JsonResult.error("用户名/密码错误");
        } catch (UnknownAccountException uae) {
            return JsonResult.error("账号不存在");
        } catch (LockedAccountException e) {
            return JsonResult.error("账号被锁定");
        } catch (ExcessiveAttemptsException eae) {
            return JsonResult.error("操作频繁，请稍后再试");
        }
    }

    @ResponseBody
    @PostMapping("/redisterInfo")
    public JsonResult doRegister(String username, String password,String confirmPassword, HttpServletRequest request) {
        SysUser sysUser = new SysUser();
        if (StringUtil.isBlank(username, password)) {
            return JsonResult.error("用户或密码不能为空");
        }
        if (password.length()<6){
            return JsonResult.error("密码不能少于6位");
        }
        if(!password.equals(confirmPassword)){
            return JsonResult.error("两次密码不一致");
        }
        SysUser userByUsername = sysUserService.findUserByUsername(username);
        if (ObjectKit.isNotNull(userByUsername)){
            return JsonResult.error("该用户名已被使用");
        }
        try {
            sysUser.setPassword(new SimpleHash("MD5", password, ByteSource.Util.bytes(EndecryptUtil.DEFAULT_SALT), 3).toString());
            sysUser.setUsername(username);
            sysUser.setNickname(username);
            sysUser.setStatus(1);//状态
            sysUser.setCreateDate(new Date());
            sysUserService.save(sysUser);
            JSONObject jsonObject =new JSONObject();
            jsonObject.put("username",username);
            jsonObject.put("password",password);
            return JsonResult.ok(200,jsonObject.toString());
        }catch (Exception e) {
            return JsonResult.error("操作频繁，请稍后再试");
        }
    }
}
