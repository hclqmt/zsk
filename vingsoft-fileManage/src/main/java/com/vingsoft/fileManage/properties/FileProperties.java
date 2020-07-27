/**  
 * All rights Reserved, Designed By www.vingsoft.com
 * @Title:  File.java   
 * @Package com.vingsoft.fileManage.config   
 * @Description:    TODO(用一句话描述该文件做什么)   
 * @author: 安徽胜利科技     
 * @date:   Mar 14, 2019 11:04:03 AM   
 * @version V1.0 
 * @Copyright: 2019 www.vingsoft.com Inc. All rights reserved. 
 * 注意：本内容仅限于安徽胜利科技内部传阅，禁止外泄以及用于其他的商业目
 */
package com.vingsoft.fileManage.properties;

import org.springframework.boot.context.properties.ConfigurationProperties;
import org.springframework.stereotype.Component;

/**   
 * @ClassName:  File   
 * @Description:TODO(这里用一句话描述这个类的作用)   
 * @author: mrtang
 * @date:   Mar 14, 2019 11:04:03 AM   
 *     
 * @Copyright: 2019 www.vingsoft.com Inc. All rights reserved. 
 * 注意：本内容仅限于安徽胜利科技内部传阅，禁止外泄以及用于其他的商业目 
 */
@Component
@ConfigurationProperties(prefix = "file")
public class FileProperties {

	private FileServer server = new FileServer();

	/**  
	 * @Title:  getServer <BR>  
	 * @Description: please write your description <BR>  
	 * @return: FileServer <BR>  
	 */
	public FileServer getServer() {
		return server;
	}

	/**  
	 * @Title:  setServer <BR>  
	 * @Description: please write your description <BR>  
	 * @return: FileServer <BR>  
	 */
	public void setServer(FileServer server) {
		this.server = server;
	}
	
	
}
