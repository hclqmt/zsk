package com.vingsoft.utils;

/**
 * 常量工具类
 */
public class Constants {

    /**
     * 验证码
     */
    public static final String VALIDATE_CODE = "captcha";

    /**
     * 成功
     */
    public static final String RETURN_SUCCESS = "SUCCESS";

    /**
     * 失败
     */
    public static final String RETURN_ERROE = "ERROR";

    /**
     * 微信tools
     */
    public static final String WX_URL = "https://api.weixin.qq.com/sns/jscode2session";


//    //   //本地
//    public static final String APP_ID = "wx603c79a0176453a4";
//
//    //微信secret
//    public static final String SECRET = "a7410118981329b4d54e72eaf0945350";
//
//    // 微信登录类型
//    public static final String GRANT_TYPE = "authorization_code";
//
//    //微信支付的商户id
//    public static final String MCH_ID = "1490211742";
//
//    //微信支付的商户密钥
//    public static final String KEY = "hfqxhfqxhfqxhfqxhfqxhfqxhfqxhfqx";
//
//    //支付成功后的服务器回调url     https://xinyucanyin.utools.club
//    public static final String NOTIFY_URL = "https://sharelife.utools.club/shareLife/api/wxPay/wxNotify";
//    public static final String NOTIFY_URL = "https://www.hfqixin.cn/shareLife/api/wxPay/wxNotify";

    //---------------------------------------------------------------------
    //客户
    //微信APPID
    public static final String APP_ID = "wxeb0ba67d042b1d21";
    // 微信secret
    public static final String SECRET = "3a33439a684ceaaca8a8a3f22acb8da8";
    // 微信登录类型
    public static final String GRANT_TYPE = "authorization_code";
    //微信支付的商户id
    public static final String MCH_ID = "1519962881";
    //微信支付的商户密钥
    public static final String KEY = "e289ab5aba52ce52941ead32519859de";


//    //支付成功后的服务器回调url(线上)
    public static final String NOTIFY_URL = "https://share.yirenlife.com/shareLife/api/wxPay/wxNotify";
//    //商户接收用户确认订单和付款成功回调通知的地址(支付分)。 (线上回调)
    public static final String PAY_SCORE_NOTIFY_URL = "https://share.yirenlife.com/shareLife/api/wxPay/payScoreNotifyUrl";


//    //支付成功后的服务器回调url(本地)
//    public static final String NOTIFY_URL = "https://sharelife.utools.club/shareLife/api/wxPay/wxNotify";
//    //商户接收用户确认订单和付款成功回调通知的地址 支付分。(本地回调)
//    public static final String PAY_SCORE_NOTIFY_URL = "https://sharelife.utools.club/shareLife/api/wxPay/payScoreNotifyUrl";


    //签名方式
    public static final String SIGNTYPE = "MD5";
    //交易类型
    public static final String TRADETYPE = "JSAPI";
    //服务id
    public static final String SERVER_ID = "00002013000000764955251331968758";
    //微信统一下单接口地址
    public static final String PAY_URL = "https://api.mch.weixin.qq.com/pay/unifiedorder";
    //微信退款下单地址
    public static final String REFUND_URL = "https://api.mch.weixin.qq.com/secapi/pay/refund";


    //免密支付交易类型
    public static final String NO_SECRET_PAYMENT_TRADE_TYPE = "PAP";
    //版本
    public static final String VERSION = "1.0";
    //创建免租金订单签名类型
    public static final String RENT_BILL_SIGN_TYPE = "HMAC-SHA256";
    //创建支付分订单请求路径
    public static final String RENTBILL_URL = "https://api.mch.weixin.qq.com/v3/payscore/serviceorder";
    //查询微信支付分订单路径
    public static final String QUERY_PAY_SCORE = "https://api.mch.weixin.qq.com/v3/payscore/serviceorder";
    //取消微信支付分订单路径
    public static final String CANCEL_PAY_SCORE_ORDER = "https://api.mch.weixin.qq.com/v3/payscore/serviceorder/{out_order_no}/cancel";
    //完结微信支付分订单路径
    public static final String OVER_PAY_SCORE_ORDER = "https://api.mch.weixin.qq.com/v3/payscore/serviceorder/{out_order_no}/complete";
    //支付分订单收款请求路径
    public static final String PAY_SCORE_PAY_URL = "https://api.mch.weixin.qq.com/v3/payscore/serviceorder/{out_order_no}/pay";
    //商户序列号
    public static final String MCH_SERIAL_N0 = "1651EF9A8791856B25174F3E32A3BE2801E2E15D";

