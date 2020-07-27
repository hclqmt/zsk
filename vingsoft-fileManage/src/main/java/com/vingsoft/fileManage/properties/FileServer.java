/**  
 * All rights Reserved, Designed By www.vingsoft.com
 * @Title:  FileServer.java   
 * @Package com.vingsoft.fileManage.config   
 * @Description:    TODO(用一句话描述该文件做什么)   
 * @author: 安徽胜利科技     
 * @date:   Mar 14, 2019 11:05:13 AM   
 * @version V1.0 
 * @Copyright: 2019 www.vingsoft.com Inc. All rights reserved. 
 * 注意：本内容仅限于安徽胜利科技内部传阅，禁止外泄以及用于其他的商业目
 */
package com.vingsoft.fileManage.properties;

/**   
 * @ClassName:  FileServer   
 * @Description:文件服务器信息
 * @author: mrtang
 * @date:   Mar 14, 2019 11:05:13 AM   
 *     
 * @Copyright: 2019 www.vingsoft.com Inc. All rights reserved. 
 * 注意：本内容仅限于安徽胜利科技内部传阅，禁止外泄以及用于其他的商业目 
 */

public class FileServer {

	private String host = "192.168.0.142";
    private int port = 2002;
    private String username = "base";
    private String password = "ICy5YqxZB1uWSwcVLSNLcA%3D%3D";

	/**  
	 * @Title:  getHost <BR>  
	 * @Description: please write your description <BR>  
	 * @return: String <BR>  
	 */
	public String getHost() {
		return host;
	}
	/**  
	 * @Title:  setHost <BR>  
	 * @Description: please write your description <BR>  
	 * @return: String <BR>  
	 */
	public void setHost(String host) {
		this.host = host;
	}
	/**  
	 * @Title:  getPort <BR>  
	 * @Description: please write your description <BR>  
	 * @return: int <BR>  
	 */
	public int getPort() {
		return port;
	}
	/**  
	 * @Title:  setPort <BR>  
	 * @Description: please write your description <BR>  
	 * @return: int <BR>  
	 */
	public void setPort(int port) {
		this.port = port;
	}
	/**  
	 * @Title:  getUsername <BR>  
	 * @Description: please write your description <BR>  
	 * @return: String <BR>  
	 */
	public String getUsername() {
		return username;
	}
	/**  
	 * @Title:  setUsername <BR>  
	 * @Description: please write your description <BR>  
	 * @return: String <BR>  
	 */
	public void setUsername(String username) {
		this.username = username;
	}
	/**  
	 * @Title:  getPassword <BR>  
	 * @Description: please write your description <BR>  
	 * @return: String <BR>  
	 */
	public String getPassword() {
		return password;
	}
	/**  
	 * @Title:  setPassword <BR>  
	 * @Description: please write your description <BR>  
	 * @return: String <BR>  
	 */
	public void setPassword(String password) {
		this.password = password;
	}
    
    
}
