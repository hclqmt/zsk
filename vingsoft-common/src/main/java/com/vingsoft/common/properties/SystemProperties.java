/**  
 * <p>Title: SystemProperties.java</p>  
 * <p>Description: </p>   
 * <p>Company: www.vingsoft.com</p> 
 *
 * @author mrtang
 * @date Mar 6, 2019  
 * @version 1.0  
 *
 */  
package com.vingsoft.common.properties;

import lombok.Data;
import org.springframework.boot.context.properties.ConfigurationProperties;
import org.springframework.stereotype.Component;

/**  
 * <p>Title: SystemProperties</p>  
 * <p>Description: 系统配置</p>  
 *
 * @author mrtang
 * @date Mar 6, 2019  
 *
 */
@Component
@ConfigurationProperties(prefix = "system")
@Data
public class SystemProperties {

	/**
	 * 系统id
	 */
	private String id;
	/**
	 * 系统名称
	 */
	private String name;

	private String url;
	
}
