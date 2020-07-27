
package com.vingsoft.oa.open.doc.dao;


import com.vingsoft.oa.open.doc.entity.SysUser;
import org.beetl.sql.core.annotatoin.Param;
import org.beetl.sql.core.annotatoin.SqlResource;
import org.beetl.sql.core.mapper.BaseMapper;

import java.util.List;
import java.util.Map;


@SqlResource("doc.sysUser")
public interface SysUserDao extends BaseMapper<SysUser> {

	
	
	/**
	 * 
	
	 * <p>Title: findOneByUserName</p>  
	
	 * <p>Description: 根据用户名查询单个用户</p>  
	
	 * @param username
	 * @return
	 */
	SysUser findOneByUserName(@Param("username") String username);
	
	/**
	 * 
	
	 * <p>Title: findOneByTelephone</p>  
	
	 * <p>Description: 根据手机号码查询单个用户</p>  
	
	 * @param iphone
	 * @return
	 */
	SysUser findOneByTelephone(@Param("iphone") String iphone);

	List<Map<String,String>> findDocCount(@Param("id") Integer id);

	Integer findMyInfoCount(@Param("receiverId") Integer receiverId);

}
