package com.vingsoft.oa;

import java.io.UnsupportedEncodingException;

/**
 * @Author hcl
 * @Date 2020/9/2 17:28
 */
public class Test {
    public static void main(String[] args) throws UnsupportedEncodingException {
        String str ="{\"REGION_NAME\":\"閫氭腑鍘\",\"ALLPJ\":23,\"ALLSCO\":115,\"BADREVIEW\":0}";
        str = new String(str.getBytes("GBK"),"utf-8");
        System.out.println(str);
    }
}