    //
    public static final String PRIVATE_KEY = "MIIEvAIBADANBgkqhkiG9w0BAQEFAASCBKYwggSiAgEAAoIBAQDUhl1Nej7y9xI+\n" +
            "FJGBVeLog4Q0Twg2/dNWEFSnnb9dzPGOPLjCr2TjRK4/fXy2HwuF/okgKrw4iXqE\n" +
            "TRTX07gIuvTZ07ijfEwrxQW8LP4qDcVu27XgFSNp6ryXipRUIrfF6YK8J3Kce4Tb\n" +
            "iginRyYteihEhlOszOZLXh4qvjWNnUw1W3rL7iGKx+QzWfSlFnvf53RIn8467UIc\n" +
            "GR9t0iuJ4vNF357RgraO0opdxJhze9uL4z2yuKv161vWPnw4K3d6HbDNaY6QoIaq\n" +
            "P0D2Opyb/foLJIIEsG51tSARU2/PFJ97NlemyoQMBMxw9k3ByHviW8DHgnS9AcYl\n" +
            "2N0WcHSxAgMBAAECggEAcbqhrXdwvlaHdZ9OKldKwUC3+8IbVEpK0PCWTMh3AvxM\n" +
            "e+B0wwJXS+OSF7nQhilg4kjPGt6jsOGpJamWMNVE068wnmzVju9SV83sfsHZFaoe\n" +
            "8G81CgBl3iVW3QW00L1veMK4SnYVuDXFaDKa5OGHRajsaZc0qfFQgB6SqC73u5rq\n" +
            "lKiulEP2jWoR5Ja1OI06iNE989qhXSFCMwLqZHV4msHAUy2FN2lHWd0O5Nji0LMW\n" +
            "l4S5NKl/9L3AGESgBtlBQUEKD94Uhg3uz0X97MNi6PjzqbR5tX0QxvZEQBiO0aiO\n" +
            "sYEHjz3lj7TiaWkIGwkHwZeWbCfK4veepord/mpEwQKBgQD1ta6ZHw74kuJFU/e2\n" +
            "wQ2vlxWvoddwEmltr4HcJ4o6DfvwIIdw/oGkODwOr7aGT2n8r49gqStShN8W692n\n" +
            "HCJwno75uOcVtJ/zm/ysHMd1BUvVbwzkkF5cxruzHuv2K6MAOR4LTDrUK9DTtDlg\n" +
            "bG5HPuz+b41d0m/jPVG88Y7+6QKBgQDdbOYuQwSdb6IPymwtgGSpSli8uTtEbeny\n" +
            "c8evQMN8i3C8/blYxl18GW4H+953VExUdyWwXnY6OE+sfNoEKJLej5FZE/9mWq5t\n" +
            "VnmrTeziFJVsFrcVb6hppFpvIHU/+JMs3D1x4N5L6Y7E25M2zzk0yYLzDC4Px3aF\n" +
            "/fhM0Jd6iQKBgCR+la48hLa66kytyg8k4WmBIUFy4lLNCUe3V6xhWxCAXzktO7C2\n" +
            "vH6ts43i31NXnEBhuwP6XGrnPVNkOQnHDf54Lng81GXO7Cr8sizGIYHqBXdwBRQ1\n" +
            "tS5Gfj5+i0GG/bDcyu+WpO46i8vF6ve9YyvF1uF7pB2ZUfEIfIl5v2lxAoGABXhS\n" +
            "O2RWcdk3JLK4d2tLkU8P4CGnUCpy9BVeIns0GRiMwW53LLVBy/YI3NOhDEud0xxa\n" +
            "Zv/+ZbPMbBNtg1rJPgxH5+5xicLFule/i7bSGket5UyuWy41994iicpAe0MVx67t\n" +
            "KaoHc9KiP0S5X0pBPIeZ3402ehdQW0EJ6EPi6hkCgYBpvNfaJ5atHd5NOREsFAV7\n" +
            "wPasQn5aEkRvj9weXwuGIFqFpzrtGBvL22UjkCWhEY1/21EMRGgZMo+Ah0edoIGx\n" +
            "iclGzd8vRYfRXdXHVPr+2bYrlhse+GfkwqJ64ZstlVENWCmcHbDABJLI7ZSPFIsg\n" +
            "NkgqK8aeIwjMF73+RBHFpQ==\n";


    public static final String APILV3_KEY = "Oud8hzcsjy3SVxmmWH6W4dcA56Y8sd5E";//注意此处是加密过后的

    /**
     * ***********************************聚合平台短信配置***********************************
     * 说明此处的appkey为物联出行专用
     */
    public static final String MSG_APP_KEY = "14a9cf1b30909b83ec636628630c015e";
    public static final String DEF_CHATSET = "UTF-8";
    public static final int DEF_CONN_TIMEOUT = 30000;
    public static final int DEF_READ_TIMEOUT = 30000;
    public static String USER_AGENT = "Mozilla/5.0 (Windows NT 6.1) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/29.0.1547.66 Safari/537.36";
    public static final String MSG_SEND = "http://v.juhe.cn/sms/send";
    public static final String SHIELD_URL = "http://v.juhe.cn/sms/black";

}
