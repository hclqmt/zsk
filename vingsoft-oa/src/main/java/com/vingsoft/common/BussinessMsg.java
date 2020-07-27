
package com.vingsoft.common;

import com.vingsoft.utils.StringKit;
import org.apache.commons.lang.StringUtils;

import java.io.Serializable;

/**
 *
 * 后台业务返回Message通用类
 * hfqx
 * 2019-03-18
 */


public class BussinessMsg implements Serializable {
    //返回Code
    private String returnCode;
    //返回描述
    private String returnMessage;
    //返回数据
    private Object returnData;


    //扩展的业务提示内容
    private String returnMessageExt;


    public String getReturnCode() {
        return returnCode;
    }

    public void setReturnCode(String returnCode) {
        this.returnCode = returnCode;
    }

    public String getReturnMessage() {
        if(StringKit.isEmpty(returnMessageExt)){
            return  returnMessage;
        }
        else{
            return returnMessage + ":" +  returnMessageExt;
        }

    }

    public void setReturnMessage(String returnMessage) {
        this.returnMessage = returnMessage;
    }

    public Object getReturnData() {
        return returnData;
    }

    public void setReturnData(Object returnData) {
        this.returnData = returnData;
    }

    /**
     *获取扩展的业务提示内容
     * @return
     */
    public String getReturnMessageExt() {
        if(StringUtils.isBlank(this.returnMessageExt)){
            return  returnMessage;
        }
        return returnMessageExt;
    }

    /**
     * 设置扩展的业务提示内容
     * @param returnMessageExt
     */
    public void setReturnMessageExt(String returnMessageExt) {
        this.returnMessageExt = returnMessageExt;
    }
}
