/**  
 * <p>Title: DruidDBConfig.java</p>  
 * <p>Description: </p>   
 * <p>Company: www.vingsoft.com</p> 
 *
 * @author mrtang
 * @date Mar 9, 2019  
 * @version 1.0  
 *
 */  
package com.vingsoft.common.config.db;

import java.util.HashMap;
import java.util.Map;

import org.springframework.boot.web.servlet.FilterRegistrationBean;
import org.springframework.boot.web.servlet.ServletRegistrationBean;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

import com.alibaba.druid.support.http.StatViewServlet;
import com.alibaba.druid.support.http.WebStatFilter;

/**  
 * <p>Title: DruidDBConfig</p>  
 * <p>Description: 数据监控配置</p>  
 *
 * @author mrtang
 * @date Mar 9, 2019  
 *
 */
@Configuration
@SuppressWarnings({"rawtypes","unchecked"})
public class DruidDBConfig {

	@Bean
    public ServletRegistrationBean druidServlet() {
        ServletRegistrationBean reg = new ServletRegistrationBean();
        reg.setServlet(new StatViewServlet());
        reg.addUrlMappings("/druid/*");
        //设置控制台管理用户
//        reg.addInitParameter("loginUsername","root");
//        reg.addInitParameter("loginPassword","root");
        // 禁用HTML页面上的“Reset All”功能
        reg.addInitParameter("resetEnable","false");
        //reg.addInitParameter("allow", "127.0.0.1"); //白名单
        return reg;
    }
	
	@Bean
    public FilterRegistrationBean filterRegistrationBean() {
        //创建过滤器
        FilterRegistrationBean filterRegistrationBean = new FilterRegistrationBean();
        filterRegistrationBean.setFilter(new WebStatFilter());
        Map<String, String> initParams = new HashMap<String, String>();
        //忽略过滤的形式
        initParams.put("exclusions", "*.js,*.gif,*.jpg,*.bmp,*.png,*.css,*.ico,/druid/*");
        filterRegistrationBean.setInitParameters(initParams);
        //设置过滤器过滤路径
        filterRegistrationBean.addUrlPatterns("/*");
        return filterRegistrationBean;
    }
}
