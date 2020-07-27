/**  

* <p>Title: LayuiResponse.java</p>  

* <p>Description: </p>    

* <p>Company: www.vingsoft.com</p>  

* @author MrTang

* @date 2018年11月26日  

* @version 1.0  

*/  
package com.vingsoft.core.response;

import java.io.Serializable;
import java.util.List;

/**  

* <p>Title: LayuiResponse</p>  

* <p>Description: layui table 返回数据格式</p>  

* @author MrTang

* @date 2018年11月26日  

*/
public class LayuiResponse implements Serializable {

	/** serialVersionUID*/
	private static final long serialVersionUID = 1L;
	
	/**
	 * 状态码 0正确 1错误，将显示msg提示信息
	 */
	private Integer code = 0;
	/**
	 * 提示信息
	 */
	private String msg;
	/**
	 * 总记录数
	 */
	private Object count;

	private Long totalPage;
	/**
	 * 查询的数据
	 */
	private List<Object> data;

	private Object status;
	
	/**
	 * 上传文件名称
	 */
	private String fileName;

	/**
	 * 上传文件扩展名称
	 */
	private String fileExtensionName;
	
	/**
	 * 文件唯一编码
	 */
	private String uniqueCode;

	/**
	 * 文件大小
	 */
	private String size;
	
	/**
	 * 上传文件返回url
	 */
	private String fileUrl;


	public Integer getCode() {
		return code;
	}
	public void setCode(Integer code) {
		this.code = code;
	}
	public String getMsg() {
		return msg;
	}
	public void setMsg(String msg) {
		this.msg = msg;
	}
	public Object getCount() {
		return count;
	}
	public void setCount(Object count) {
		this.count = count;
	}
	public List<Object> getData() {
		return data;
	}
	public void setData(List<Object> data) {
		this.data = data;
	}
	
	public String getFileName() {
		return fileName;
	}
	public void setFileName(String fileName) {
		this.fileName = fileName;
	}
	
	public String getUniqueCode() {
		return uniqueCode;
	}
	public void setUniqueCode(String uniqueCode) {
		this.uniqueCode = uniqueCode;
	}
	
	public String getFileUrl() {
		return fileUrl;
	}
	public void setFileUrl(String fileUrl) {
		this.fileUrl = fileUrl;
	}

	public String getSize() {
		return size;
	}


	public void setSize(String size) {
		this.size = size;
	}

	public String getFileExtensionName() {
		return fileExtensionName;
	}

	public void setFileExtensionName(String fileExtensionName) {
		this.fileExtensionName = fileExtensionName;
	}

	public Long getTotalPage() {
		return totalPage;
	}

	public void setTotalPage(Long totalPage) {
		this.totalPage = totalPage;
	}

	public Object getStatus() {
		return status;
	}

	public void setStatus(Object status) {
		this.status = status;
	}
}
