package com.vingsoft.fileManage.ossService;

import com.vingsoft.fileManage.conf.ServerLoadOssAutoConfig;
import org.springframework.context.annotation.Import;

import java.lang.annotation.*;

/**
 * @Auther: hcl
 * @Date: 2020/6/20 10:50
 * @Description:
 */
@Target({ElementType.TYPE})
@Retention(RetentionPolicy.RUNTIME)
@Documented
@Inherited
@Import({ServerLoadOssAutoConfig.class})//看这里！！自动装配
public @interface EnableOssService {

}