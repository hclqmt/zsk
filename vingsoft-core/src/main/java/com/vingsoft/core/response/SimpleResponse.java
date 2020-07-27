/**

 * <p>Title: SimpleResponse.java</p>

 * <p>Description: </p>

 * <p>Company: www.vingsoft.com</p>

 * @author MrTang

 * @date 2018年11月9日

 * @version 1.0

 */
package com.vingsoft.core.response;


import com.alibaba.fastjson.JSONObject;

/**

 * <p>Title: SimpleResponse</p>

 * <p>Description: json返回给前端</p>

 * @author MrTang

 * @date 2018年11月9日

 */
public class SimpleResponse {

	public SimpleResponse(int state,String msg,Object content) {
		this.state = state;
		this.msg = msg;
		this.content = content;
	}

	public SimpleResponse(int state,String msg) {
		this.state = state;
		this.msg = msg;
	}
	public SimpleResponse(int state,String msg,Integer code) {
		this.state = state;
		this.msg = msg;
		this.code = code;
	}
	public SimpleResponse(int state,String msg,Integer code,Object content) {
		this.state = state;
		this.msg = msg;
		this.code = code;
		this.content = content;
	}
	/**

	 * <p>Title: </p>

	 * <p>Description: 处理失败，传入错误msg</p>

	 * @param msg
	 */
	public SimpleResponse(String msg) {
		this.msg = msg;
	}

	/**

	 * <p>Title: 空构造</p>

	 * <p>Description: 处理成功</p>
	 */
	public SimpleResponse() {
		this.state = 1;
		this.msg = "处理成功";
		this.code = 200;
	}

	/**
	 * 状态码 0代表false 1代表true
	 */
	private int state = 0;

	private int code = 200;

	/**
	 * 提示信息
	 */
	private String msg = "error";

	/**
	 * 对象
	 */
	private Object content;

	private JSONObject jsonObject;

	public int getState() {
		return state;
	}

	public void setState(int state) {
		this.state = state;
	}

	public String getMsg() {
		return msg;
	}

	public void setMsg(String msg) {
		this.msg = msg;
	}

	public Object getContent() {
		return content;
	}

	public void setContent(Object content) {
		this.content = content;
	}

	public int getCode() {
		return code;
	}

	public void setCode(int code) {
		this.code = code;
	}

	public JSONObject getJsonObject() {
		return jsonObject;
	}

	public void setJsonObject(JSONObject jsonObject) {
		this.jsonObject = jsonObject;
	}
}
