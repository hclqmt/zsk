/**  

* <p>Title: Uuid2AutoGen.java</p>  

* <p>Description: </p>    

* <p>Company: www.vingsoft.com</p>  

* @author MrTang

* @date 2018年12月27日  

* @version 1.0  

*/  
package com.vingsoft.common.config.idAutoGens;

import org.beetl.sql.core.IDAutoGen;

import cn.hutool.core.lang.UUID;

/**  

* <p>Title: Uuid2AutoGen</p>  

* <p>Description: 自定义id生成策略</p>  

* @author MrTang

* @date 2018年12月27日  

*/
public class Uuid2AutoGen implements IDAutoGen<String> {

	/* (non-Javadoc)  
	
	 * <p>Title: nextID</p>  
	
	 * <p>Description: </p>  
	
	 * @param params
	 * @return  
	
	 * @see org.beetl.sql.core.IDAutoGen#nextID(java.lang.String)  
	
	 */
	@Override
	public String nextID(String params) {
		return getUUID();
	}
	
	/**
	 * 自动生成32位的UUid，对应数据库的主键id进行插入用。
	 * @return
	 */
	public synchronized static String getUUID() {
		return UUID.randomUUID().toString().replace("-", "");
	}
}
