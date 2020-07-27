/**  

* <p>Title: LoginUser.java</p>  

* <p>Description: </p>    

* <p>Company: www.vingsoft.com</p>  

* @author MrTang

* @date 2018年11月27日  

* @version 1.0  

*/  
package com.vingsoft.oa.common;


import com.vingsoft.oa.open.doc.entity.SysUser;
import org.apache.shiro.SecurityUtils;
import org.apache.shiro.subject.Subject;


/**  

* <p>Title: LoginUser</p>  

* <p>Description: 获取当前登录用户</p>  

* @author MrTang

* @date 2018年11月27日  

*/
public class LoginUser {
	
	//获取当前用户实例
	public static SysUser getInstance() {
		Subject subject = SecurityUtils.getSubject();
		if (subject != null) {
			Object object = subject.getPrincipal();
			if (object != null) {
				return (SysUser) object;
			}
		}
		return null;
	}
}
