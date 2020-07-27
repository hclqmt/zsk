
package com.vingsoft.common;

/**
 * 后台管理系统平台业返回状态码和状态描述<br>
 * hfqx
 * 2019-03-18
 */
public enum BussinessCode {
    // 成功
    GLOBAL_SUCCESS("0000", "操作成功"),

    GLOBAL_FAIL("4444", "操作失败");

    BussinessCode(String code, String msg) {
        this.code = code;
        this.msg = msg;
    }

    private String code;

    private String msg;


    public String getCode() {
        return code;
    }

    public void setCode(String code) {
        this.code = code;
    }

    public String getMsg() {
        return msg;
    }

    public void setMsg(String msg) {
        this.msg = msg;
    }

}
