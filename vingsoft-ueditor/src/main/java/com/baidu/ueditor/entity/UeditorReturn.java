package com.baidu.ueditor.entity;

/**
 * 百度编辑器，上传返回数据实体类
 * @author MrTang
 *
 */
public class UeditorReturn {

	private String state;//上传状态SUCCESS 一定要大写
	private String url;//上传地址
	private String title;//图片名称demo.jpg
	private String original;//图片名称demo.jpg
	private String type;//文件后缀名
	private Long size;//文件大小
	
	
	public String getState() {
		return state;
	}
	public void setState(String state) {
		this.state = state;
	}
	public String getUrl() {
		return url;
	}
	public void setUrl(String url) {
		this.url = url;
	}
	public String getTitle() {
		return title;
	}
	public void setTitle(String title) {
		this.title = title;
	}
	public String getOriginal() {
		return original;
	}
	public void setOriginal(String original) {
		this.original = original;
	}
	public String getType() {
		return type;
	}
	public void setType(String type) {
		this.type = type;
	}
	public Long getSize() {
		return size;
	}
	public void setSize(Long size) {
		this.size = size;
	}
	
	
}
