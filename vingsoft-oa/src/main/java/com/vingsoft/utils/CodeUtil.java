package com.vingsoft.utils;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

import java.io.*;
import java.text.DecimalFormat;
import java.text.SimpleDateFormat;
import java.util.Date;
import java.util.List;
import java.util.Random;

/**
 * 相关业务辅助类（流水号 验证码）
 */
public class CodeUtil {
    private static int width = 4;  //位数
    private final static SimpleDateFormat sdf = new SimpleDateFormat("yyyyMMdd");
    private static DecimalFormat df = null;
    private static final Logger logger = LoggerFactory.getLogger(CodeUtil.class);

    /**
     * type
     * 充值流水
     *
     * @param
     * @return
     */
    public static synchronized String getRechargeNumber() {
        String result = null;
        try {
            //创建充值流水文件RechargeFlowNumber.dat
            File file = new File("RechargeFlowNumber.dat");

            char[] chs = new char[width];
            for (int i = 0; i < width; i++) {
                chs[i] = '0';
            }
            df = new DecimalFormat(new String(chs));

            Date current = new Date();
            String date = sdf.format(current);
            int num = 1;
            if (file.exists()) {
                List<String> list = FileUtil.readList(file);
                String[] data = list.get(0).split(",");
                if (date.equals(data[0])) {
                    num = Integer.parseInt(data[1]);
                }
            }
            FileUtil.rewrite(file, date + "," + (num + 1));
            result = sdf.format(current) + df.format(num);
        } catch (Exception e) {

            e.printStackTrace();
        }
        //cz充值
        return "CZ" + result;

    }


    /**
     * 提现流水号产生
     *
     * @return
     */
    public static synchronized String getWithDrawNumber() {
        String result = null;
        try {
            //创建充值流水文件RechargeFlowNumber.dat
            File file = new File("WithDrawFlowNumber.dat");

            char[] chs = new char[width];
            for (int i = 0; i < width; i++) {
                chs[i] = '0';
            }
            df = new DecimalFormat(new String(chs));

            Date current = new Date();
            String date = sdf.format(current);
            int num = 1;
            if (file.exists()) {
                List<String> list = FileUtil.readList(file);
                String[] data = list.get(0).split(",");
                if (date.equals(data[0])) {
                    num = Integer.parseInt(data[1]);
                }
            }
            FileUtil.rewrite(file, date + "," + (num + 1));
            result = sdf.format(current) + df.format(num);
        } catch (Exception e) {

            e.printStackTrace();
        }
        //cz充值
        return "TX" + result;

    }


    /**
     * 订单流水号
     */

    public static synchronized String getOrderCode() {
        String result = null;
        try {
            //创建充值流水文件RechargeFlowNumber.dat
            File file = new File("OrderCode.dat");

            char[] chs = new char[width];
            for (int i = 0; i < width; i++) {
                chs[i] = '0';
            }
            df = new DecimalFormat(new String(chs));

            Date current = new Date();
            String date = sdf.format(current);
            int num = 1;
            if (file.exists()) {
                List<String> list = FileUtil.readList(file);
                String[] data = list.get(0).split(",");
                if (date.equals(data[0])) {
                    num = Integer.parseInt(data[1]);
                }
            }
            FileUtil.rewrite(file, date + "," + (num + 1));
            result = sdf.format(current) + df.format(num);
        } catch (Exception e) {

            e.printStackTrace();
        }
        //cz充值
        return "OC" + result;
    }


    /**
     * 随机生成六位数字验证码
     *
     * @return
     */
    public static String getAppCode() {
        int n = 6;
        StringBuilder code = new StringBuilder();
        Random ran = new Random();
        for (int i = 0; i < n; i++) {
            code.append(Integer.valueOf(ran.nextInt(10)).toString());
        }
        return code.toString();
    }


    // public static void main(String[] args) {
    //     System.out.println(getNumber(1));
    // }


}

