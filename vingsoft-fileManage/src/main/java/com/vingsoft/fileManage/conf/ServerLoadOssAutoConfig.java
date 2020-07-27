package com.vingsoft.fileManage.conf;

import com.aliyun.oss.OSS;
import com.aliyun.oss.OSSClientBuilder;
import com.vingsoft.fileManage.utils.OssUtils;
import org.apache.commons.lang.StringUtils;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.boot.autoconfigure.condition.ConditionalOnProperty;
import org.springframework.boot.context.properties.ConfigurationProperties;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Scope;
import org.springframework.stereotype.Component;

import javax.annotation.PostConstruct;

/**
 * @Auther: hcl
 * @Date: 2020/6/20 10:51
 * @Description:
 */
@Component
@ConfigurationProperties(prefix = "aliyun")
public class ServerLoadOssAutoConfig {

    private static final Logger log = LoggerFactory.getLogger(ServerLoadOssAutoConfig.class);

    @Value("${aliyun.oss.server.enabled}")
    private String enabledConfig; //开关，不同环境不同的配置true开启false关闭
    @Value("${aliyun.oss.endpoint}")
    private String endpoint;
    @Value("${aliyun.oss.accessKeyId}")
    private String accessKeyId;
    @Value("${aliyun.oss.accessKeySecret}")
    private String accessKeySecret;


    @PostConstruct
    protected void init() {
        if (StringUtils.isBlank(enabledConfig)) {
            log.warn("Please config the oss.server.enabled property in application.properties");
        }
    }

    /**
     *	ConditionalOnProperty 如果 开关的值是true 才将Oss注入spring，Oss是阿里云的接口 我们的OssUtils用到了这个OSS对象
     */
    @Bean
    @Scope("prototype")
    @ConditionalOnProperty(prefix = "aliyun.oss.server", name = "enabled", havingValue = "true")
    public OSS ossClient() {
        return new OSSClientBuilder().build(endpoint, accessKeyId, accessKeySecret);
    }

    public OSS getOssClient(){
        return ossClient();
    }

    /**
     *和上面一个意思，如果开关打开了，才会吧我们的工具类注入spring 中
     */
    @Bean
    @ConditionalOnProperty(prefix = "aliyun.oss.server", name = "enabled", havingValue = "true")
    protected OssUtils startOssUtils() {
        return new OssUtils();
    }


}
