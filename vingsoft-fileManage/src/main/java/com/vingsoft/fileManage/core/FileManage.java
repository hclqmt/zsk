/**  

* <p>Title: FileManage.java</p>  

* <p>Description: </p>    

* <p>Company: www.vingsoft.com</p>  

* @author MrTang

* @date 2018年11月30日  

* @version 1.0  

*/  
package com.vingsoft.fileManage.core;


import org.apache.log4j.Logger;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;

import com.vingsoft.fileManage.properties.FileProperties;
import com.vingsoft.fileManager.client.ClientResponse;
import com.vingsoft.fileManager.client.FileInfo;
import com.vingsoft.fileManager.client.FileManageRequestProxy;
import com.vingsoft.fileManager.client.VicHttpClient;

/**  

* <p>Title: FileManage</p>  

* <p>Description: 文件管理</p>  

* @author MrTang

* @date 2018年11月30日  

*/
@Component
public class FileManage {

	private static Logger log = Logger.getLogger(FileManage.class);
	
	@Autowired
	private FileProperties fileProperties;
	
	
	/**
	 * 
	
	 * <p>Title: getFileManageRequestProxy</p>  
	
	 * <p>Description: 获取文件服务器请求代理对象</p>  
	
	 * @return
	 */
	public FileManageRequestProxy getFileManageRequestProxy() {
		FileManageRequestProxy fileManageRequestProxy = 
				new FileManageRequestProxy(fileProperties.getServer().getHost(),
											fileProperties.getServer().getPort(),
											fileProperties.getServer().getUsername(),
											fileProperties.getServer().getPassword());
		return fileManageRequestProxy;
	}
	
	/**
	 * 
	
	 * <p>Title: deleteFile</p>  
	
	 * <p>Description: 刪除文件服务器附件</p>  
	
	 * @param uniqueCode
	 */
	public void deleteFile(String uniqueCode) {
		getFileManageRequestProxy().deleteFile(uniqueCode);
	}
	
	/**
	 * 上传文件到文件服务器
	 * @param fileInfo 上传的文件信息
	 * @return	uniqueCode文件服务器唯一编码
	 */
	public String uploadFileToFileManage(FileInfo fileInfo){
		String uniqueCode = null;
		ClientResponse client = null;
		try {
			log.info("文件呢路径："+fileInfo.getFileName());
			if(fileInfo.getFileName().indexOf("//")>0 || fileInfo.getFileName().indexOf(":")>0) {
				client=getFileManageRequestProxy().sendFile(fileInfo.getFileName());
			}else {
				 client = getFileManageRequestProxy().sendFile(fileInfo);
			}
			if(client.isRetSuccess()){
				uniqueCode = client.getFileUniqueCode();
			}else{
				log.error(fileInfo.getFileName()+"文件上传失败！info:"+client.getRetDescription());
			}
		} catch (Exception e) {
			log.error(e.getMessage());
			e.printStackTrace();
		}
		return uniqueCode;
	}
	
	/**
	 * 根据文件服务器唯一码获取下载地址
	 * @param uniqueCode
	 * @return
	 */
	public String getDownloadURLStr(String uniqueCode){
		String url = null;
		try {
			VicHttpClient client = 
						new VicHttpClient(fileProperties.getServer().getHost(),
											fileProperties.getServer().getPort(),
											fileProperties.getServer().getUsername(),
											fileProperties.getServer().getPassword());
	    	url = client.getDownloadURLStr(uniqueCode);
		} catch (Exception e) {
			log.error(e.getMessage());
		}
    	return url;
	}
}
