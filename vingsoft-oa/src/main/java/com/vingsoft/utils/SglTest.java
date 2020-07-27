package com.vingsoft.utils;


public class SglTest {

    public static void main(String[]args){
        String json = "{/'a/':2,/'b/:10'}";
        String enstring = SecretUtils.encrypt("80ed3f55-9331-11ea-8f47-000c29a0e384", "gsstsjy", "AES");
        System.out.println(enstring);
        String destring = SecretUtils.decrypt(enstring, "gsstsjy", "AES");
        System.out.println(destring);
    }
}
