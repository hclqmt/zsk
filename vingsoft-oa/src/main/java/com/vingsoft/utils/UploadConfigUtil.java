package com.vingsoft.utils;


import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.boot.context.properties.ConfigurationProperties;
import org.springframework.stereotype.Component;

/**
 * jwt工具类
 * hfqx
 * <p>
 * 2019-03-15
 */
@Component
@ConfigurationProperties(prefix = "layui.edit")
public class UploadConfigUtil {

    private Logger logger = LoggerFactory.getLogger(getClass());

    private String path;

    public String getPath() {
        return path;
    }

    public void setPath(String path) {
        this.path = path;
    }
}
